export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-24">
      <div className="rounded-xl bg-white p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold text-blue-600">
          🚀 ThumbNodes Dashboard
        </h1>
        <p className="mt-4 text-gray-600">
          Tailwind v3 is officially connected.
        </p>
        <button className="mt-6 rounded-lg bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 transition-colors">
          Upload Image
        </button>
      </div>
    </main>
  );
}