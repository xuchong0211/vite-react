import React, { PropsWithChildren } from "react";
import { Form, DatePicker, Select, Input } from "antd";
import { PatientInterface, useBookingData } from "../../models/data";
import moment from "moment";
import { NextButton } from "../../components/common/Buttons";
import { LOCATIONS } from "../../constants/options";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export default function PatientInfo(props: PropsWithChildren<any>) {
  const bookingData = useBookingData();
  const patient = bookingData.value.patient as PatientInterface;
  const birthday = patient.birthday ? moment(patient.birthday) : undefined;

  const [form] = Form.useForm();

  return (
    <Form
      name="patient"
      form={form}
      {...layout}
      initialValues={{ ...patient, birthday }}
      onFinish={(patient) => {
        console.log("step 1 args", patient);
        const update: PatientInterface = {
          ...patient,
          birthday: patient.birthday.format("yyyy-MM-DD"),
        };
        console.log("update............................", update);
        bookingData.value.patient = update;
        bookingData.update();
        props.history.push("step2");
      }}
      onFinishFailed={() => {}}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="sex" label="Gender" rules={[{ required: true }]}>
        <Select>
          <Option value="male">male</Option>
          <Option value="female">female</Option>
        </Select>
      </Form.Item>

      <Form.Item name="birthday" label="Birthday" rules={[{ required: true }]}>
        <DatePicker
          style={{ width: "100%" }}
          format={"MM/DD/yyyy"}
          inputReadOnly
        />
      </Form.Item>

      <Form.Item
        label="Citizen ID"
        name="citizenId"
        rules={[
          { required: true, message: "Citizen ID is required" },
          {
            pattern: /^\d{16}$/,
            message: "Citizen ID is 16 digits",
          },
        ]}
      >
        <Input maxLength={16} />
      </Form.Item>

      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Select placeholder="Select Puskesmas" allowClear>
          {LOCATIONS.map((item) => {
            const [id, name] = item;
            return (
              <Option key={id} value={id}>
                {name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Address ID is required" }]}
      >
        <TextArea rows={3} />
      </Form.Item>

      <NextButton fixed={false} />
    </Form>
  );
}
