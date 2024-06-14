import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./public/Tocdata.json'); // Path to Tocdata.json

export const POST = async (req: Request, res: Response) => {
  try {
    const jsonData = await req.json();
    
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

    return NextResponse.json({ message: 'Data saved successfully' })
  } catch (error) {
    console.error('Error saving data:', error);
    // res.status(500).json({ error: 'Failed to save data' });
    return NextResponse.json({ error: 'Failed to save data' })
  }
};

export const GET = async (req: Request, res: Response) => {
  try {
    
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContents);
    console.log();
    return NextResponse.json(JSON.parse(jsonData))
  } catch (error) {
    console.error('Error saving data:', error);
    // res.status(500).json({ error: 'Failed to save data' });
    return NextResponse.json({ error: 'Failed to save data' })
  }
};


