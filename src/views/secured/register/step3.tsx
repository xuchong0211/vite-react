import React, { Suspense } from "react";
import { ViewMetaDate } from "../../../lib/types/View";
import { InlineLoading } from "../../../components/common/Loading";

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 3",
    subTitle: "ANC Checklist information",
    className: "step",
  },
};

const Component = React.lazy(
  () => import("../../../pages/register/AncCheckList")
);

export default function Step3(props: any) {
  return (
    <Suspense fallback={<InlineLoading />}>
      <Component {...props} />
    </Suspense>
  );
}
