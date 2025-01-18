import Link from 'next/link';
import React from 'react';

interface Hero {
  id: number;
  documentId: string;
  name: string;
  description: string;
}

async function getHeroes(): Promise<{ data: Hero[] }> {
  const res = await fetch("https://strapi-warhammer-production.up.railway.app/api/heroes", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Impossible de récupérer les héros");
  return res.json();
}

export default async function HeroesPage() {
  const heroes = await getHeroes();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Nos Héros</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {heroes.data.map((hero) => (
          <Link key={hero.documentId} href={`/heroes/${hero.documentId}`}>
            <div className="border rounded-lg p-4 shadow-sm cursor-pointer">
              <h2 className="text-xl font-semibold">{hero.name}</h2>
              {/* Ajoutez d'autres détails du héros ici */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}