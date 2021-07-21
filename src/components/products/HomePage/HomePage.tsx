import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";

import styles from "./HomePage.module.scss";

import { ACTION_CREATORS } from "../../../redux/actions/creators";

import { URLS } from "../../../constants";

import TaskCard from "../TaskCard";
import { ITask, RootState } from "../../../utils/interfaces";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const totalTasks = useSelector((state: RootState) => state.todo.totalNumber);
  const currentPage = useSelector((state: RootState) => state.todo.currentPage);
  const sortCriteria = useSelector((state: RootState) => state.todo.sortCriteria);
  const sortDirection = useSelector((state: RootState) => state.todo.sortDirection);

  useEffect(() => {
    dispatch(ACTION_CREATORS.getSortedTasks(URLS.SERVER_URL, sortCriteria, sortDirection));
  }, []);

  const onPaginationChange = (page: number) => {
    dispatch(ACTION_CREATORS.getSortedTasks(URLS.SERVER_URL, sortCriteria, sortDirection, page));
  };

  return (
    <>
      <div className={styles.HomePage}>{tasks.length && tasks.map((task: ITask) => <TaskCard task={task} />)}</div>
      <Pagination current={currentPage} total={+totalTasks} pageSize={3} onChange={onPaginationChange} />
    </>
  );
};

export default HomePage;
