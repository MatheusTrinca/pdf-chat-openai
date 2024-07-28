'use client';

import { PlusCircleIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function PlaceholderDocument() {
  const router = useRouter();

  const handleClick = () => {
    // Check if the tier is over the limit, if so, push to upgrade page
    router.push('/dashboard/upload');
  };

  return (
    <Button
      onClick={handleClick}
      className="flex flex-col justify-center items-center w-64 h-80 rounded-xl bg-gray-200 drop-shadow-md text-gray-400"
    >
      <PlusCircleIcon />
      <p>Add a Document</p>
    </Button>
  );
}
