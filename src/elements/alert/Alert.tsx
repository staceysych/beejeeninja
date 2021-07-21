import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ACTION_CREATORS } from "@/redux/actions/creators";
import { RootState } from "../../utils/interfaces";

import styles from "./Alert.module.scss";

const Alert: React.FC = () => {
  const error = useSelector((state: RootState) => state.todo.error);
  const success = useSelector((state: RootState) => state.todo.success);
  const dispatch = useDispatch();
  const styleName = [styles.wrapper];

  console.log(error);

  useEffect(() => {
    let timer;
    if (error.email || error.password || success) {
      timer = setTimeout(() => {
        dispatch(ACTION_CREATORS.setError({ email: "", password: "" }));
        dispatch(ACTION_CREATORS.setSuccess(""));
      }, 2000);
    } else {
      clearTimeout(timer);
    }
  }, [error.email, success, error.password]);

  if (success) {
    styleName.push(styles.success);
  }

  return error.email || error.password || success ? (
    <div className={styleName.join(" ")}>{error.email || success || error.password}</div>
  ) : null;
};

export default Alert;
