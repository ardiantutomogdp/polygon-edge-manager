import { readFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "GET") {
    try {
      const data = readFileSync("data/db.json").toString();
      res.status(200).json({
        data: JSON.parse(data),
        noData: false,
      });
    } catch {
      res.status(200).json({
        noData: true,
      });
    }
  } else {
    res.status(404);
  }
}
