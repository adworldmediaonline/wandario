import { getBlurDataUrl } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const src = searchParams.get('src');

    if (!src) {
      return NextResponse.json(
        { error: 'Missing src parameter' },
        { status: 400 }
      );
    }

    const blurDataUrl = await getBlurDataUrl(src);
    return NextResponse.json({ blurDataUrl });
  } catch (error) {
    console.error('Error generating blur data URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate blur data URL' },
      { status: 500 }
    );
  }
}
