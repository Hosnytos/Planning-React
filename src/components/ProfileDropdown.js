import AuthContext from "../pages/auth/auth";
import { useContext } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { GiSoccerKick } from "react-icons/gi";
import "../styles/ProfileDropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileDropdown() {
  const { setAuth } = useContext(AuthContext);
  const { setLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  function DropdownItem(props) {
    return (
      <Link
        to={props.linkValue}
        className="menu-item"
        onClick={props.handleOnClick}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </Link>
    );
  }

  const logout = () => {
    setAuth({});
    setLogged(false);
    localStorage.setItem("isLogged", false);
    localStorage.setItem("currentUser", "");
    navigate("/login");
    toast.success("À très bientôt ! 🚀", {
      autoClose: 2000,
    });
    // window.location.reload();
  };

  return (
    <div className="dropdown">
      <div className="teamleader-title">Team Leader</div>
      <hr></hr>
      <DropdownItem linkValue="/profile" leftIcon={<MdSwitchAccount />}>
        Mon compte
      </DropdownItem>
      <DropdownItem leftIcon={<GiSoccerKick />}>Section vide 1</DropdownItem>
      <DropdownItem leftIcon={<GiSoccerKick />}>Section vide 2</DropdownItem>

      <hr></hr>
      <DropdownItem
        handleOnClick={logout}
        leftIcon={<RiLogoutCircleRLine />}
        linkValue="/login"
      >
        Se déconnecter
      </DropdownItem>
    </div>
  );
}

export default ProfileDropdown;
