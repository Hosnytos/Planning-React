import React, { useEffect, useRef, useState } from "react";
import "../styles/ProfileBar.css";
// import defaultPic from "../assets/profile/undraw_Male_avatar.png";
import clairePic from "../assets/profile/unisex_profile_picture.png";
import NotifButton from "./NotifButton";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";

function ProfileBar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openChevron, setOpenChevron] = useState(false);
  const currentUser = localStorage.getItem("currentUser");

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenProfile(false);
        setOpenChevron(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="main-profile">
      <NotifButton className="notification-icon" notifValue={3} />

      <div
        className="profil-section"
        ref={menuRef}
        onClick={() =>
          setOpenProfile(!openProfile) & setOpenChevron(!openChevron)
        }
      >
        <img src={clairePic} className="profile-pic" alt="profile-pict"></img>

        <span className="user-profile-name">{currentUser}</span>

        <span className="dropdown-icon">
          {openChevron ? <FaChevronUp /> : <FaChevronDown />}
        </span>

        {openProfile && <ProfileDropdown />}
      </div>
    </div>
  );
}

export default ProfileBar;
