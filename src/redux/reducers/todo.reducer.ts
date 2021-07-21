import {
  SET_SORT_CRITERIA,
  SET_MODAL_VISIBLE,
  SET_TASKS,
  SET_TOTAL_TASKS_NUM,
  SET_CURRENT_PAGE,
  SET_ERROR,
  SET_SUCCESS,
  SET_SORT_DIRECTION,
  SET_ADMIN,
  SET_TOKEN,
} from "../actions/types";

import { getInitialState } from "../../utils";

export default function todoReducer(state = getInitialState(), action) {
  switch (action.type) {
    case SET_SORT_CRITERIA:
      return { ...state, sortCriteria: action.sortCriteria };
    case SET_MODAL_VISIBLE:
      return { ...state, isModalVisible: { ...state.isModalVisible, ...action.isModalVisible } };
    case SET_TASKS:
      return { ...state, tasks: action.tasks };
    case SET_TOTAL_TASKS_NUM:
      return { ...state, totalNumber: action.totalNumber };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SET_SUCCESS:
      return { ...state, success: action.success };
    case SET_SORT_DIRECTION:
      return { ...state, sortDirection: action.sortDirection };
    case SET_ADMIN:
      return { ...state, isAdmin: action.isAdmin };
    case SET_TOKEN:
      return { ...state, token: action.token };
    default:
      return state;
  }
}
