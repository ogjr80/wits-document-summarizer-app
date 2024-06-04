import { NextResponse } from 'next/server';
import { prisma } from '@/util/db';

export const GET = async () => {
  const documents = await prisma.policyDocument.findMany();
  return NextResponse.json(documents, { status: 200 });
};
