import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Form, Input, Modal, Select } from "antd";
import { useBookingData } from "../../models/data";
import { NextButton } from "../../components/common/Buttons";
import _get from "lodash/get";

import {
  getEducationOptions,
  getInsuranceOptions,
  getOccupationOptions,
} from "../../constants/options";
import { useRegisterRequest } from "../../lib/request/api";
import { useHistory } from "react-router-dom";

const { Option } = Select;

export default function AncCheckList(props: any) {
  const toRegister = useRegisterRequest();
  const mutation = useMutation(toRegister);
  const bookingData: { value: any; update: () => {} } = useBookingData();
  const { ancCheckList, patient, symptoms } = bookingData.value;
  const [form] = Form.useForm();
  let history = useHistory();

  if (mutation.isError) {
    Modal.error({
      title: "Error",
      content: _get(
        mutation.error,
        "register.message",
        "server internal error"
      ),
      onOk() {
        history.go(-1);
      },
    });
    mutation.reset();
  }

  useEffect(() => {
    if (patient == null || symptoms == null) {
      history.push("/");
    }
  }, []);

  return (
    <Form
      name="ancCheckList"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={ancCheckList}
      onFinish={async (args) => {
        const { clinic, ...rest } = symptoms;
        const data = {
          patient,
          symptoms: rest,
          ancCheckList: args,
          type: clinic,
        };
        console.log("save registration 00000000000000", data);
        bookingData.value.ancCheckList = args;
        bookingData.update();
        mutation.mutate(data);
      }}
      onFinishFailed={() => {}}
    >
      <Form.Item name="insurance" label="Insurance">
        <Select allowClear>
          {getInsuranceOptions().map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="education" label="Education">
        <Select allowClear>
          {getEducationOptions().map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="occupation" label="Occupation">
        <Select allowClear>
          {getOccupationOptions().map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="partner" label="Partner Name">
        <Input />
      </Form.Item>

      <Form.Item name="partnerEducation" label="Partner Education">
        <Select allowClear>
          {getEducationOptions().map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="partnerOccupation" label="Partner Occupation">
        <Select allowClear>
          {getOccupationOptions().map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="father" label="Father Name">
        <Input />
      </Form.Item>

      <Form.Item name="mother" label="Mother Name">
        <Input />
      </Form.Item>

      <NextButton label={"submit"} />
    </Form>
  );
}
