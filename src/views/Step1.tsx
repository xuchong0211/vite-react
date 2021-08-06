import React from "react";
import { Button, Form, Input, PageHeader } from "antd";
import { useBookingData } from "../models/data";
import { Link } from "react-router-dom";
import { NextButton } from "../components/common/PageWrapper";

export default function Step1(props: any) {
  console.log("step 1 props...................", props);
  const bookingData: { value: any; update: () => {} } = useBookingData();
  const { step1 } = bookingData.value;

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={step1}
      onFinish={(args) => {
        console.log("step 1 args", args);
        bookingData.value.step1 = args;
        bookingData.update();
        props.history.push("/Step2");
      }}
      onFinishFailed={() => {}}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Form.Item>
      <NextButton />
    </Form>
  );
}
