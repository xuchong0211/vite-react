import React, { PropsWithChildren } from "react";
import { Form, DatePicker, Select, Input } from "antd";
import { PatientInterface, useBookingData } from "../../models/data";
import moment from "moment";
import { NextButton } from "../../components/common/Buttons";

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LOCATIONS = [
  ["3", "WATES"],
  ["4", "SENTOLO 2"],
  ["5", "KALIBAWANG"],
  ["6", "PENGASIH 1"],
  ["7", "LENDAH 2"],
  ["8", "SENTOLO 1"],
  ["9", "PANJATAN 1"],
  ["10", "TEMON 1"],
  ["11", "KOKAP 1"],
  ["12", "LENDAH 1"],
  ["13", "SAMIGALUH 1"],
  ["14", "SAMIGALUH 2"],
  ["15", "GIRIMULYO 1"],
  ["16", "GIRIMULYO 2"],
  ["17", "NANGGULAN"],
  ["18", "KOKAP 2"],
  ["19", "PENGASIH 2"],
  ["20", "TEMON 2"],
  ["21", "PANJATAN 2"],
  ["22", "GALUR 1"],
  ["23", "GALUR 2"],
];

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
        <DatePicker style={{ width: "100%" }} format={"MM/DD/yyyy"} />
      </Form.Item>

      <Form.Item
        label="Citizen ID"
        name="citizenId"
        rules={[{ required: true, message: "Citizen ID is required" }]}
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
