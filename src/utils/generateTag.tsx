import React from "react";

import { Tag } from "antd";

export const generateTag = (status: number) => {
  switch (status) {
    case 1:
      return <Tag color="blue">edited</Tag>;
    case 10:
      return <Tag color="green">done</Tag>;
    case 11:
      return <Tag color="gold">D/E</Tag>;
    default:
      return <Tag color="red">active</Tag>;
  }
};
