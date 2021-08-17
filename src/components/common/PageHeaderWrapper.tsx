import React, { PropsWithChildren } from "react";
import { Button, Form, PageHeader } from "antd";
import "../../styles/form.less";
import { ViewMetaDate } from "../../lib/types/View";

interface PageHeaderWrapperPropsType extends PropsWithChildren<ViewMetaDate> {
  history: { goBack: () => any; push: (path: string) => any };
  title: string;
  subTitle: string;
  className?: string;
  goBack?: string;
}

export function PageHeaderWrapper(props: PageHeaderWrapperPropsType) {
  return (
    <div className="registration">
      <PageHeader
        className="site-page-header"
        onBack={() =>
          props.goBack ? props.history.push("/") : props.history.goBack()
        }
        title={props.title}
        subTitle={props.subTitle}
      />
      <div
        className={
          props.className ? `step-form ${props.className}` : "step-form"
        }
      >
        {props.children}
      </div>
    </div>
  );
}
