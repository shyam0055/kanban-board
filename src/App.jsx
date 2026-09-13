import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import NotFound from "./components/not-found";
import Kanban from "./components/kanban";
import Layout from "./components/layout";
import TaskContext from "./components/TaskContext";

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-zinc-50 text-zinc-900 font-sans">
      <main className="flex-1 h-full w-full rounded-none">
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kanban" element={<Kanban />} />
          </Route>
          <Route path="/TaskContext" element={<TaskContext />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
