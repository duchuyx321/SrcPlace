import { Fragment } from "react";

import PropTypes from "prop-types";
// layout
import DefaultLayout from "~/Layouts/DefaultLayout";
import ProtectedRoute from "./ProtectedRoute";

function renderRoute({ Route, data, role = null, index }) {
    const Page = data.component;
    let Layout = DefaultLayout;
    if (data.layout) {
        Layout = data.layout;
    } else if (!data.layout || data.layout === null) {
        Layout = Fragment;
    }

    return (
        <Route
            key={index}
            path={data.path}
            element={
                <ProtectedRoute role={role}>
                    <Layout>
                        <Page />
                    </Layout>
                </ProtectedRoute>
            }
        />
    );
}
renderRoute.propTypes = {
    Route: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
    role: PropTypes.string,
};
export default renderRoute;
