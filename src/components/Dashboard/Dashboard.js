import React from "react";
import TaskHeader from "./Task/TaskHeader/TaskHeader";
import TaskList from "./Task/TaskList/TaskList";

const Dashboard = ({
  checked,
  handleActiveForm,
  handleActiveForm1,
  handleChecked,
}) => {
  return (
    <div className="dashboard">
      <div className="task-main">
        <TaskHeader
          checked={checked}
          handleActiveForm={handleActiveForm}
          handleChecked={handleChecked}
        />
        <TaskList handleActiveForm1={handleActiveForm1} />
      </div>
    </div>
  );
};

export default Dashboard;
