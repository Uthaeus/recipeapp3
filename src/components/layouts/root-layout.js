import { Outlet } from "react-router-dom";

import MainNavigation from "../navigation/main-navigation";

function RootLayout() {

    return (
        <>
            <MainNavigation />
            <Outlet />
        </>
    );
}

export default RootLayout;