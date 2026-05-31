function Sidebar({ title }) {
  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-5">
      <h1 className="text-2xl font-bold mb-8">
        Workspace
      </h1>

      <nav className="space-y-4">
        <p>Dashboard</p>
        <p>Tasks</p>
        <p>Journal</p>
        <p>Notes</p>
        <p>Tasks</p>
        <p>Settings</p>
        <p>AI Assistant</p>
      </nav>
    </aside>
  );
}

export default Sidebar;