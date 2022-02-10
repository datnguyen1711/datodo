import React from "react";
import logo from "../../assets/images/logo1.png";

const SidePanel = () => {
  let menu = [
    { id: 1, name: "Home" },
    { id: 2, name: "Project" },
    { id: 3, name: "Calendar" },
    { id: 4, name: "Team" },
  ];
  return (
    <div className="sidePanel">
      <div className="sidePanel-logo">
        <div className="sidePanel-logo-img">
          <img src={logo} alt="" />
        </div>
        <span className="sidePanel-logo-name">
          <span className="green">Dat</span>odo
        </span>
      </div>
      <div className="sidePanel-menu">
        <ul className="sidePanel-menu-list">
          {menu.map((item) => {
            return (
              <li className="sidePanel-menu-item" key={item.id}>
                <a href="#">
                  <span className={item.id === 2 ? "active" : ""}>
                    {item.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
