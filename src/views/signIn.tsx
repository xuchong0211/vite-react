import React, { PropsWithChildren, useCallback, useState } from "react";
import { Form, Input, Select, Avatar, message as Message } from "antd";
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
  },
};

const flag =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAAoCAYAAABNefLBAAABP2lDQ1BJQ0MgUHJvZmlsZQAAKJFjYGDiSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8rAwcDJwMXAyMCRmFxc4BgQ4ANUwgCjUcG3a0B1QHBZF2SWrmz73cAVXk4nmaRifT1mJmOqRwFcKanFIDV/gDghuaCohIGBMQbIVi4vKQCxG4BskSKgo4DsKSB2OoS9AsROgrD3gNWEBDkD2ReAbIHkjMQUIPsBkK2ThCSejsSG2gsCbIFG5haWBBxKKihJrSgB0c75BZVFmekZJQqOwNBJVfDMS9bTUTAyMDJkYACFNUT15yBwGDKK7UOI5S9hYLD4xsDAPBEhlgQMg+1tDAwStxBiKvMYGPhbGBi2HSpILEqEO4DxG0txmrERhM1jz8DAevf//88aDAzsExkY/k78///34v///y4Gmn+bgeFAJQCNb1ylx5TuxQAAAFZlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA5KGAAcAAAASAAAARKACAAQAAAABAAAAPaADAAQAAAABAAAAKAAAAABBU0NJSQAAAFNjcmVlbnNob3QmkvTqAAAB1GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj42MTwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlVzZXJDb21tZW50PlNjcmVlbnNob3Q8L2V4aWY6VXNlckNvbW1lbnQ+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj40MDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoIZ9obAAABQklEQVRoBe2YwQ4BMRCGp2tF4kCEZ3CRODp5YDfv5CISkTi4CFv/TLfWrBdgOpXYzlTF128qaUNEo8eDmvORTLfRmMJsTgGQQaCvF7pvNxTxSo2H7DTmOqzWtNztiRFrQQNjwrUFm7WF5DeFQKzyQElPhy7Ftpt204ZXwMvbsFyF5qbVchgO3LRhuQpNm442DxyKGIGGDvlo2f/Yf8d9lRoabBaxG3HWkaXzNJINLlBy63o58//PD7z2EqEa0mm+ELIK+7pBmYd2f0f03zkcxnkH8HjO8aTc/9U5zHCbzt7m0nXR80mEKyOpbYatUBARlc+EnJR+PzfAOOf4uzBH+r86Bz+yHhFNJgKeoKVbztvXH1kJ6A5dgmVmdNNu2vAKeHkblqvQ3LRaDsOBmzYsV6G5abUchgM3bViuQnPTajkMBy89x6RqdhGvnAAAAABJRU5ErkJggg==";

const { Option } = Select;

const selectBefore = (
  <Select
    style={{ backgroundColor: "#cecece" }}
    defaultValue="+62"
    className="select-before"
  >
    <Option value="+62">
      <Avatar
        className={"icon"}
        src={flag}
        shape="square"
        style={{ marginRight: 5 }}
      />
      +62
    </Option>
  </Select>
);

const COUNT_DOWN_SECONDS = isDev() ? 5 : 60;

export default function SignIn(props: PropsWithChildren<any>) {
  console.log("SignIn props...................", props);
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
      console.log("eeeeeeeeeeeeeeeeeeeeeee", e);
      Message.error(`Send validation code failed.`);
    }
  }, []);

  const toSignIn = async (args: { code: string }) => {
    await signIn({
      ...args,
      phone: phone || "",
    });
    // Message.success("Sign In successful");
    props.history.push("register/step1");
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
