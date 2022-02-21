import "./App.css";
import { useState } from "react";
import "./index.scss";
import "./reset.css";
import SidePanel from "./components/SidePanel/SidePanel";
import Dashboard from "./components/Dashboard/Dashboard";
import AddTask from "./components/Dashboard/Task/AddTask/AddTask";
import { useDispatch } from "react-redux";
import { getIDTask, ShowIncompletedTask } from "./redux/action";
import EditTask from "./components/Dashboard/Task/EditTask/EditTask";

function App() {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [data, setData] = useState("");
  const [isActiveAddTask, setIsActiveAddTask] = useState(false);
  const [isActiveAddTask1, setIsActiveAddTask1] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const dispatch = useDispatch();

  const handleChecked = (e) => {
    e.preventDefault();
    setChecked(!checked);
    dispatch(ShowIncompletedTask(!checked === true ? "incompleted" : "All"));
  };

  const handleActiveForm = (e) => {
    setIsActiveAddTask(!checked2);
  };
  const handleActiveForm1 = (todo) => {
    setIsActiveAddTask1(!checked1);
    // localStorage.setItem("id", e.target.getAttribute("value"));
    // dispatch(getIDTask(e.target.getAttribute("value")));
    setEditTodo(todo);
  };

  const handleCloseForm = (e) => {
    setIsActiveAddTask(false);
  };
  const handleCloseForm1 = () => {
    setIsActiveAddTask1(false);
  };

  return (
    <>
      <div className="dato">
        <div className="container">
          <SidePanel />
          <Dashboard
            checked={checked}
            handleActiveForm={handleActiveForm}
            handleActiveForm1={handleActiveForm1}
            handleChecked={handleChecked}
          />
        </div>
      </div>
      <div className={isActiveAddTask === true ? "addTask is-show" : "addTask"}>
        <AddTask
          handleCloseForm={handleCloseForm}
          setIsActiveAddTask={setIsActiveAddTask}
        />
      </div>
      <div
        className={isActiveAddTask1 === true ? "editTask is-show" : "editTask"}
      >
        <EditTask
          handleCloseForm1={handleCloseForm1}
          setIsActiveAddTask1={setIsActiveAddTask1}
          editTodo={editTodo}
        />
      </div>
    </>
  );
}

export default App;
