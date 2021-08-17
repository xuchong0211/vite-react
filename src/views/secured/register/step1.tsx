import React, { Suspense, PropsWithChildren } from "react";
import { ViewMetaDate } from "../../../lib/types/View";
import { InlineLoading } from "../../../components/common/Loading";

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 1",
    subTitle: "Personal information",
    goBack: "/",
    className: "step",
  },
};

const Component = React.lazy(
  () => import("../../../pages/register/PatientInfo")
);

export default function Step1(props: PropsWithChildren<any>) {
  return (
    <Suspense fallback={<InlineLoading />}>
      <Component {...props} />
    </Suspense>
  );
}
