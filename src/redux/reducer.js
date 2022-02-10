const initialState = {
  filter: {
    sort: "None",
    status: "All",
    filterStatus: "all",
    idTask: "None",
    priority: [],
  },
  todoList: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
      };
    case "FETCH_TASK":
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
      };

    case "COMPLETE_TASK":
      const toggleTask = state.todoList.map((item) =>
        item.id === action.payload.id
          ? {
              ...action.payload,
              completed: !action.payload.completed,
              prevStatus: action.payload.status,
              status:
                action.payload.status === "done"
                  ? action.payload.prevStatus
                  : "done",
            }
          : item
      );
      return {
        ...state,
        todoList: toggleTask,
      };

    case "REMOVE_TASK":
      const newTask = state.todoList.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        todoList: newTask,
      };

    case "INCOMPLETED_TASK":
      return {
        ...state,
        filter: { ...state.filter, status: action.payload },
      };

    case "SORT_TASK":
      return {
        ...state,
        filter: { ...state.filter, sort: action.payload },
      };
    case "STATUS_VALUE":
      return {
        ...state,
        filter: { ...state.filter, filterStatus: action.payload },
      };
    case "GET_IDTASK":
      return {
        ...state,
        filter: { ...state.filter, idTask: action.payload },
      };

    default:
      return state;
  }
};

export default rootReducer;
