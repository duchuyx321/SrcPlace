import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PublicRouters, UserRouters, AdminRouters } from "~/Routers";
import renderRoute from "~/Routers/renderRoute";
import Notification from "~/Components/Notification";

function App() {
    return (
        <Router>
            <Routes>
                {/* Router Admin */}
                {AdminRouters.map((routes, index) =>
                    renderRoute({
                        Route: Route,
                        data: routes,
                        role: "Admin",
                        index: index,
                    })
                )}
                {/* Router User */}
                {UserRouters.map((routes, index) =>
                    renderRoute({
                        Route: Route,
                        data: routes,
                        role: "User",
                        index: index,
                    })
                )}
                {/* Router Public */}
                {PublicRouters.map((routes, index) =>
                    renderRoute({ Route: Route, data: routes, index: index })
                )}
            </Routes>
            {/* add layout tách */}
            <Notification success />
        </Router>
    );
}

export default App;
