import React, { FC, ReactNode, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "../App";
import { PageHeaderWrapper } from "../components/common/PageHeaderWrapper";
import { MyViewType } from "../lib/types/View";
import Loading from "../components/common/Loading";
import { useUserData } from "../models/data";
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

  if (user.value?.views && user.value!.views instanceof Array) {
    const views = import.meta.globEager(`../views/secured/**/*.tsx`);
    const authenticatedViews: AnyObject = {};
    Object.keys(views).map((key: string) => {
      user.value!.views.forEach((path: string) => {
        if (key.indexOf(`../views/secured/${path}`) >= 0) {
          const path = key.replace(/(\/secured)/g, "");
          authenticatedViews[path] = views[key];
        }
      });
    });
    context = Object.assign(context, authenticatedViews);
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
  const user = useUserData();
  console.log("user ...................", user.value);
  const routes: ReactNode = useMemo(
    () => <Switch>{loadRoutes(user)}</Switch>,
    [user.value.username]
  );
  return (
    <Router>
      <Loading />
      {routes}
    </Router>
  );
}
