import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Notes from "../pages/Notes";
import Tasks from "../pages/Tasks";
import AIChat from "../pages/AIChat";

import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public */}

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                {/* Shared Layout */}

                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<Dashboard />} />

                    <Route path="/notes" element={<Notes />} />

                    <Route path="/tasks" element={<Tasks />} />

                    <Route path="/ai" element={<AIChat />} />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}