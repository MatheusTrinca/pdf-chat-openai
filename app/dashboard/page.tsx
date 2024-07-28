import Documents from '@/components/Documents';

export default function Dashboard() {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <h1 className="text-3xl p-5 bg-gray-100 font-extralight text-indigo-600">
        My Documents
      </h1>

      <Documents />
    </div>
  );
}

// https://github.com/sonnysangha/Chat-with-PDF-AI-SAAS-Challenge-App/blob/main/components/Documents.tsx
// 1:20:46
