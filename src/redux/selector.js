export const todoListSelector = (state) => {
  const checkedBox = checkedSelector(state);
  const sortBox = sortSelector(state);
  const statusBox = getStatusSelector(state);
  const sortingArr = ["Low", "Medium", "High", "Critical"];
  const sortingArr1 = ["Critical", "High", "Medium", "Low"];
  const newState = state.todoList.filter(
    (tag, index, array) => array.findIndex((item) => item.id == tag.id) == index
  );
  const newState1 = newState.filter((item) =>
    statusBox === "all" ? item : item.status === statusBox
  );
  if (checkedBox === "incompleted") {
    const newStateIncompleted = newState.filter((item) =>
      statusBox === "all"
        ? !item.completed
        : !item.completed && item.status === statusBox
    );
    switch (sortBox) {
      case "title-up": {
        const sortItem = [...newStateIncompleted].slice().sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        return sortItem;
      }
      case "title-down": {
        const sortItem = [...newStateIncompleted].slice().sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        return sortItem;
      }
      case "date-up": {
        const sortItem = [...newStateIncompleted].slice().sort(function (a, b) {
          return a.deadline.localeCompare(b.deadline);
        });
        return sortItem;
      }
      case "date-down": {
        const sortItem = [...newStateIncompleted].slice().sort(function (a, b) {
          return b.deadline.localeCompare(a.deadline);
        });
        return sortItem;
      }
      case "priority-up": {
        const sortItem = [...newStateIncompleted].sort(
          (a, b) =>
            sortingArr.indexOf(a.priority) - sortingArr.indexOf(b.priority)
        );
        return sortItem;
      }
      case "priority-down": {
        const sortItem = [...newStateIncompleted].sort(
          (a, b) =>
            sortingArr1.indexOf(a.priority) - sortingArr1.indexOf(b.priority)
        );
        return sortItem;
      }
      case "None": {
        return newStateIncompleted;
      }
      default:
        return newStateIncompleted;
    }
  } else {
    switch (sortBox) {
      case "title-up": {
        const sortItem = [...newState1].slice().sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        return sortItem;
      }
      case "title-down": {
        const sortItem = [...newState1].slice().sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        return sortItem;
      }
      case "date-up": {
        const sortItem = [...newState1].slice().sort(function (a, b) {
          return a.deadline.localeCompare(b.deadline);
        });
        return sortItem;
      }
      case "date-down": {
        const sortItem = [...newState1].slice().sort(function (a, b) {
          return b.deadline.localeCompare(a.deadline);
        });
        return sortItem;
      }
      case "priority-up": {
        const sortItem = [...newState1].sort(
          (a, b) =>
            sortingArr.indexOf(a.priority) - sortingArr.indexOf(b.priority)
        );
        return sortItem;
      }
      case "priority-down": {
        const sortItem = [...newState1].sort(
          (a, b) =>
            sortingArr1.indexOf(a.priority) - sortingArr1.indexOf(b.priority)
        );
        return sortItem;
      }
      case "None": {
        return newState1;
      }
      default:
        return newState1;
    }
  }
};
export const checkedSelector = (state) => state.filter.status;
export const sortSelector = (state) => state.filter.sort;
export const getIDSelector = (state) => state.filter.idTask;
export const getStatusSelector = (state) => state.filter.filterStatus;

export const todoListSelector1 = (state) => {
  const getIDSelector1 = getIDSelector(state);
  if (getIDSelector1 === "None") {
    return state.todoList;
  } else {
    return state.todoList.filter((item) => item.id === getIDSelector1);
  }
};
