function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-5">
        <h1 className="text-2xl font-bold mb-8">
          Workspace
        </h1>

        <nav className="space-y-4">
          <p className="cursor-pointer hover:text-zinc-300">
            Dashboard
          </p>

          <p className="cursor-pointer hover:text-zinc-300">
            Notes
          </p>

          <p className="cursor-pointer hover:text-zinc-300">
            Tasks
          </p>

          <p className="cursor-pointer hover:text-zinc-300">
            AI Assistant
          </p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold mb-4">
          Welcome Back
        </h2>

        <p className="text-zinc-400">
          Your productivity workspace is ready.
        </p>
      </main>

    </div>
  );
}

export default App;