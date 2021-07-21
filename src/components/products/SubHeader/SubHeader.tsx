/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import { CustomButton } from "../../../elements";
import { CONSTANTS, URLS } from "../../../constants";

import { RootState } from "../../../utils/interfaces";

import { ACTION_CREATORS } from "../../../redux/actions/creators";

import styles from "./SubHeader.module.scss";

import DropDownMenu from "../DropDownMenu";
import DropDownItem from "../DropDownItem";

const SubHeader: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isDirectionOpen, setDirectionOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const sortCriteria = useSelector((state: RootState) => state.todo.sortCriteria);
  const sortDirection = useSelector((state: RootState) => state.todo.sortDirection);

  const handleSortCriteriaClick = (e) => {
    setOpen(!isOpen);
    dispatch(ACTION_CREATORS.setSortCriteria(e.target.getAttribute("data-name")));
  };

  const handleDirectionClick = (e) => {
    setDirectionOpen(!isDirectionOpen);
    dispatch(ACTION_CREATORS.setSortDirection(e.target.getAttribute("data-name")));
  };

  const handleChooseSortCriteria = () => {
    setOpen(!isOpen);
  };

  const handleChooseSortDirection = () => {
    setDirectionOpen(!isDirectionOpen);
  };

  const handleCreateNewTask = () => {
    dispatch(ACTION_CREATORS.setModalVisible({ isVisible: true, type: "task" }));
  };

  const handleSortClick = () => {
    dispatch(ACTION_CREATORS.getSortedTasks(URLS.SERVER_URL, sortCriteria, sortDirection));
  };

  return (
    <div className={styles.SubHeader}>
      <div className={`${styles.container} container`}>
        <div className={styles.sortBox} onClick={handleChooseSortCriteria}>
          <h3 className={styles.title}>{`sort by ${sortCriteria}`}</h3>
          <div className={styles.sortIcon}>{isOpen ? <UpOutlined /> : <DownOutlined />}</div>
          {isOpen && (
            <DropDownMenu>
              {CONSTANTS.DROPDOWN_DATA.map((obj) => (
                <DropDownItem key={obj.id} name={obj.name} handleDropDownClick={handleSortCriteriaClick} />
              ))}
            </DropDownMenu>
          )}
        </div>
        <div className={styles.sortBox} onClick={handleChooseSortDirection}>
          <h3 className={styles.title}>{`direction: ${sortDirection}`}</h3>
          <div className={styles.sortIcon}>{isDirectionOpen ? <UpOutlined /> : <DownOutlined />}</div>
          {isDirectionOpen && (
            <DropDownMenu>
              {CONSTANTS.DIRECTION_DATA.map((obj) => (
                <DropDownItem key={obj.id} name={obj.name} handleDropDownClick={handleDirectionClick} />
              ))}
            </DropDownMenu>
          )}
        </div>
        <CustomButton text="Sort" onClick={handleSortClick} />
        <CustomButton text="new Task" id="addTaskBtn" onClick={handleCreateNewTask} />
      </div>
    </div>
  );
};

export default SubHeader;
