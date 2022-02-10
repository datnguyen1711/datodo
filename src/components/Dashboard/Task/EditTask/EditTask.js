import React, { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../../../firebase";

import {
  todoListSelector,
  todoListSelector1,
} from "../../../../redux/selector";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../redux/action";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

const EditTask = ({ handleCloseForm1, editTodo }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [descValue, setDescValue] = useState("");
  const [statusValue, setStatusValue] = useState("not-started");
  const [priorityValue, setPriorityValue] = useState("Medium");

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [editPriority, setEditPriority] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPrevStatus, setEditPrevStatus] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCompleted, setEditCompleted] = useState("");

  const [dateValue] = useState(
    `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  );

  useEffect(() => {
    addEditValue();
  }, [editTodo]);
  const addEditValue = () => {
    setEditTitle(editTodo.title);
    setEditId(editTodo.id);
    setEditDeadline(editTodo.deadline);
    setEditPriority(editTodo.priority);
    setEditStatus(editTodo.status);
    setEditPrevStatus(editTodo.prevStatus);
    setEditDesc(editTodo.desc);
    setEditCompleted(editTodo.completed);
  };

  const handleTitleValue = (e) => {
    setEditTitle(e.target.value);
  };

  const handleStatusValue = (event) => {
    setEditStatus(event.target.value);
  };

  const handleDescValue = (e) => {
    setEditDesc(e.target.value);
  };
  const handlePriorityValue = (e) => {
    setEditPriority(e.target.value);
  };
  const handleAddTask = (e) => {
    db.collection("todos")
      .doc(editId)
      .update({
        id: editId,
        title: editTitle,
        desc: editDesc,
        status: editStatus,
        prevStatus: editStatus === "done" ? editTodo.status : editPrevStatus,
        priority: editPriority,
        deadline: editDeadline,
        completed: editStatus === "done" ? true : false,
      });
    // setTitleValue("");
    setDescValue("");
    setStatusValue("not-started");
  };

  return (
    <div className="editTask-main">
      <i class="fa fa-times editTask-close" onClick={handleCloseForm1}></i>
      <div className="editTask-content">
        <h2 className="editTask-title">Edit Task</h2>
        <div className="editTask-form">
          <div className="input">
            <TextField
              id="outlined-multiline-static"
              multiline
              label="Task Title *"
              placeholder="Input Task Title"
              rows={1}
              className="form"
              value={editTitle}
              onChange={handleTitleValue}
              shrink
            />
          </div>
          <div className="input">
            <TextField
              id="outlined-multiline-static"
              label="Task Description"
              multiline
              rows={4}
              placeholder="Input Description"
              className="form"
              value={editDesc}
              onChange={handleDescValue}
              shrink
            />
          </div>
          <div className="dropdown">
            <FormControl required sx={{ m: 1, minWidth: "47%", margin: 0 }}>
              <InputLabel id="demo-simple-select-required-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={editStatus}
                label="Age *"
                onChange={handleStatusValue}
              >
                <MenuItem
                  value="not-started"
                  style={{ color: "#fff", backgroundColor: "#545454" }}
                >
                  <em>Not Started</em>
                </MenuItem>
                <MenuItem
                  value="pending"
                  style={{ color: "#fff", backgroundColor: "#E4B978" }}
                >
                  Pending
                </MenuItem>
                <MenuItem
                  value="in-progress"
                  style={{ color: "#fff", backgroundColor: "#9FD89B" }}
                >
                  In Progress
                </MenuItem>
                <MenuItem
                  value="delayed"
                  style={{ color: "#fff", backgroundColor: "#D37171" }}
                >
                  Delay
                </MenuItem>
                <MenuItem
                  value="done"
                  style={{ color: "#fff", backgroundColor: "#9BB9F5" }}
                >
                  Done
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl required sx={{ m: 1, minWidth: "47%", margin: 0 }}>
              <InputLabel id="demo-simple-select-required-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={editPriority}
                label="Age *"
                onChange={handlePriorityValue}
              >
                <MenuItem
                  value="Low"
                  style={{ color: "#fff", backgroundColor: "#545454" }}
                >
                  <em>Low</em>
                </MenuItem>
                <MenuItem
                  value="Medium"
                  style={{ color: "#fff", backgroundColor: "#E4B978" }}
                >
                  Medium
                </MenuItem>
                <MenuItem
                  value="High"
                  style={{ color: "#fff", backgroundColor: "#9FD89B" }}
                >
                  High
                </MenuItem>
                <MenuItem
                  value="Critical"
                  style={{ color: "#fff", backgroundColor: "#D37171" }}
                >
                  Critical
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            ...
          </LocalizationProvider> */}
          <div className="control">
            <Button
              variant="contained"
              size="large"
              style={{ padding: "12px", backgroundColor: "#58D65D" }}
              onClick={handleAddTask}
            >
              Add
            </Button>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "#d37171" }}
              onClick={handleCloseForm1}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
