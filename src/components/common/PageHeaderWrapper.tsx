import React, { PropsWithChildren } from "react";
import { Button, Form, PageHeader } from "antd";
import "../../styles/form.less";

interface PageHeaderWrapperPropsType extends PropsWithChildren<object> {
  history: { goBack: () => any; push: (path: string) => any };
  title: string;
  subTitle: string;
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
      <div className="step-form">{props.children}</div>
    </div>
  );
}

export const NextButton = ({ label = "next" }: { label?: string }) => (
  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button
      type="primary"
      htmlType="submit"
      shape="round"
      style={{ marginTop: 20 }}
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </Button>
  </Form.Item>
);
