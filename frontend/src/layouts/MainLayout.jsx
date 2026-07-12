import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <main style={{ flex: 1, padding: "20px" }}>

                <Outlet />

            </main>

        </div>

    );

}