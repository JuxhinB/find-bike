import React from "react";
import { Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import _string from "../../../config/localization/_string";

function GuestActions(): JSX.Element {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        type="default"
        shape="round"
        icon={<LockOutlined />}
        size="large"
        style={{ marginBottom: "1rem" }}
      >
        {_string.ACTIONS.login}
      </Button>
      <Button type="primary" shape="round" icon={<UserOutlined />} size="large">
        {_string.ACTIONS.register}
      </Button>
    </div>
  );
}

export default GuestActions;
