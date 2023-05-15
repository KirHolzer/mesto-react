import React from "react";
import logo from "../images/MestoRussia.svg";

export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место" />
    </header>
  );
}
