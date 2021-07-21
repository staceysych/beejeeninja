import React from "react";
import { Button } from "antd";

interface Props {
  text: string;
  id?: string;
  onClick?: any;
  isSubmit?: boolean;
}

const CustomButton: React.FC<Props> = ({ text, id, onClick, isSubmit }) => (
  <Button id={id} type="primary" htmlType={isSubmit ? "submit" : "button"} onClick={onClick}>
    {text}
  </Button>
);

export default CustomButton;
