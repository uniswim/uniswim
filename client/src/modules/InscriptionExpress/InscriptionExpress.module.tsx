import React from "react"
import { Router, RouteComponentProps } from "@reach/router";
import step01Default from "./pages/step01/step01.default";
import {  useLayout } from "modules/Layouts/Layout.module";

const Step01Route: React.ComponentType<RouteComponentProps> = step01Default

const InscriptionExpressModule: React.FC<RouteComponentProps> = (props) => {
    useLayout("ConnectedHeader", { headerTitle: "Fiche d'inscription" })
    return (
        <Router>
            <Step01Route path="/" />
        </Router>
    )
}

export default InscriptionExpressModule
