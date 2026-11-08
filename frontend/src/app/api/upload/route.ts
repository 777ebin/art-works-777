import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    // Convert file to Base64 data URL for instant cloud & cross-device compatibility
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      originalName: file.name,
      size: file.size,
      mimetype: mimeType,
    });
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { message: error.message || 'File upload failed' },
      { status: 500 },
    );
  }
}
