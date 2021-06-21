import React, { useState } from "react";
import { Form, Input, Checkbox, Button, message } from "antd";
import "./index.css";
import { useHistory } from "react-router-dom";
import { API_URL } from "../config/constants";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegistrationForm() {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = (values) => {
    axios
      .post(`${API_URL}/join`, {
        username: values.username,
        email: values.email,
        password: values.password,
        confirm: values.confirm,
        nickname: values.nickname,
        phone: values.phone,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div id="register-contain">

    <img id="logo"src="/images/icons/잇츠마인.png" width="150" />
    <Form
      id="register-container"
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
    >
      
      <Form.Item
        name="username"
        label="아이디"
        rules={[
          {
            required: true,
            message: "아이디를 입력해주세요.",
            whitespace: true,
          },
        ]}
      >
        <Input className="register-input" />
      </Form.Item>
      
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          {
            type: "email",
            message: "이메일 형식이 아닙니다.",
          },
          {
            required: true,
            message: "이메일을 입력해주세요.",
          },
        ]}
      >
        <Input  className="register-input" />
      </Form.Item>

      <Form.Item
        name="password"
        label="패스워드"
        rules={[
          {
            required: true,
            message: "패스워드를 입력해주세요.",
          },
        ]}
        hasFeedback
      >
        <Input.Password  className="register-input"/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="패스워드 확인"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("입력하신 비밀번호가 다릅니다."));
            },
          }),
        ]}
      >
        <Input.Password  className="register-input"/>
      </Form.Item>

      <Form.Item
        name="nickname"
        label="닉네임"
        tooltip="별명"
        rules={[
          {
            required: true,
            message: "닉네임을 입력해주세요.",
            whitespace: true,
          },
        ]}
      >
        <Input  className="register-input"/>
      </Form.Item>

      <Form.Item
        name="phone"
        label="전화번호"
        rules={[
          {
            required: true,
            message: "전화번호를 입력해주세요.",
          },
        ]}
      >
        <Input className="register-input" />
      </Form.Item>
      
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}

export default RegistrationForm;
