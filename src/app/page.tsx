import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Bienvenue dans notre application</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/heroes"
          className="bg-blue-600 text-white rounded-lg p-6 text-center hover:bg-blue-700 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Héros</h2>
          <p>Découvrez tous nos héros disponibles</p>
        </Link>

        <Link
          href="/unites"
          className="bg-green-600 text-white rounded-lg p-6 text-center hover:bg-green-700 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-2">Troupes</h2>
          <p>Explorez nos différentes troupes</p>
        </Link>
      </div>
    </main>
  )
}