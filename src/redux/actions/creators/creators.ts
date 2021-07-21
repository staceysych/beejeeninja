import { IModal, ITask, ILogin } from "../../../utils/interfaces";

import {
  SET_SORT_CRITERIA,
  SET_MODAL_VISIBLE,
  SET_TASKS,
  SET_TOTAL_TASKS_NUM,
  SET_ERROR,
  SET_SUCCESS,
  SET_SORT_DIRECTION,
  SET_ADMIN,
  SET_TOKEN,
} from "../types/index";

const setSortCriteria = (sortCriteria: string) => ({ type: SET_SORT_CRITERIA, sortCriteria });
const setSortDirection = (sortDirection: string) => ({ type: SET_SORT_DIRECTION, sortDirection });
const setModalVisible = (isModalVisible: IModal) => ({ type: SET_MODAL_VISIBLE, isModalVisible });
const setTasks = (tasks: ITask[]) => ({ type: SET_TASKS, tasks });
const setTotalTasksNumber = (totalNumber: string) => ({ type: SET_TOTAL_TASKS_NUM, totalNumber });
const setError = (error: object) => ({ type: SET_ERROR, error });
const setSuccess = (success: string) => ({ type: SET_SUCCESS, success });
const setAdmin = (isAdmin: boolean) => ({ type: SET_ADMIN, isAdmin });
const setToken = (token: string) => ({ type: SET_TOKEN, token });

const getSortedTasks =
  (url: string, sortField = "status", sortDirection = "asc", page = 1) =>
  async (dispatch) => {
    const response = await fetch(`${url}&sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`);
    const data = await response.json();

    if (response.status === 200) {
      dispatch(setTasks(data.message.tasks));
      dispatch(setTotalTasksNumber(data.message.total_task_count));
    }
  };

const addNewTask = (url: string, body: ITask) => async (dispatch) => {
  const formData = new FormData();
  formData.append("username", body.username);
  formData.append("email", body.email);
  formData.append("text", body.text);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (data.status === "ok") {
    console.log("added");
    dispatch(setSuccess("Task has been added"));
  } else {
    console.log("error");
    dispatch(setError(data.message));
  }
};

const login = (url: string, body: ILogin) => async (dispatch) => {
  const formData = new FormData();
  formData.append("username", body.username);
  formData.append("password", body.password);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (data.status === "ok") {
    dispatch(setToken(data.message.token));
    dispatch(setSuccess("You successfully logged in"));
    dispatch(setAdmin(true));
    localStorage.setItem("token", data.message.token);
  } else {
    console.log("error");
    dispatch(setError(data.message));
  }
};

const updateTask = (url: string, isDone: boolean, text: string, id: number, token: string) => async (dispatch) => {
  const formData = new FormData();
  let status = 0;
  if (isDone) {
    status = 10;
  }

  if (text) {
    status += 1;
  }
  formData.append("text", text);
  formData.append("status", status.toString());
  formData.append("token", token);

  const requestOptions = {
    method: "POST",
    body: formData,
  };

  const response = await fetch(`${url}${id}?developer=Sych`, requestOptions);
  const data = await response.json();

  if (data.status === "ok") {
    dispatch(setToken(data.message.token));
    dispatch(setSuccess("You successfully logged in"));
    dispatch(setAdmin(true));
  } else {
    console.log("error");
    dispatch(setError(data.message));
  }
};

export default {
  setSortCriteria,
  setModalVisible,
  addNewTask,
  setError,
  setSuccess,
  getSortedTasks,
  setSortDirection,
  login,
  setAdmin,
  setToken,
  updateTask,
};
