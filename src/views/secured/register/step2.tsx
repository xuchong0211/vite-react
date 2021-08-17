import React, { Suspense } from "react";
import { ViewMetaDate } from "../../../lib/types/View";
import { InlineLoading } from "../../../components/common/Loading";

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 2",
    subTitle: "Symptoms",
    className: "step",
  },
};

const Component = React.lazy(() => import("../../../pages/register/Symptoms"));

export default function Step2(props: any) {
  return (
    <Suspense fallback={<InlineLoading />}>
      <Component {...props} />
    </Suspense>
  );
}
