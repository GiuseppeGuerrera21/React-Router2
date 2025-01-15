import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";

export default function RootLoyout() {
    return (
        <div>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </div>
    );
}