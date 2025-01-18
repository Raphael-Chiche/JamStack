"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import React from 'react';

interface Unite {
  id: number;
  documentId: string;
  name: string;
  description: { type: string; children: { text: string; type: string }[] }[];
}

const UnitePage: React.FC = () => {
  const params = useParams();
  const documentId = params.id;
    const [unite, setUnite] = useState<Unite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (documentId) {
        fetch(`https://strapi-warhammer-production.up.railway.app/api/unites/${documentId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Unite not found');
          }
          return res.json();
        })
        .then((data) => {
            setUnite(data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching unite:', error);
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

  if (!unite) {
    return <div>Unite not found</div>;
  }

  return (
    <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">{unite.name}</h1>
      {unite.description.map((desc, index) => (
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

export default UnitePage;