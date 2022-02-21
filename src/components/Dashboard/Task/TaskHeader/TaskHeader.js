import React, { useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import db from "../../../../firebase";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { sortTask, removeTask } from "../../../../redux/action";

import AddTaskIcon from "@mui/icons-material/AddTask";
import HistoryIcon from "@mui/icons-material/History";
import { getStatusValue } from "../../../../redux/action";

const TaskHeader = ({ checked, handleActiveForm, handleChecked }) => {
  const [statusValue, setStatusValue] = useState("all");
  const [sortValue, setSortValue] = useState("None");
  const [darkMode, setDarkMode] = useState(false);

  const dispatch = useDispatch();

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
    dispatch(getStatusValue(e.target.value));
  };
  const handleSortValue = (e) => {
    setSortValue(e.target.value);
    dispatch(sortTask(e.target.value));
  };
  const handleDarkMode = (e) => {
    if (darkMode === false) {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setDarkMode(false);
    }
  };
  const handleCheckSort = (e) => {
    dispatch(sortTask("None"));
    dispatch(getStatusValue("all"));
    setSortValue("None");
    setStatusValue("all");
  };

  return (
    <>
      <div className="task-headers">
        <h1 className="task-title">Tasks List</h1>
        <i
          class={`fas fa-light ${
            darkMode === false ? "fa-moon" : "fa-sun whites"
          }`}
          onClick={handleDarkMode}
        ></i>
      </div>
      <div className="task-box">
        <FormControlLabel
          control={
            <Checkbox
              className="checked-box"
              checked={checked}
              onClick={handleChecked}
            />
          }
          label="Show incompleted task only"
          className="task-checked"
        />
        <Button
          variant="text"
          className="task-box_add"
          onClick={handleCheckSort}
        >
          <HistoryIcon sx={{ mr: 1 }} />
          Unsort
        </Button>
        <div className="abcxyz">
          <Button
            variant="text"
            className="task-box_add"
            onClick={handleActiveForm}
          >
            <AddTaskIcon sx={{ mr: 1 }} />
            Add new task
          </Button>
          <div className="abcxyz-main">
            <div className="abcxyz-main-sort">
              <FormControl required sx={{ m: 1, minWidth: 150, margin: 0 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={sortValue}
                  label="Sort By"
                  onChange={handleSortValue}
                >
                  <MenuItem
                    value="None"
                    style={{ color: "#fff", backgroundColor: "#9FD89B" }}
                  >
                    None
                  </MenuItem>
                  <MenuItem
                    value="title-up"
                    style={{ color: "#fff", backgroundColor: "#ff7979" }}
                  >
                    <em>Title</em>
                  </MenuItem>
                  <MenuItem
                    value="priority-up"
                    style={{ color: "#fff", backgroundColor: "#545454" }}
                  >
                    Priority
                  </MenuItem>
                  <MenuItem
                    value="date-up"
                    style={{ color: "#fff", backgroundColor: "#E4B978" }}
                  >
                    Date
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl required sx={{ m: 1, minWidth: 150, margin: 0 }}>
              <InputLabel id="demo-simple-select-required-label">
                Filter Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={statusValue}
                label="Filter Status"
                onChange={handleStatusValue}
              >
                <MenuItem
                  value="all"
                  style={{ color: "#fff", backgroundColor: "#ff7979" }}
                >
                  <em>All</em>
                </MenuItem>
                <MenuItem
                  value="not-started"
                  style={{ color: "#fff", backgroundColor: "#545454" }}
                >
                  Not Started
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskHeader;
