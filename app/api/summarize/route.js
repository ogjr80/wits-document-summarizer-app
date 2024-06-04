import { NextResponse } from 'next/server';
import { prisma } from '@/util/db';
import { OpenAI } from 'langchain';
import fs from 'fs';
import path from 'path';

export const POST = async (request) => {
  const { id } = await request.json();

  const document = await prisma.policyDocument.findUnique({
    where: { id },
  });

  if (!document) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 });
  }

  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  const fileBuffer = fs.readFileSync(path.join(process.cwd(), document.filePath));
  const summary = await openai.summarizePDF(fileBuffer);

  await prisma.policyDocument.update({
    where: { id },
    data: { summary },
  });

  return NextResponse.json({ summary }, { status: 200 });
};
