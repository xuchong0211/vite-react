import React from "react";
import {
  ExclamationCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons/lib";
import { useUserData } from "../../models/data";
import { useLogoutRequest } from "../../lib/request/api";
import { Modal } from "antd";

export default function () {
  const user = useUserData();
  const logout = useLogoutRequest();
  return user.value.username ? (
    <div
      className="logout"
      onClick={() => {
        Modal.confirm({
          title: "Confirm",
          icon: <ExclamationCircleOutlined />,
          content: "Do you Want to logout ?",
          onOk() {
            Modal.destroyAll();
            logout();
          },
          onCancel() {},
        });
      }}
    >
      <LogoutOutlined
        twoToneColor="#eb2f96"
        style={{ fontSize: 25, color: "#3665b1" }}
      />
    </div>
  ) : null;
}
