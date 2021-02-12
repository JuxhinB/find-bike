import React, { Dispatch } from "react";
import { Form, Input, Button } from "antd";
import _string from "../../config/localization/_string";

interface Props {
  setIsAuthModalVisible?: Dispatch<boolean>;
}

function LoginForm({ setIsAuthModalVisible }: Props): JSX.Element {
  const [form] = Form.useForm();
  const onFinish = (values: { name: string; password: string }) => {
    if (setIsAuthModalVisible) {
      setIsAuthModalVisible(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        name: "",
        password: "",
      }}
      onFinish={onFinish}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Form.Item
          style={{ flex: 1 }}
          label={_string.LABELS.name}
          name="name"
          rules={[
            {
              required: true,
              message: _string.MESSAGES.required_field,
            },
            {
              min: 6,
              message: `${_string.MESSAGES.min_length_input} 6`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={_string.LABELS.password}
          name="password"
          rules={[
            {
              required: true,
              message: _string.MESSAGES.required_field,
            },
            {
              min: 8,
              message: `${_string.MESSAGES.min_length_input} 8`,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ alignSelf: "flex-end", marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            {_string.ACTIONS.login}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}

export default LoginForm;
