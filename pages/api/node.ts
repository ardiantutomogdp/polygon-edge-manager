import { execSync } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";
import { Node } from "..";

type Data = {
  dirName: string;
  count: number;
};

const createNode = async (data: Data) => {
  let id, publicKey;
  try {
    execSync(`mkdir nodes`);
  } catch (e) {}
  let out = execSync(
    `cd nodes && polygon-edge secrets init --data-dir ${data.dirName}`
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
    dirName: data.dirName,
    isValidator: true,
    isBootNode: true,
    port: (data.count + 1) * 10000 + 1,
  } as Node;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    const body: Data = JSON.parse(req.body);
    const node = await createNode(body);
    res.status(200).json({ node });
  } else {
    res.status(404);
  }
}
