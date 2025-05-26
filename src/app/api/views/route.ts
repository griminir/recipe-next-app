import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/write-client'; // adjust import as needed

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  // Fetch current views
  const data = await writeClient.fetch(
    `*[_type == "recipe" && _id == $id][0]{views}`,
    { id }
  );
  const currentViews = data?.views || 0;

  // Increment views
  await writeClient
    .patch(id)
    .set({ views: currentViews + 1 })
    .commit();

  return NextResponse.json({ views: currentViews + 1 });
}
