import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Input } from "antd";

import { CustomButton, CustomModal } from "../../../elements";
import { RootState } from "../../../utils/interfaces";
import { ACTION_CREATORS } from "../../../redux/actions/creators";
import { URLS } from "../../../constants";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LoginModal = () => {
  const [form] = Form.useForm();
  const isModalVisible = useSelector((state: RootState) => state.todo.isModalVisible);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    dispatch(ACTION_CREATORS.login(URLS.SERVER_URL_LOGIN, values));
    form.resetFields();
    dispatch(ACTION_CREATORS.setModalVisible({ isVisible: false, type: "login" }));
    localStorage.setItem("isAdmin", "true");
  };

  return (
    isModalVisible.isVisible &&
    isModalVisible.type === "login" && (
      <CustomModal title="Sign in">
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="username" label="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <CustomButton text="Sign in" isSubmit />
        </Form>
      </CustomModal>
    )
  );
};

export default LoginModal;
