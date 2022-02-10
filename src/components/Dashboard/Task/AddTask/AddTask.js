import React, { useState } from "react";

import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../../../firebase";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../../../redux/action";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

const AddTask = ({ handleCloseForm }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(
    new Date().toJSON().slice(0, 19).split("-").join("/").split("T").join(" ")
  );
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [statusValue, setStatusValue] = useState("not-started");
  const [priorityValue, setPriorityValue] = useState("Medium");
  // const [dateValue] = useState(date);

  // `${new Date().getDate()}/${
  //   new Date().getMonth() + 1
  // }/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };
  const handleDescValue = (e) => {
    setDescValue(e.target.value);
  };
  const handlePriorityValue = (e) => {
    setPriorityValue(e.target.value);
  };
  const handleAddTask = (e) => {
    if (titleValue != "") {
      db.collection("todos").add({
        id: uuidv4(),
        title: titleValue,
        desc: descValue,
        status: statusValue,
        prevStatus: statusValue === "done" ? "not-started" : statusValue,
        priority: priorityValue,
        deadline: date,
        completed: statusValue === "done" ? true : false,
      });
    }
    // dispatch(
    //   addTask({
    //     id: uuidv4(),
    //     title: titleValue,
    //     desc: descValue,
    //     status: statusValue,
    //     prevStatus: statusValue === "done" ? "not-started" : statusValue,
    //     priority: priorityValue,
    //     deadline: date,
    //     completed: statusValue === "done" ? true : false,
    //   })
    // );
    setTitleValue("");
    setDescValue("");
    setStatusValue("not-started");
    setPriorityValue("Medium");
  };

  return (
    <div
      className="addTask-main"
      // onClick={(e) => setIsActiveAddTask(!isActiveAddTask)}
    >
      <i class="fa fa-times addTask-close" onClick={handleCloseForm}></i>
      <div className="addTask-content">
        <h2 className="addTask-title">Add New Task</h2>
        <div className="addTask-form">
          <div className="input">
            <TextField
              required
              id="outlined-required"
              label="Task Title"
              placeholder="Input Task Title"
              className="form"
              value={titleValue}
              onChange={handleTitleValue}
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
              value={descValue}
              onChange={handleDescValue}
            />
          </div>
          <div className="dropdown">
            <FormControl required sx={{ m: 1, minWidth: 210, margin: 0 }}>
              <InputLabel id="demo-simple-select-required-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={statusValue}
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
            <FormControl required sx={{ m: 1, minWidth: 210, margin: 0 }}>
              <InputLabel id="demo-simple-select-required-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={priorityValue}
                label="Age *"
                onChange={handlePriorityValue}
              >
                <MenuItem
                  value="Low"
                  style={{ color: "#363636", backgroundColor: "#a0a0a0" }}
                >
                  <em>Low</em>
                </MenuItem>
                <MenuItem
                  value="Medium"
                  style={{ color: "#c99c30", backgroundColor: "#ffeab9" }}
                >
                  Medium
                </MenuItem>
                <MenuItem
                  value="High"
                  style={{ color: "#ff8125", backgroundColor: "#feceab" }}
                >
                  High
                </MenuItem>
                <MenuItem
                  value="Critical"
                  style={{ backgroundColor: "#f59b9b", color: "#d02222" }}
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
              onClick={handleCloseForm}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
