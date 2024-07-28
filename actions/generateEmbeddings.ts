import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function generateEmbeddings(docId: string) {
  auth().protect();

  // turn a PDF into embeddings [0.1231312, 123123123, ...]
  await generateEmbeddingsIsPineconeVectorStore(docId);

  revalidatePath('/dashboard');

  return { completed: true };
}
