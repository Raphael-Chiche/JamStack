import Link from 'next/link';
import React from 'react';

interface Unite {
  id: number;
  documentId: string;
  name: string;
  description: string;
}

async function getUnites(): Promise<{ data: Unite[] }> {
  const url = "http://strapi-warhammer.railway.internal/api/unites";
  const headers = {
    'Authorization': `bearer 8e06bb1d4e49e25c5b521d0edebba7548a77e0efa1f9b84a5381616870bf4a8ad36a096fcd803fd476c2bede33d879a584cb7990af868b6457f1d7b1c9121f9a358b25184906b9c8b30a1a0fcee47ec68bc13d885830adf0f30d9d44bc39df940f8e9b2cba8873c765bbfbaa7a6151e93b6a283aec08fa70111d078cf7e221c3`,
    "Content-Type": "application/json",
  };

  console.log('Fetching units from:', url);
  console.log('Using headers:', headers);

  const res = await fetch(url, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    console.error('Fetch failed with status:', res.status);
    throw new Error("Impossible de récupérer les unités");
  }

  return res.json();
}

export default async function UnitesPage() {
  let unites;
  try {
    unites = await getUnites();
  } catch (error) {
    console.error('Error fetching units:', error);
    return <div>Erreur lors de la récupération des unités</div>;
  }

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