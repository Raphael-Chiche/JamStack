"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import React from 'react';

interface Hero {
  id: number;
  documentId: string;
  name: string;
  description: { type: string; children: { text: string; type: string }[] }[];
  // Ajoutez d'autres propriétés du héros ici si nécessaire
}

const HeroPage: React.FC = () => {
  const params = useParams();
  const documentId = params.id;
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentId) {
      fetch(`http://localhost:1337/api/heroes/${documentId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Hero not found');
          }
          return res.json();
        })
        .then((data) => {
          setHero(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching hero:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [documentId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!hero) {
    return <div>Hero not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{hero.name}</h1>
      {hero.description.map((desc, index) => (
        <p key={index}>
          {desc.children.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      ))}
      {/* Ajoutez d'autres détails du héros ici */}
    </div>
  );
};

export default HeroPage;