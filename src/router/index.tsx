import React, { FC, ReactNode, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../App";
import { PageHeaderWrapper } from "../components/common/PageHeaderWrapper";
import { MyViewType } from "../lib/types/View";
import Loading from "../components/common/Loading";
import { useLoading, useUserData } from "../models/data";
import NotFound from "../NotFound";

function enhanceView(
  name: string,
  View: MyViewType = {
    default: (props) => null,
    metaData: {},
  }
): FC {
  if (View.metaData?.header) {
    return (props: any) => {
      return (
        <PageHeaderWrapper {...props} {...View.metaData?.header}>
          <View.default {...props} />
        </PageHeaderWrapper>
      );
    };
  }
  return View.default;
}

function loadRoutes(user: { value: any }) {
  let context = import.meta.globEager("../views/*.tsx");
  console.log("view context .............1111...............", context);
  let register = null;
  if (user.value.username) {
    register = import.meta.globEager("../views/register/*.tsx");
    context = Object.assign(context, register);
  }
  console.log("view context .............22222...............", context);
  const routes: any[] = [
    <Route exact path="/" component={App} key="router-App"></Route>,
  ];
  const names: string[] = [];
  let views = Object.keys(context);
  for (let key of views) {
    const name = key.replace(/(\.\.\/views\/|\.tsx)/g, "");
    const view = enhanceView(name, context[key] as MyViewType);
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
  routes.push(
    <Route
      exact
      path={"**"}
      component={NotFound}
      key={"router-notFound"}
    ></Route>
  );
  console.log("routes................................", names);
  return routes;
}

export default function AppRouter() {
  const loading = useLoading();
  const user = useUserData();
  console.log("user 3433333333333333333333", user.value);
  const routes: ReactNode = useMemo(
    () => <Switch>{loadRoutes(user)}</Switch>,
    [user.value.username]
  );
  return (
    <Router>
      <Loading loading={loading.value} />
      {routes}
    </Router>
  );
}
