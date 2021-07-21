import React from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { Modal } from "antd";

import { ACTION_CREATORS } from "../../redux/actions/creators";

interface Props {
  children: React.ReactNode;
  title?: string;
  type?: string;
}

const CustomModal: React.FC<Props> = ({ children, title, type }) => {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(ACTION_CREATORS.setModalVisible({ isVisible: false, type, isEdit: false }));
  };

  return createPortal(
    <>
      <Modal title={title} visible onCancel={handleCancel} footer={null}>
        {children}
      </Modal>
    </>,
    document.getElementById("modal")
  );
};

export default CustomModal;
