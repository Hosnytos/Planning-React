import React, { useState } from "react";
import "../styles/ProfileBar.css";
// import defaultPic from "../assets/profile/undraw_Male_avatar.png";
import clairePic from "../assets/profile/claire.jpg";
import NotifButton from "./NotifButton";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";

function ProfileBar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openChevron, setOpenChevron] = useState(false);

  return (
    <div className="main-profile">
      <NotifButton className="notification-icon" notifValue={3} />

      <div
        className="profil-section"
        onClick={() =>
          setOpenProfile(!openProfile) & setOpenChevron(!openChevron)
        }
      >
        <img src={clairePic} className="profile-pic" alt="profile-pict"></img>

        <span className="user-profile-name">Inès</span>

        <span className="dropdown-icon">
          {openChevron ? <FaChevronUp /> : <FaChevronDown />}
        </span>

        {openProfile && (
          <ProfileDropdown
            openProfile={openProfile}
            handleSetOpenProfile={setOpenProfile}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileBar;
