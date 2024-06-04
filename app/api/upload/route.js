import { NextResponse } from 'next/server';
import { prisma } from '@/util/db';
import fs from 'fs';
import path from 'path';

export const POST = async (request) => {
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const filePath = path.join(uploadDir, file.name);
  fs.writeFileSync(filePath, buffer);

  const document = await prisma.policyDocument.create({
    data: {
      name: file.name,
      filePath,
    },
  });

  return NextResponse.json(document, { status: 200 });
};
