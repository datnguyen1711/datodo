import db from "../firebase";
import {
  orderBy,
  collection,
  query,
  onSnapshot,
  doc,
  writeBatch,
} from "firebase/firestore";

export const addTask = (nowDate) => (dispatch) => {
  dispatch({
    type: "ADD_TASK",
  });

  const datas = query(collection(db, "todos"), orderBy("index", "asc"));
  const dataList = onSnapshot(datas, (querySnapshot) => {
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      status:
        doc.data().completed === "true"
          ? doc.data().status
          : doc.data().deadline < nowDate
          ? "delayed"
          : doc.data().status,
      prevStatus: doc.data().status,
      ...doc.data(),
    }));

    dispatch({
      type: "ADD_TASK_COMPLETED",
      payload: {
        tasks: data,
        size: data.length,
      },
    });
  });

  return dataList;
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
export const dragTask = (newArray, newArray1) => async (dispatch) => {
  dispatch({
    type: "DND_TASK",
    payload: newArray1,
  });

  const batch = writeBatch(db);
  newArray1.forEach((task, index) => {
    const linkRef = doc(db, "todos", task.id);
    batch.update(linkRef, { index: newArray[index].index });
  });

  await batch.commit();
};
