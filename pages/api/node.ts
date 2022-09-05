import { execSync } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";
//https://stackabuse.com/executing-shell-commands-with-node-js/
type Data = {
  dirName: string;
};

const createNode = async (dirName: string) => {
  let id, publicKey;
  let out = execSync(
    `cd nodes && polygon-edge secrets init --data-dir ${dirName}`
  );

  let outString: any = out.toString();
  outString = outString
    .replace("[SECRETS INIT]", "")
    .replace("Public key (address) = ", "")
    .replace("Node ID              = ", "")
    .split("\n");
  outString = outString.filter((item: any) => item);
  id = outString[1];
  publicKey = outString[0];
  return {
    id,
    publicKey,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const body: Data = JSON.parse(req.body);
    const node = await createNode(body.dirName);
    res.status(200).json({ node });
  } else {
    res.status(404);
  }
}
