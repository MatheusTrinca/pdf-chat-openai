'use client';

import { db, storage } from '@/firebase';
import { generateEmbeddingsInPineconeVectorStore } from '@/lib/langchain';
import { useUser } from '@clerk/nextjs';
import { error } from 'console';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export enum StatusText {
  UPLOADING = 'Uploading file...',
  UPLOADED = 'File uploaded successfully',
  SAVING = 'Saving file to database...',
  GENERATING = 'Generating AI Embeddings, this will take only a few seconds...',
}

export type Status = StatusText[keyof StatusText];

function useUpload() {
  const [progress, setProgress] = useState<number | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const handleUpload = async (file: File) => {
    if (!user || !file) return;

    // FREE/PRO limitations...

    const fileIdToUpload = uuidv4();

    const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUpload}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setStatus(StatusText.UPLOADING);
        setProgress(percent);
      },
      error => {
        console.log('Error uploading the file', error);
      },
      async () => {
        setStatus(StatusText.UPLOADED);

        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);

        setStatus(StatusText.SAVING);

        await setDoc(doc(db, 'users', user.id, 'files', fileIdToUpload), {
          name: file.name,
          size: file.size,
          type: file.type,
          downloadUrl,
          ref: uploadTask.snapshot.ref.fullPath,
          createdAt: new Date(),
        });

        setStatus(StatusText.GENERATING);
        await generateEmbeddingsInPineconeVectorStore(fileIdToUpload);

        setFileId(fileIdToUpload);
      }
    );
  };

  return { progress, status, fileId, handleUpload };
}

export default useUpload;
