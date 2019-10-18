import React from "react"
import Dashboard from "./pages/Dashboard/Dashboard.default";
import { Router, RouteComponentProps } from "@reach/router";
import { useLayout } from "modules/Layouts/Layout.module";


const DashboardRoute: React.ComponentType<RouteComponentProps> = Dashboard;

const DashboardModule : React.FC<RouteComponentProps> = (props) => {
    useLayout("ConnectedDefault");

    return (
        <Router>
            <DashboardRoute path="/" />
        </Router>
    )
}

export default DashboardModule
