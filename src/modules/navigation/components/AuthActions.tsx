import React, { useContext } from "react";
import { Button } from "antd";
import { UserOutlined, UnlockOutlined } from "@ant-design/icons";
import _string from "../../../config/localization/_string";
import { UserContext } from "../../../provider/UserProvider";

function AuthActions(): JSX.Element {
  const { logout, userInfo } = useContext(UserContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {userInfo && (
        <Button
          type="default"
          shape="round"
          icon={<UserOutlined />}
          size="large"
          style={{ marginBottom: "1rem", textTransform: "capitalize" }}
          onClick={() => {}}
        >
          {userInfo.name}
        </Button>
      )}
      <Button
        type="default"
        shape="round"
        danger={true}
        icon={<UnlockOutlined />}
        size="large"
        onClick={() => {
          logout();
        }}
      >
        {_string.ACTIONS.logout}
      </Button>
    </div>
  );
}

export default AuthActions;
