import { OpenAI } from "@langchain/openai";
import { MemoryStore } from 'langchain/memorystore';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const memoryStore = new MemoryStore();

export const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

export const generateEmbeddings = async (text) => {
  const response = await openai.createEmbeddings({
    input: text,
  });
  return response.data.embeddings;
};

export const storeEmbeddings = async (id, embeddings) => {
  await memoryStore.store({
    id,
    embedding: embeddings,
  });
};

export const queryEmbeddings = async (query) => {
  const response = await openai.createEmbeddings({
    input: query,
  });
  const queryEmbedding = response.data.embeddings;
  const results = await memoryStore.query(queryEmbedding);
  return results;
};
