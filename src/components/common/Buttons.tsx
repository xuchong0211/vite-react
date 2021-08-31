import React from "react";
import { Button, Form } from "antd";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.div<{ fixed: boolean }>`
  position: ${(props) => (props.fixed ? "fixed" : "static")};
  bottom: 20px;
  right: 0;
  left: 0;
  background-color: white;
  padding-bottom: ${(props) => (props.fixed ? "0" : "20px")};
  button {
    width: 50%;
    background-color: #3665b1 !important;
    border-color: #3665b1 !important;
    span {
      color: #fff;
      font-weight: bolder;
    }
  }
`;

export const NextButton = ({
  label = "next",
  fixed = false,
}: {
  label?: string;
  fixed?: boolean;
}) => (
  <Btn fixed={fixed}>
    <Button
      type="primary"
      htmlType="submit"
      shape="round"
      size="large"
      style={{ marginTop: 0 }}
    >
      <span style={{ color: "#fff" }}>{label}</span>
    </Button>
  </Btn>
);

export const FixedButton = ({
  to,
  label,
  loading = false,
}: {
  to: string;
  label: string;
  loading?: boolean;
}) => {
  return (
    <div className={"fixed-button"}>
      <Button type={"primary"} shape="round" size="large" loading={loading}>
        <Link to={to}>{label}</Link>
      </Button>
    </div>
  );
};

export const RedirectFixedButton = ({
  to,
  label,
}: {
  to: string;
  label: string;
}) => {
  return (
    <div className={"fixed-button"}>
      <Button type={"primary"} shape="round" size="large">
        <Redirect to={to}>{label}</Redirect>
      </Button>
    </div>
  );
};
