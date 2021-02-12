import React, { useState } from "react";
import { Button, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import _string from "../../../config/localization/_string";
import auth from "../../authentication";

function GuestActions(): JSX.Element {
  const [isAuthModalVisible, setIsAuthModalVisible] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<"login" | "register" | null>(
    null
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Button
        type="default"
        shape="round"
        icon={<LockOutlined />}
        size="large"
        style={{ marginBottom: "1rem" }}
        onClick={() => {
          setActiveForm("login");
          setIsAuthModalVisible(true);
        }}
      >
        {_string.ACTIONS.login}
      </Button>
      <Button
        type="primary"
        shape="round"
        icon={<UserOutlined />}
        size="large"
        onClick={() => {
          setActiveForm("register");
          setIsAuthModalVisible(true);
        }}
      >
        {_string.ACTIONS.register}
      </Button>

      <Modal
        footer={null}
        onCancel={() => {
          setIsAuthModalVisible(false);
        }}
        visible={isAuthModalVisible}
        title={
          activeForm === "login"
            ? _string.LABELS.login
            : activeForm === "register"
            ? _string.LABELS.register
            : ""
        }
      >
        {activeForm === "login" ? (
          <auth.LoginForm setIsAuthModalVisible={setIsAuthModalVisible} />
        ) : activeForm === "register" ? (
          <auth.RegisterForm setIsAuthModalVisible={setIsAuthModalVisible} />
        ) : null}
      </Modal>
    </div>
  );
}

export default GuestActions;
