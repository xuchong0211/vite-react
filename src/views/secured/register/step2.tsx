import React, { PropsWithChildren } from "react";
import { ViewMetaDate } from "../../../lib/types/View";
import Component from "../../../pages/register/Symptoms";

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 2",
    subTitle: "Symptoms",
    className: "step",
  },
};

export default function Step2(props: PropsWithChildren<any>) {
  return <Component {...props} />;
}
