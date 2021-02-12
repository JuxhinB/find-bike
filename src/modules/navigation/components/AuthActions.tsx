import React, { useContext } from "react";
import { Button, Dropdown, Menu } from "antd";
import {
  UserOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import _string from "../../../config/localization/_string";
import { UserContext } from "../../../provider/UserProvider";

function AuthActions(): JSX.Element {
  const { logout, userInfo, actionList } = useContext(UserContext);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Dropdown
        trigger={["click"]}
        overlay={
          <Menu
            style={{
              maxHeight: "60vh",
              overflow: "hidden",
              overflowY: "scroll",
            }}
          >
            {actionList.map((item) => (
              <Menu.Item
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderBottom: "1px solid lightgray",
                  borderTop: "1px solid lightgray",
                }}
              >
                <span
                  style={{
                    color: item.action === "RENT" ? "green" : "red",
                  }}
                >
                  {item.action}
                </span>
                <span>{formatDate(item.created_at)}</span>
              </Menu.Item>
            ))}
          </Menu>
        }
        placement="topRight"
        arrow
      >
        <Button
          type="default"
          shape="round"
          icon={<UnorderedListOutlined />}
          size="large"
          style={{ marginBottom: "1rem", textTransform: "capitalize" }}
          disabled
        >
          {_string.ACTIONS.actions_history}
        </Button>
      </Dropdown>
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

function formatDate(stringDate: string) {
  let date = new Date(stringDate);
  var d = date.getDate();
  var m = date.getMonth() + 1; //Month from 0 to 11
  var y = date.getFullYear();
  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}
