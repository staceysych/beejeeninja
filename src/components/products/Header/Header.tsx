import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { CustomButton } from "../../../elements";

import { ACTION_CREATORS } from "../../../redux/actions/creators";

import { RootState } from "../../../utils/interfaces";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.todo.isAdmin);

  const handleSignIn = () => {
    dispatch(
      ACTION_CREATORS.setModalVisible({
        isVisible: true,
        type: "login",
      })
    );
  };

  const handleSignOut = () => {
    dispatch(ACTION_CREATORS.setAdmin(false));
    dispatch(ACTION_CREATORS.setToken(""));
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("token", "");
  };

  return (
    <div className={styles.Header}>
      <div className={`${styles.container} container`}>
        <h1 className={styles.title}>Tasks Master</h1>
        <CustomButton text={isAdmin ? "Sign out" : "Sign in"} onClick={isAdmin ? handleSignOut : handleSignIn} />
      </div>
    </div>
  );
};

export default Header;
