import Link from 'next/link';
import React from 'react';

interface Unite {
  id: number;
  documentId: string;
  name: string;
  description: string;
}

async function getUnites(): Promise<{ data: Unite[] }> {
  const res = await fetch("http://localhost:1337/api/unites", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Impossible de récupérer les unités");
  return res.json();
}

export default async function HeroesPage() {
  const unites = await getUnites  ();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nos Unités</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {unites.data.map((unite) => (
          <Link key={unite.documentId} href={`/unites/${unite.documentId}`}>
            <div className="border rounded-lg p-4 shadow-sm cursor-pointer">
              <h2 className="text-xl font-semibold">{unite.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}