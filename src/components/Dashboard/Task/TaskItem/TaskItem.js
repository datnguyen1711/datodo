import React, { useState, useEffect } from "react";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  completedTask,
  removeTask,
  addTask,
  dragTask,
} from "../../../../redux/action";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Swal from "sweetalert2";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { checkedSelector } from "../../../../redux/selector";
import { sortSelector } from "../../../../redux/selector";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

const TaskItem = ({ handleActiveForm1, todoListTask }) => {
  const [nowDate] = useState(
    `${new Date().getFullYear()}/${
      new Date().getMonth() + 1 < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }/${
      new Date().getDate() < 10
        ? "0" + new Date().getDate()
        : new Date().getDate()
    } ${
      new Date().getHours() < 10
        ? "0" + new Date().getHours()
        : new Date().getHours()
    }:${
      new Date().getMinutes() < 10
        ? "0" + new Date().getMinutes()
        : new Date().getMinutes()
    }:${
      new Date().getSeconds() < 10
        ? "0" + new Date().getSeconds()
        : new Date().getSeconds()
    }`
  );
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
  const handleSubmitClose = async () => {
    setOpen(false);
    dispatch(removeTask(idValue));
    await deleteDoc(doc(db, "todos", idValue));
    Swal.fire("Delete Task Success!", "", "success");
  };

  useEffect(() => {
    const getData = dispatch(addTask(nowDate));
    return () => getData();
  }, []);

  const completedTask1 = useSelector(checkedSelector);
  const sortSelector1 = useSelector(sortSelector);

  const firstUpperCase = (str) => {
    return str[0].toUpperCase() + str.substring(1);
  };
  const forrmatMonth = (str) => {
    switch (str) {
      case "01":
        return "Jan";
      case "02":
        return "Feb";
      case "03":
        return "Mar";
      case "04":
        return "Apr";
      case "05":
        return "May";
      case "06":
        return "Jun";
      case "07":
        return "Jul";
      case "08":
        return "Aug";
      case "09":
        return "Sep";
      case "10":
        return "Oct";
      case "11":
        return "Nov";
      case "12":
        return "Dec";
      default:
        return "";
    }
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

  const handleDragEnd = ({ destination, source }) => {
    if (sortSelector1 === "None") {
      const newArray = Array.from(
        todoListTask.filter((item) =>
          completedTask1 === "All" ? true : !item.completed
        )
      );
      const newArray1 = todoListTask.filter((item) =>
        completedTask1 === "All" ? true : !item.completed
      );
      const [removed] = newArray1.splice(source.index, 1);
      const result = newArray1.splice(destination.index, 0, removed);
      dispatch(dragTask(newArray, newArray1));
    } else {
      Swal.fire("Warning", "You should unsort before drag task!", "warning");
    }
  };
  return (
    <>
      {Object.keys(todoListTask).length === 0 ? (
        <div>
          <h1>No data yet</h1>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="itemTask">
            {(provided) => (
              <div
                className="task-list-main"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {todoListTask
                  .filter((item) =>
                    completedTask1 === "All" ? true : !item.completed
                  )
                  .map((item, index) => {
                    return (
                      <Draggable
                        key={item.id}
                        index={index}
                        draggableId={item.id}
                      >
                        {(provided) => (
                          <div
                            className="task-list-data"
                            key={item.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              className={`task-list-item ${
                                item.status ? item.status : ""
                              }`}
                            >
                              <h3>{splitStatus(item.status)}</h3>
                              {/* <h3>{item.status}</h3> */}
                            </div>
                            <div className="task-list-item">
                              <Checkbox
                                checked={item.completed}
                                value={item.id}
                                onClick={handleChecked}
                                className="checked-box"
                              />
                              <div className="tast-list-content">
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                              </div>
                            </div>
                            <div className="task-list-item">
                              <div
                                className={`tast-list-prio ${item.priority}`}
                              >
                                {item.priority}
                              </div>
                            </div>
                            <div className="task-list-item">
                              <div className="tast-list-deadline">
                                <div className="tast-list-deadline-year">
                                  {item.deadline.slice(0, 4)}
                                </div>
                                <div className="tast-list-deadline-month">
                                  {forrmatMonth(item.deadline.slice(5, 7))}
                                </div>
                                <div className="tast-list-deadline-day">
                                  {item.deadline.slice(8, 10)}
                                </div>
                                <div className="tast-list-deadline-time">
                                  {item.deadline.slice(10, 19)}
                                </div>
                              </div>
                            </div>

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
                        )}
                      </Draggable>
                    );
                  })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
            If you delete this task you can???t resolve it.
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
