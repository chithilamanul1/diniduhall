import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { filename, action, category } = await request.json();
    const sourcePath = path.join(process.cwd(), 'public', 'images', 'business', filename);
    
    if (action === 'delete') {
      if (fs.existsSync(sourcePath)) {
        fs.unlinkSync(sourcePath);
        return NextResponse.json({ success: true, message: 'Deleted' });
      }
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    if (action === 'move' && category) {
      const destPath = path.join(process.cwd(), 'public', 'images', category, filename);
      if (fs.existsSync(sourcePath)) {
        fs.renameSync(sourcePath, destPath);
        return NextResponse.json({ success: true, message: 'Moved' });
      }
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sourceDir = path.join(process.cwd(), 'public', 'images', 'business');
    if (!fs.existsSync(sourceDir)) {
      return NextResponse.json({ images: [] });
    }
    
    const files = fs.readdirSync(sourceDir)
      .filter(f => f.match(/\.(jpg|jpeg|png|webp|gif)$/i))
      .map(f => ({
        filename: f,
        url: `/images/business/${f}`
      }));
      
    return NextResponse.json({ images: files });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
