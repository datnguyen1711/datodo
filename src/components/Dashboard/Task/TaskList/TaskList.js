import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortTask, removeTask } from "../../../../redux/action";

import TaskItem from "../TaskItem/TaskItem";

const TaskList = ({ handleActiveForm1 }) => {
  const [statusSortTitle, setStatusSortTitle] = useState(true);
  const [statusSortPriority, setStatusSortPriority] = useState(true);
  const [statusSortDate, setStatusSortDate] = useState(true);
  const dispatch = useDispatch();
  const handleSortTitle = (e) => {
    setStatusSortTitle(!statusSortTitle);
    // console.log(e.target.getAttribute("value"));
    dispatch(sortTask(e.target.getAttribute("value")));
  };
  const handleSortPriority = (e) => {
    setStatusSortPriority(!statusSortPriority);
    // console.log(e.target.getAttribute("value"));
    dispatch(sortTask(e.target.getAttribute("value")));
  };
  const handleSortDate = (e) => {
    setStatusSortDate(!statusSortDate);
    // console.log(e.target.getAttribute("value"));
    dispatch(sortTask(e.target.getAttribute("value")));
  };
  return (
    <div className="task-list">
      <ul className="task-list-first" style={{ height: "20px" }}>
        <li className="task-list-column">Status</li>
        <li className="task-list-column">
          <span style={{ marginRight: "5px" }}>Task Name</span>
          {statusSortTitle === true ? (
            <i
              class="fas fa-arrow-up"
              onClick={handleSortTitle}
              value="title-up"
            ></i>
          ) : (
            <i
              class="fas fa-arrow-down"
              onClick={handleSortTitle}
              value="title-down"
            ></i>
          )}
        </li>
        <li className="task-list-column">
          <span style={{ marginRight: "5px" }}>Priority</span>
          {statusSortPriority === true ? (
            <i
              class="fas fa-arrow-up"
              onClick={handleSortPriority}
              value="priority-up"
            ></i>
          ) : (
            <i
              class="fas fa-arrow-down"
              onClick={handleSortPriority}
              value="priority-down"
            ></i>
          )}
        </li>
        <li className="task-list-column">
          <span style={{ marginRight: "5px" }}>Deadline</span>
          {statusSortDate === true ? (
            <i
              class="fas fa-arrow-up"
              onClick={handleSortDate}
              value="date-up"
            ></i>
          ) : (
            <i
              class="fas fa-arrow-down"
              onClick={handleSortDate}
              value="date-down"
            ></i>
          )}
        </li>
        <li className="task-list-column"></li>
      </ul>
      <div className="task-list-main">
        <TaskItem handleActiveForm1={handleActiveForm1} />
      </div>
    </div>
  );
};

export default TaskList;
