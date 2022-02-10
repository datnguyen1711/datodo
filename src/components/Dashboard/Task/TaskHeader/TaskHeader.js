import React, { useState } from "react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";

import SortIcon from "@mui/icons-material/Sort";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { getStatusValue } from "../../../../redux/action";

const TaskHeader = ({ checked, handleActiveForm, handleChecked }) => {
  const [statusValue, setStatusValue] = useState("all");

  const dispatch = useDispatch();

  const handleStatusValue = (e) => {
    setStatusValue(e.target.value);
    dispatch(getStatusValue(e.target.value));
  };

  return (
    <>
      <h1 className="task-title">Tasks List</h1>
      <div className="task-box">
        <FormControlLabel
          control={<Checkbox checked={checked} onClick={handleChecked} />}
          label="Show incompleted task only"
          className="task-checked"
        />
        <div className="abcxyz">
          <Button
            variant="text"
            className="task-box_add"
            onClick={handleActiveForm}
          >
            <AddTaskIcon sx={{ mr: 1 }} />
            Add new task
          </Button>
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
    </>
  );
};

export default TaskHeader;
