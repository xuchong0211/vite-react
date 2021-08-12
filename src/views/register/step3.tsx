import React from "react";
import { Form, Input } from "antd";
import { useBookingData } from "../../models/data";
import { NextButton } from "../../components/common/PageHeaderWrapper";
import { ViewMetaDate } from "../../lib/types/View";

const { Item } = Form;

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 3",
    subTitle: "Symptoms",
  },
};

export default function Step1(props: any) {
  const bookingData: { value: any; update: () => {} } = useBookingData();
  const { step1 } = bookingData.value;

  return (
    <Form
      name="step3"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={step1}
      onFinish={(args) => {
        console.log("step 3 args", args);
        bookingData.value.step3 = args;
        bookingData.update();
        props.history.push("step4");
      }}
      onFinishFailed={() => {}}
    >
      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Item>

      <Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Item>

      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Item>

      <Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Item>

      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Item>

      <Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Item>

      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Item>

      <Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Item>

      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Item>

      <Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Item>

      <Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input />
      </Item>

      <Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Please input Citizen ID" }]}
      >
        <Input />
      </Item>

      <Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please input phone" }]}
      >
        <Input />
      </Item>

      <Item
        label="Code"
        name="code"
        rules={[{ required: true, message: "Please input code" }]}
      >
        <Input />
      </Item>
      <NextButton />
    </Form>
  );
}
