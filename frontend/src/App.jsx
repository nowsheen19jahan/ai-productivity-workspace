import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      <Sidebar title="AI Productivity Workspace" />
      <Dashboard />
    </div>
  );
}

export default App;