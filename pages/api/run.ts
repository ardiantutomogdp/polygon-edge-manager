import { spawn } from "child_process";
import { appendFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Node } from "..";
import { NodeConfig } from "../../components/RunNode";

const runNode = async (nodes: Node[], nodeConfig: NodeConfig) => {
  if (
    nodeConfig.gRpcPort === undefined ||
    nodeConfig.jsonRpcPort === undefined ||
    nodeConfig.libp2pPort === undefined ||
    nodeConfig.name === undefined
  ) {
    return false;
  }

  let cmd = `server --data-dir ./${nodeConfig.name} --chain genesis.json --grpc-address 0.0.0.0:${nodeConfig.gRpcPort} --libp2p 0.0.0.0:${nodeConfig.libp2pPort} --jsonrpc 0.0.0.0:${nodeConfig.jsonRpcPort}`;
  if (nodeConfig.nat !== undefined) {
    cmd += ` --nat ${nodeConfig.nat}`;
  }
  cmd += " --seal";
  const runCmd = spawn("polygon-edge", cmd.split(" "), { cwd: "./nodes" });

  runCmd.stdout.on("data", (data) => {
    appendFileSync(`${nodeConfig.name}`, data);
  });

  runCmd.stderr.on("data", (data) => {
    appendFileSync(`${nodeConfig.name}`, data);
  });

  runCmd.on("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  runCmd.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
  return true;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const body: any = JSON.parse(req.body);
    const success = await runNode(body.nodes, body.nodeConfig);

    if (!success) {
      res.status(500).json({ error: true });
    } else {
      res.status(200).json({ node: body.nodeConfig });
    }
  } else {
    res.status(404);
  }
}
