import Navigation from "../_common/navigation/navigation.component";
import "./layout.style.scss";

import { Outlet } from "react-router-dom";

const Layout = () => {

    return (
        <>
            <div className="layout">
                <header className="layout__header">
                    <Navigation />
                </header>
                <main className="layout__main">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default Layout;