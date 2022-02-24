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
  const newState1Sort = [...newState1];

  if (checkedBox === "incompleted") {
    const newStateIncompleted = newState.filter((item) =>
      statusBox === "all" ? true : item.status === statusBox
    );
    const newStateIncompleted1 = [...newStateIncompleted];

    switch (sortBox) {
      case "title-up": {
        const sortItem = [...newStateIncompleted1]
          .slice()
          .sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
        return sortItem;
      }
      case "title-down": {
        const sortItem = [...newStateIncompleted1]
          .slice()
          .sort(function (a, b) {
            return b.title.localeCompare(a.title);
          });
        return sortItem;
      }
      case "date-up": {
        const sortItem = [...newStateIncompleted1]
          .slice()
          .sort(function (a, b) {
            return a.deadline.localeCompare(b.deadline);
          });
        return sortItem;
      }
      case "date-down": {
        const sortItem = [...newStateIncompleted1]
          .slice()
          .sort(function (a, b) {
            return b.deadline.localeCompare(a.deadline);
          });
        return sortItem;
      }
      case "priority-up": {
        const sortItem = [...newStateIncompleted1].sort(
          (a, b) =>
            sortingArr.indexOf(a.priority) - sortingArr.indexOf(b.priority)
        );
        return sortItem;
      }
      case "priority-down": {
        const sortItem = [...newStateIncompleted1].sort(
          (a, b) =>
            sortingArr1.indexOf(a.priority) - sortingArr1.indexOf(b.priority)
        );
        return sortItem;
      }
      case "None": {
        return newStateIncompleted1;
      }
      default:
        return newStateIncompleted1;
    }
  } else {
    switch (sortBox) {
      case "title-up": {
        const sortItem = [...newState1Sort].slice().sort(function (a, b) {
          return a.title.localeCompare(b.title);
        });
        return sortItem;
      }
      case "title-down": {
        const sortItem = [...newState1Sort].slice().sort(function (a, b) {
          return b.title.localeCompare(a.title);
        });
        return sortItem;
      }
      case "date-up": {
        const sortItem = [...newState1Sort].slice().sort(function (a, b) {
          return a.deadline.localeCompare(b.deadline);
        });
        return sortItem;
      }
      case "date-down": {
        const sortItem = [...newState1Sort].slice().sort(function (a, b) {
          return b.deadline.localeCompare(a.deadline);
        });
        return sortItem;
      }
      case "priority-up": {
        const sortItem = [...newState1Sort].sort(
          (a, b) =>
            sortingArr.indexOf(a.priority) - sortingArr.indexOf(b.priority)
        );
        return sortItem;
      }
      case "priority-down": {
        const sortItem = [...newState1Sort].sort(
          (a, b) =>
            sortingArr1.indexOf(a.priority) - sortingArr1.indexOf(b.priority)
        );
        return sortItem;
      }
      case "None": {
        return newState1Sort;
      }
      default:
        return newState1Sort;
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
