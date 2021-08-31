import React from "react";
import { ViewMetaDate } from "../../../lib/types/View";
import Component from "../../../pages/register/AncCheckList";

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 3",
    subTitle: "ANC Checklist information",
    className: "step",
  },
};

export default function Step3(props: any) {
  return <Component {...props} />;
}
