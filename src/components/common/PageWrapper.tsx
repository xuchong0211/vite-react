import React from "react";
import { Button, Form, PageHeader } from "antd";

export default function PageWrapper(props: any) {
  return (
    <div className="App">
      <PageHeader
        className="site-page-header"
        onBack={() => props.history.goBack()}
        title={props.title}
        subTitle={props.subTitle}
      />
      <div className="step-form">{props.children}</div>
    </div>
  );
}

export const NextButton = () => (
  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
    <Button
      type="primary"
      htmlType="submit"
      shape="round"
      style={{ marginTop: 20 }}
    >
      <span style={{ color: "#fff" }}>next</span>
    </Button>
  </Form.Item>
);
