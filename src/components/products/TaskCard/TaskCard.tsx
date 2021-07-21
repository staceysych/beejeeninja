import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "./TaskCard.module.scss";
import { ITask, RootState } from "../../../utils/interfaces";
import { generateTag } from "../../../utils";
import { CustomButton } from "../../../elements";
import { ACTION_CREATORS } from "../../../redux/actions/creators";

interface Props {
  task: ITask;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.todo.isAdmin);

  const handleEditClick = () => {
    dispatch(
      ACTION_CREATORS.setModalVisible({
        isVisible: true,
        type: "task",
        isEdit: true,
        id: task.id,
        text: task.text,
      })
    );
  };

  return (
    <div className={styles.TaskCard} key={task.id}>
      <div className={styles.header} aria-hidden="true">
        <h3>{task.id}</h3>
        <div className={styles.tag}>{generateTag(task.status)}</div>
      </div>
      {isAdmin && (
        <div className={styles.controls}>
          <CustomButton text="edit" onClick={handleEditClick} />
        </div>
      )}
      <Divider orientation="left" />
      <div className={styles.content}>
        <p>{task.text}</p>
      </div>
      <Divider orientation="left" />
      <div className={styles.userDetails}>
        <div className={styles.user}>
          <UserOutlined />
          <span>{task.username}</span>
        </div>
        <a href={`mailto:${task.email}`}>{task.email}</a>
      </div>
    </div>
  );
};

export default TaskCard;
