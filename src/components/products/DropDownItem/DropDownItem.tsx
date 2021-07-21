/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";

import styles from "../DropDownMenu/DropDownMenu.module.scss";

interface Props {
  name: string;
  handleDropDownClick?: any;
}

const DropDownItem: React.FC<Props> = ({ name, handleDropDownClick }) => (
  <li className={styles.item} data-name={name} onClick={handleDropDownClick}>
    {name.toLowerCase()}
  </li>
);

export default DropDownItem;
