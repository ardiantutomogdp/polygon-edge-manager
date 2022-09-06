import { execSync } from "child_process";
import { appendFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Node } from "..";
import { GenesisConfig } from "../../components/GenesisConfig";

const constructValidatorCommand = (nodes: Node[]) => {
  let command = "";
  nodes.forEach((node) => {
    if (node.isValidator) {
      command += ` --ibft-validator=${node.publicKey}`;
    }
  });
  return command;
};

const constructBootNodeCommand = (nodes: Node[]) => {
  let base = "/ip4/127.0.0.1/tcp/<port>/p2p/<node_id>";
  let command = "";
  nodes.forEach((node) => {
    if (node.isBootNode) {
      let bootNodeUrl = base
        .replace("<port>", node.port.toString())
        .replace("<node_id>", node.id);
      command += ` --bootnode=${bootNodeUrl}`;
    }
  });
  return command;
};

const createGenesisFile = async (
  nodes: Node[],
  genesisConfig: GenesisConfig
) => {
  let validatorCommand = constructValidatorCommand(nodes);
  let bootNodeCommand = constructBootNodeCommand(nodes);
  let configCommand = "";
  configCommand += ` --premine=${genesisConfig.premineAddress}:${genesisConfig.premineValue} --block-gas-limit ${genesisConfig.blockGasLimit} --chain-id ${genesisConfig.chainId}`;

  try {
    execSync(`cd nodes && rm genesis.json`);
  } catch (e) {
    console.log("Genesis file not exist");
  }
  let out = execSync(
    `cd nodes && polygon-edge genesis --consensus ibft ${validatorCommand} ${bootNodeCommand} ${configCommand}`
  );

  let outString: any = out.toString();
  if (outString.includes("[GENESIS SUCCESS]")) {
    appendFileSync(
      "./data/db.json",
      JSON.stringify({
        nodes,
        genesisConfig,
      })
    );
    return true;
  }
  return false;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const body: any = JSON.parse(req.body);

    const success = await createGenesisFile(body.nodes, body.genesisConfig);
    res.status(200).json({ success });
  } else {
    res.status(404).json({ error: true });
  }
}
