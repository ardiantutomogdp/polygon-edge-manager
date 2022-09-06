import { execSync } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      execSync(`rm -r nodes && mkdir nodes`);
      execSync(`rm -r data && mkdir data`);
      execSync(`rm -r logs && mkdir logs`);
    } catch {}
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
    });
  }
}
