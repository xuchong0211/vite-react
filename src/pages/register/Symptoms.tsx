import React, { useEffect } from "react";
import { DatePicker, Form, Input, Select, Checkbox } from "antd";
import moment from "moment";
import { useBookingData } from "../../models/data";
import { NextButton } from "../../components/common/Buttons";
import { getComplaintOptions, LOCATIONS } from "../../constants/options";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const CheckBoxGroup = styled(Checkbox.Group)`
  text-align: left;
  .ant-checkbox-group-item {
    span {
      font-size: 18px;
    }
  }
`;

const { Option } = Select;
const { Item } = Form;

const disabledDate = (current: any) => {
  return (
    current < moment().startOf("day") || current.diff(moment(), "days") > 6
  );
};

export default function Symptoms(props: any) {
  const bookingData: { value: any; update: () => {} } = useBookingData();
  const symptoms = bookingData.value.symptoms || {};
  const date = symptoms.date ? moment(symptoms.date) : undefined;
  let history = useHistory();
  useEffect(() => {
    if (bookingData.value.patient == null) {
      history.push("/");
    }
  }, []);

  return (
    <Form
      name="symptoms"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ ...symptoms, date }}
      onFinish={(symptoms) => {
        console.log("step 2 symptoms.......", symptoms);
        const update: AnyObject = {
          ...symptoms,
          date: symptoms.date.format("yyyy-MM-DD"),
        };
        console.log("update..............", update);
        bookingData.value.symptoms = update;
        bookingData.update();
        props.history.push("success");
      }}
      onFinishFailed={() => {}}
    >
      <Item name="clinic" label="Clinic" rules={[{ required: true }]}>
        <Select allowClear>
          <Option value="primary">Primary</Option>
          <Option value="maternity">Maternity</Option>
          <Option value="contraception">Contraception</Option>
          <Option value="pediatric">Pediatric</Option>
        </Select>
      </Item>

      <Form.Item name="location" label="Location" rules={[{ required: true }]}>
        <Select allowClear>
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

      <Item name="date" label="Appointment Date" rules={[{ required: true }]}>
        <DatePicker
          style={{ width: "100%" }}
          format={"MM/DD/yyyy"}
          disabledDate={disabledDate}
          inputReadOnly
        />
      </Item>

      {/*<Item name="complaints" label="Complaints" rules={[{ required: false }]}>*/}
      {/*  <Select*/}
      {/*    mode="tags"*/}
      {/*    style={{ width: "100%" }}*/}
      {/*    placeholder="Select Symptoms"*/}
      {/*    allowClear*/}
      {/*  >*/}
      {/*    {complaints.map((item, index) => {*/}
      {/*      return (*/}
      {/*        <Option key={`complaints_${index}`} value={item.value}>*/}
      {/*          {item.value}*/}
      {/*        </Option>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </Select>*/}
      {/*</Item>*/}

      <Item name="complaints" label="Complaints" rules={[{ required: false }]}>
        <CheckBoxGroup
          style={{ textAlign: "left" }}
          options={getComplaintOptions()}
        />
      </Item>

      <Item label="Comments" name="comments">
        <Input.TextArea rows={8} />
      </Item>
      <NextButton />
    </Form>
  );
}
