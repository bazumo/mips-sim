import React from "react";
import "./SidebarItem.css";

export default function SidebarItem({ title, style, children }) {
  return (
    <div className="sidebarItem" style={style}>
      <header>{title}</header>
      {children}

    </div>
  );
}
