export const getInitialState = () => ({
  sortCriteria: "status",
  isModalVisible: {
    isVisible: false,
    type: "login",
    isEdit: false,
    id: 0,
    text: "",
  },
  tasks: [
    {
      username: "",
      email: "",
      text: "",
    },
  ],
  totalNumber: 0,
  currentPage: 1,
  error: {},
  success: "",
  sortDirection: "asc",
  isAdmin: localStorage.getItem("isAdmin") === "true" || false,
  token: localStorage.getItem("token") || "",
});
