import "../styles/Sidebar.css";
import logo_se_white from "../assets/images/logo_se_white_screen.png";
import { SideBarLinks } from "./SideBarLinks";
import ProfileBar from "./ProfileBar";

function Sidebar({ children }) {
  return (
    <>
      <div className="container">
        <nav className="sidebar-container">
          <div className="container-logo">
            <img
              className="logo-se-white"
              src={logo_se_white}
              alt="Logo_se_white"
            />
            <hr className="hr-logo"></hr>
          </div>
          <div className="sidebar-links">
            {SideBarLinks.map((link, index) => {
              return (
                <li className={link.cName} key={index}>
                  <a href={link.path}>
                    <span className="sidebar-icon">{link.icon}</span>
                    <span>{link.title}</span>
                  </a>
                </li>
              );
            })}
          </div>
        </nav>
        <div className="hr-main">
          <ProfileBar></ProfileBar>
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
