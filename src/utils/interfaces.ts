export interface IAppState {}

export interface RootState {
  todo: {
    sortCriteria: string;
    sortDirection: string;
    isModalVisible: IModal;
    tasks: ITask[];
    totalNumber: string;
    currentPage: number;
    error: IError;
    success: string;
    isAdmin: boolean;
    token: string;
  };
}

export interface IModal {
  isVisible: boolean;
  type: string;
  isEdit?: boolean;
  id?: number;
  text?: string,
}

export interface ITask {
  id: number;
  username: string;
  email: string;
  text: string;
  status: number;
}
export interface IError {
  email: string;
  password: string;
}
export interface ILogin {
  username: string;
  password: string;
}

export interface IEdit {
  text: string;
  isDone: boolean;
  taskId: number;
}
