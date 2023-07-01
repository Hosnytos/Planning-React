import "../styles/MainContainer.css";
import logo_se_white from "../assets/logo/logo_se_white_screen.png";
import { SideBarLinks } from "./SideBarLinks";
import ProfileBar from "./ProfileBar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Sidebar({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 920);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation();

  return (
    <>
      <div className={`main ${location.pathname === "*" ? "hide" : ""}`}></div>
      <div className="container">
        {/* SIDEBAR */}
        <nav className="sidebar-container">
          {isMobile ? (
            <div className="sidebar-links">
              {SideBarLinks.map((link, index) => {
                return (
                  <div className="sidebar-only-icon">
                    <li className={link.cName} key={link.path}>
                      <a href={link.path}>
                        <span className="sidebar-icon">{link.icon}</span>
                      </a>
                    </li>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
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
                    <li className={link.cName} key={link.path}>
                      <a href={link.path}>
                        <span className="sidebar-icon">{link.icon}</span>
                        <span>{link.title}</span>
                      </a>
                    </li>
                  );
                })}
              </div>
            </>
          )}
        </nav>

        {/* MAINCONTENT */}
        <div className="main-content">
          <ProfileBar></ProfileBar>

          <main>{children}</main>
        </div>
      </div>
      <div />
    </>
  );
}

export default Sidebar;
