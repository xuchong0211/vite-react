import React from "react";
import { Form, DatePicker, Select } from "antd";
import { useBookingData } from "../../models/data";
import moment from "moment";
import { NextButton } from "../../components/common/PageHeaderWrapper";
import { ViewMetaDate } from "../../lib/types/View";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const metaData: ViewMetaDate = {
  header: {
    title: "Step 2",
    subTitle: "clinic information",
    goBack: "/",
  },
};

export default function Step2(props: any) {
  const bookingData: { value: any; update: () => {} } = useBookingData();
  const { step2 } = bookingData.value;
  const date = step2.date ? moment(step2.date) : undefined;

  const [form] = Form.useForm();

  return (
    <Form
      name="step2"
      form={form}
      {...layout}
      initialValues={{ ...step2, date }}
      onFinish={(args) => {
        console.log("step 2 args", args);
        const update = {
          ...args,
          date: args.date.format("yyyy-MM-DD"),
        };
        console.log("update............................", update);
        bookingData.value.step2 = update;
        bookingData.update();
        props.history.push("step3");
      }}
      onFinishFailed={() => {}}
    >
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select allowClear>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>

      <Form.Item name="date" label="Date" rules={[{ required: true }]}>
        <DatePicker style={{ width: "100%" }} format={"MM/DD/yyyy"} />
      </Form.Item>

      <Form.Item name="type" label="Clinic" rules={[{ required: true }]}>
        <Select placeholder="Select clinic type" allowClear>
          <Option value="primary">Primary</Option>
          <Option value="maternity">Maternity</Option>
          <Option value="contraception">Contraception</Option>
          <Option value="pediatric">Pediatric</Option>
        </Select>
      </Form.Item>

      <NextButton />
    </Form>
  );
}
