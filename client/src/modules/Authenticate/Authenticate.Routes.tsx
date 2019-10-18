import React from "react"
import { Route } from "react-router";
import Login from "./pages/Login/Login.default";

export default () => [
    <Route key="authenticate_login" path="/login" component={Login} />
]