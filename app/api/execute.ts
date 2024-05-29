import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

type Data = {
  output: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { code } = req.body;
    exec(`python -c "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
      if (error) {
        res.status(200).json({ output: stderr });
        return;
      }
      res.status(200).json({ output: stdout });
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
