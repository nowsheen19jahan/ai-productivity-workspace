import { useState } from "react";

function Dashboard() {
  const [tasks, setTasks] = useState([
    "Learn React",
    "Build AI Workspace"
  ]);

  return (
    <main className="flex-1 p-8">
      <h2 className="text-4xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="space-y-3">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-zinc-900 p-4 rounded-lg"
          >
            {task}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Dashboard;   