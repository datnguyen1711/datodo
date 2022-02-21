import React, { useState } from "react";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../../../firebase";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DateTimePicker from "react-datetime-picker";

import { todoListSelector } from "../../../../redux/selector";
import Swal from "sweetalert2";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";

const AddTask = ({ handleCloseForm, setIsActiveAddTask }) => {
  const [titleValue, setTitleValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [statusValue, setStatusValue] = useState("not-started");
  const [priorityValue, setPriorityValue] = useState("Medium");
  const [dateValue, setDateValue] = useState(new Date());
  console.log(dateValue.getMonth() + 1);
  const handleStatusValue = (event) => {
    setStatusValue(event.target.value);
  };

  const handleTitleValue = (e) => {
    setTitleValue(e.target.value);
  };
  const handleDescValue = (e) => {
    setDescValue(e.target.value);
  };
  const todoListTask = useSelector(todoListSelector);

  let index = 1;
  for (let i = 0; i < todoListTask.length; i++) {
    if (index <= todoListTask[i].index) {
      index = todoListTask[i].index + 1;
    }
  }
  const handlePriorityValue = (e) => {
    setPriorityValue(e.target.value);
  };
  const handleDateValue = (e) => {
    setDateValue(e);
  };
  const handleAddTask = (e) => {
    if (titleValue != "") {
      db.collection("todos").add({
        id: uuidv4(),
        title: titleValue,
        index: index,
        desc: descValue,
        status: statusValue,
        prevStatus: statusValue === "done" ? "not-started" : statusValue,
        priority: priorityValue,
        deadline: `${dateValue.getFullYear()}/${
          dateValue.getMonth() + 1 < 10
            ? "0" + (dateValue.getMonth() + 1)
            : dateValue.getMonth() + 1
        }/${
          dateValue.getDate() < 10
            ? "0" + dateValue.getDate()
            : dateValue.getDate()
        } ${
          dateValue.getHours() < 10
            ? "0" + dateValue.getHours()
            : dateValue.getHours()
        }:${
          dateValue.getMinutes() < 10
            ? "0" + dateValue.getMinutes()
            : dateValue.getMinutes()
        }:${
          dateValue.getSeconds() < 10
            ? "0" + dateValue.getSeconds()
            : dateValue.getSeconds()
        }`,
        completed: statusValue === "done" ? true : false,
      });
      Swal.fire("Add Task Success!", "", "success");
    } else if (titleValue === "") {
      Swal.fire("Add Task Failed!", "Please enter all fields", "error");
    }
    setTitleValue("");
    setDescValue("");
    setStatusValue("not-started");
    setPriorityValue("Medium");
    setDateValue(new Date());
    setIsActiveAddTask(false);
  };

  return (
    <div className="addTask-main">
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
            <FormControl required sx={{ m: 1, minWidth: "47%", margin: 0 }}>
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
            <FormControl required sx={{ m: 1, minWidth: "47%", margin: 0 }}>
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
          <div className="datetime">
            <span>Deadline: </span>
            <DateTimePicker onChange={handleDateValue} value={dateValue} />
          </div>
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
