import React, {
  FC,
  ReactChildren,
  ReactComponentElement,
  ReactElement,
  ReactNode,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../App";
import PageWrapper from "../components/common/PageWrapper";

function getTitleInfo(key: string): {
  title: string;
  subTitle: string | undefined;
} {
  switch (key) {
    case "Step1":
      return {
        title: "Step 1",
        subTitle: "basic information",
      };
    case "Step2":
      return {
        title: "Step 2",
        subTitle: "clinic information",
      };
    case "Step3":
      return {
        title: "Step 3",
        subTitle: "Symptoms",
      };
    case "Step4":
      return {
        title: "Step 4",
        subTitle: "ANC Checklist information",
      };
    default:
      return {
        title: "unknown",
        subTitle: undefined,
      };
  }
}

function enhanceView(name: string, View: FC): FC {
  console.log("name", name, View);
  if (name.startsWith("Step")) {
    return (props: any) => {
      return (
        <PageWrapper {...props} {...getTitleInfo(name)}>
          <View {...props} />
        </PageWrapper>
      );
    };
  }
  return View;
}

function loadRoutes() {
  const context = import.meta.globEager("../views/*.tsx");
  console.log("view context", context);
  const routes: any[] = [
    <Route exact path="/" component={App} key="router-App"></Route>,
  ];
  const names: string[] = [];
  let views = Object.keys(context);
  for (let key of views) {
    let name = key.replace(/(\.\.\/views\/|\.tsx)/g, "");
    console.log("name", name);
    let view = enhanceView(name, context[key].default);
    name = name.split("_").join("/");
    names.push(name);
    routes.push(
      <Route
        exact
        path={"/" + name}
        component={view}
        key={"router-" + name}
      ></Route>
    );
  }
  console.log("names................................", names);
  return routes;
}

export default function AppRouter() {
  return (
    <Router>
      <Switch>{loadRoutes()}</Switch>
    </Router>
  );
}
