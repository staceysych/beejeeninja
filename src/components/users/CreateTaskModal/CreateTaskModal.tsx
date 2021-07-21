import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Input, Radio } from "antd";

import { CustomButton, CustomModal } from "../../../elements";
import { RootState } from "../../../utils/interfaces";
import { ACTION_CREATORS } from "../../../redux/actions/creators";

import { URLS } from "../../../constants";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const CreateTaskModal: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isDone, setDone] = useState<boolean>(false);
  const isModalVisible = useSelector((state: RootState) => state.todo.isModalVisible);
  const token = useSelector((state: RootState) => state.todo.token);

  console.log(isModalVisible.text);

  const onFinish = (values: any) => {
    console.log(values);
    dispatch(ACTION_CREATORS.addNewTask(URLS.SERVER_URL_CREATE, values));
    form.resetFields();
    dispatch(ACTION_CREATORS.setModalVisible({ isVisible: false, type: "task", isEdit: false }));
  };

  const onEditFinish = (values: any) => {
    if (localStorage.getItem("isAdmin") === "false") {
      dispatch(ACTION_CREATORS.setToken(""));
      document.location.reload();
    } else {
      dispatch(ACTION_CREATORS.setModalVisible({ isVisible: false, type: "task", isEdit: false }));
      dispatch(ACTION_CREATORS.updateTask(URLS.SERVER_URL_UPDATE, isDone, values.text, isModalVisible.id, token));
      dispatch(ACTION_CREATORS.getSortedTasks(URLS.SERVER_URL));
      form.resetFields();
    }
  };

  const handleDoneClick = (e) => {
    setDone(e.target.checked);
  };

  return (
    isModalVisible.isVisible &&
    isModalVisible.type === "task" && (
      <CustomModal title={isModalVisible.isEdit ? "Edit Task" : "Create new task"}>
        {isModalVisible.isEdit ? (
          <Form {...layout} form={form} name="control-hooks" onFinish={onEditFinish}>
            <Form.Item name="text" label="Text">
              <Input.TextArea defaultValue={isModalVisible.text} />
            </Form.Item>
            <Form.Item name="text" label="change status to Done?">
              <Radio style={{ marginLeft: "10px" }} onChange={handleDoneClick}>
                Done
              </Radio>
            </Form.Item>
            <CustomButton text="Edit Task" isSubmit />
          </Form>
        ) : (
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="username" label="Username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="text" label="Text" rules={[{ required: true }]}>
              <Input.TextArea />
            </Form.Item>
            <CustomButton text="Create task" isSubmit />
          </Form>
        )}
      </CustomModal>
    )
  );
};

export default CreateTaskModal;
