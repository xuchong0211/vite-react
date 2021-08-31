import React, { FC, PropsWithChildren } from "react";
import { PageHeader } from "antd";
import "../../styles/form.less";
import { MyViewType, ViewMetaDate } from "../../lib/types/View";

interface PageHeaderWrapperPropsType extends PropsWithChildren<ViewMetaDate> {
  history: { goBack: () => any; push: (path: string) => any };
  title: string;
  subTitle: string;
  className?: string;
  goBack?: string;
}

export function PageHeaderWrapper(props: PageHeaderWrapperPropsType) {
  return (
    <div className="navigation-header">
      <PageHeader
        className="site-page-header"
        onBack={() =>
          props.goBack
            ? props.history.push(props.goBack)
            : props.history.goBack()
        }
        title={props.title}
        subTitle={props.subTitle}
      />
      <div
        className={props.className ? `content ${props.className}` : "content"}
      >
        {props.children}
      </div>
    </div>
  );
}

export function enhanceView(
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
