export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-green-500">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Smart Calis
        </h1>
        <p className="text-xl text-white mb-8">
          Calisthenics Training Assistant
        </p>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <p className="text-gray-700 mb-6">
            Welcome! This is the home page for Smart Calis.
          </p>
          <p className="text-gray-600">
            Development environment initialized successfully.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            <p>Frontend is running on port 3000</p>
          </div>
        </div>
      </div>
    </main>
  );
}
