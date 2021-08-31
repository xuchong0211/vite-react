import React, { PropsWithChildren } from "react";
import { ViewMetaDate } from "../../../lib/types/View";
import Component from "../../../pages/register/PatientInfo";

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 1",
    subTitle: "Personal information",
    goBack: "/entry",
    className: "step",
  },
};

export default function Step1(props: PropsWithChildren<any>) {
  return <Component {...props} />;
}
