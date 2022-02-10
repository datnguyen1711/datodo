export const addTask = (data) => {
  return {
    type: "ADD_TASK",
    payload: data,
  };
};
export const fetchTask = (data) => {
  return {
    type: "FETCH_TASK",
    payload: data,
  };
};
export const completedTask = (data) => {
  return {
    type: "COMPLETE_TASK",
    payload: data,
  };
};
export const removeTask = (data) => {
  return {
    type: "REMOVE_TASK",
    payload: data,
  };
};
export const ShowIncompletedTask = (data) => {
  return {
    type: "INCOMPLETED_TASK",
    payload: data,
  };
};
export const sortTask = (data) => {
  return {
    type: "SORT_TASK",
    payload: data,
  };
};
export const getStatusValue = (data) => {
  return {
    type: "STATUS_VALUE",
    payload: data,
  };
};
export const getIDTask = (data) => {
  return {
    type: "GET_IDTASK",
    payload: data,
  };
};
