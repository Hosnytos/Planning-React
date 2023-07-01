import React, { useEffect, useRef } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { GiSoccerKick } from "react-icons/gi";
import "../styles/ProfileDropdown.css";

function ProfileDropdown({ openProfile, handleSetOpenProfile }) {
  function DropdownItem(props) {
    return (
      <a href={props.linkValue} className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        handleSetOpenProfile(!openProfile);
        console.log("JE TESTE");
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="dropdown" ref={menuRef}>
      <DropdownItem leftIcon={<MdSwitchAccount />}>Mon compte</DropdownItem>
      <DropdownItem leftIcon={<GiSoccerKick />}>Section vide 1</DropdownItem>
      <DropdownItem leftIcon={<GiSoccerKick />}>Section vide 2</DropdownItem>

      <hr></hr>
      <DropdownItem leftIcon={<RiLogoutCircleRLine />} linkValue="/logout">
        Se déconnecter
      </DropdownItem>
    </div>
  );
}

export default ProfileDropdown;
