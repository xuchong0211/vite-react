import React, { PropsWithChildren, useCallback, useState } from "react";
import { Form, Input, Select, message as Message } from "antd";
import Countdown from "react-countdown";
import { NextButton } from "../components/common/Buttons";
import { ViewMetaDate } from "../lib/types/View";
import {
  SendCodeResponse,
  useSendCodeRequest,
  useSignInRequest,
} from "../lib/request/api";
import { isDev } from "../lib/request/utils";

export const metaData: ViewMetaDate = {
  header: {
    title: "Sign in",
    subTitle: "with your phone #",
    className: "center",
  },
};

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="+62" className="select-before">
    <Option value="+62">+62</Option>
  </Select>
);

const COUNT_DOWN_SECONDS = isDev() ? 5 : 60;

export default function SignIn(props: PropsWithChildren<AnyObject>) {
  console.log("step 1 props...................", props);
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [time, setTime] = useState(Date.now());
  const sendCode = useSendCodeRequest();
  const signIn = useSignInRequest();
  const onSendCode = useCallback(async (args) => {
    try {
      console.log("step 1 args", args);
      const response = (await sendCode(args)) as SendCodeResponse;
      const { message, ...rest } = response;
      setPhone(rest.phone);
      //todo remove code
      Message.success(`Validation code is : ${rest.code}`);
      setTime(Date.now());
    } catch (e) {
      Message.error(`Send validation code failed.`);
    }
  }, []);

  const toSignIn = async (args: { code: string }) => {
    await signIn({
      ...args,
      phone: phone || "",
    });
    // Message.success("Sign In successful");
    props.history.push("entry");
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{}}
      onFinish={phone ? toSignIn : onSendCode}
      onFinishFailed={() => {}}
    >
      {phone ? (
        <>
          <Form.Item
            label="Validation Code"
            name="code"
            rules={[{ required: true, message: "Validation Code is required" }]}
          >
            <Input />
          </Form.Item>
          <Countdown
            key={time}
            date={time + COUNT_DOWN_SECONDS * 1000}
            renderer={({ hours, minutes, seconds, completed }) => {
              if (completed) {
                // Render a completed state
                return (
                  <div style={{ textAlign: "right" }}>
                    <a onClick={() => onSendCode({ phone })}>re-send code</a>
                  </div>
                );
              } else {
                // Render a countdown
                return (
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: "#ababab" }}>
                      {seconds} to re-send code
                    </span>
                  </div>
                );
              }
            }}
          />
        </>
      ) : (
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Phone number is required" }]}
        >
          <Input addonBefore={selectBefore} />
        </Form.Item>
      )}
      <NextButton label={phone ? "Sign In" : "Send Code"} fixed={true} />
    </Form>
  );
}
