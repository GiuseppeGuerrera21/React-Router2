import MainNavigation from "../components/MainNavigation";
import { Outlet, useNavigation } from "react-router-dom";

export default function RootLoyout() {
    // const navigation = useNavigation();

    return (
        <div>
            <MainNavigation />
            <main>
                {/* {navigation.state === "loading" && <p>Loading...</p>} */}
                <Outlet />
            </main>
        </div>
    );
}