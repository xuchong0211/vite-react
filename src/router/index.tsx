import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import App from "../App";

function loadRoutes() {
    const context = import.meta.globEager("../views/*.tsx");
    console.log("view context", context);
    const routes: any[] = [<Route exact path="/" component={App} key="router-App"></Route>];
    const names: string[] = []
    let views = Object.keys(context);
    for (let key of views) {
        let view = context[key].default;
        let name = key.replace(/(\.\.\/views\/|\.tsx)/g, '');
        name = name.split("_").join("/")
        names.push(name);
        routes.push(<Route exact path={ '/' + name } component={view} key={'router-' + name}></Route>)
    }
    console.log("names................................", names);
    return routes;
}

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                { loadRoutes() }
            </Switch>
        </Router>
    )
}
