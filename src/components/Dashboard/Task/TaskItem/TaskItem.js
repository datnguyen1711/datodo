import React, { useState, useEffect } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../../../firebase";

import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { completedTask, removeTask, fetchTask } from "../../../../redux/action";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { todoListSelector } from "../../../../redux/selector";
import { sortSelector } from "../../../../redux/selector";

const defaultValue = {
  completed: "",
  deadline: "",
  desc: "",
  id: "",
  prevStatus: "",
  priority: "",
  status: "",
  title: "",
};

const TaskItem = ({ handleActiveForm1 }) => {
  const [state, setState] = useState(defaultValue);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [idValue, setIdValue] = useState("");

  const handleClickOpen = (e) => {
    setOpen(true);
    setIdValue(e.target.getAttribute("value"));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitClose = () => {
    setOpen(false);
    dispatch(removeTask(idValue));
    db.collection("todos").doc(idValue).delete();
  };

  useEffect(() => {
    fetchDataFireBase();
  }, [state]);
  const fetchDataFireBase = () => {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      querySnapshot.docs.map((doc) =>
        dispatch(
          fetchTask({
            id: doc.id,
            title: doc.data().title,
            desc: doc.data().desc,
            status: doc.data().status,
            prevStatus: doc.data().prevStatus,
            priority: doc.data().priority,
            deadline: doc.data().deadline,
            completed: doc.data().completed,
          })
        )
      );
    });
  };

  const todoListTask = useSelector(todoListSelector);
  console.log(todoListTask);

  const firstUpperCase = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  };
  const splitStatus = (item) => {
    let newItem = item
      .split("-")
      .map((str) => firstUpperCase(str))
      .join(" ");
    return newItem;
  };
  const handleChecked = (e) => {
    const getIdTask = todoListTask.find((item) => item.id === e.target.value);
    e.preventDefault();
    dispatch(completedTask(getIdTask));

    db.collection("todos")
      .doc(e.target.value)
      .update({
        completed: !getIdTask.completed,
        prevStatus: getIdTask.status,
        status: getIdTask.status === "done" ? getIdTask.prevStatus : "done",
      });
  };
  return (
    <>
      {Object.keys(todoListTask).length === 0 ? (
        <div>
          <h1>No data yet</h1>
        </div>
      ) : (
        todoListTask.map((item) => {
          return (
            <div className="task-list-data" key={item.id} draggable>
              <div
                className={`task-list-item ${item.status ? item.status : ""}`}
              >
                <h3>{splitStatus(item.status)}</h3>
                {/* <h3>{item.status}</h3> */}
              </div>
              <div className="task-list-item">
                <Checkbox
                  checked={item.completed}
                  value={item.id}
                  onClick={handleChecked}
                />
                <div className="tast-list-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              <div className="task-list-item">
                <div className={`tast-list-prio ${item.priority}`}>
                  {item.priority}
                </div>
              </div>
              <div className="task-list-item">{item.deadline}</div>

              <div className="task-list-item">
                <div className="task-list-icon">
                  <i
                    class="fas fa-edit icon-1"
                    value={item.id}
                    onClick={() => handleActiveForm1(item)}
                  ></i>
                  <span>
                    <i
                      className="fas fa-trash icon-2"
                      value={item.id}
                      onClick={handleClickOpen}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ padding: "30px 60px 5px 30px" }}
        >
          Are you want to delete this task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete this task you can’t resolve it.
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: "20px" }}>
          <Button
            onClick={handleClose}
            style={{
              color: "#d37171",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitClose}
            style={{
              backgroundColor: "#d37171",
              color: "#fff",
              padding: "11px 20px",
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
