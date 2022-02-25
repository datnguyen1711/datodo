import React from "react";
import TaskHeader from "./Task/TaskHeader/TaskHeader";
import TaskList from "./Task/TaskList/TaskList";
import { todoListSelector } from "../../redux/selector";
import { useSelector } from "react-redux";

const Dashboard = ({
  checked,
  handleActiveForm,
  handleActiveForm1,
  handleChecked,
}) => {
  const todoListTask = useSelector(todoListSelector);
  return (
    <div className="dashboard">
      <div className="task-main">
        <TaskHeader
          checked={checked}
          handleActiveForm={handleActiveForm}
          handleChecked={handleChecked}
        />
        <TaskList
          handleActiveForm1={handleActiveForm1}
          todoListTask={todoListTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
