import AuthContext from "./auth";
import { useRef, useState, useEffect, useContext } from "react";
import "../../styles/LoginPage.css";
import logo_se_white from "../../assets/logo/schneider_lio_life_green_rgb.png";
import login_intro from "../../assets/logo/planning_intro.svg";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { InputAdornment, IconButton, Input } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { auth, setAuth, setLogged } = useContext(AuthContext);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userRef = useRef();
  //const errRef = useRef();

  const [user, setUser] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd]);

  const handleEmailChange = (event) => {
    const inputValue = event.target.value;
    setUser(inputValue);

    // Validation de l'email avec le regex
    setIsValidEmail(emailRegex.test(inputValue));
  };

  const handlePasswordChange = (event) => {
    const inputValue = event.target.value;
    setPwd(inputValue);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Fonction pour vérifier les informations d'identification
  const checkCredentials = (user, pwd) => {
    const validEmail = "jordynaiya@gmail.com";
    const validPassword = "ney11";

    return user === validEmail && pwd === validPassword;
  };

  const isValid = checkCredentials(user, pwd);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      setLogged(true);
      setAuth({ user, pwd });

      localStorage.setItem("currentUser", user);
      localStorage.setItem("isLogged", true);

      console.log(localStorage.getItem("isLogged"));

      console.log(auth);

      navigate("/home");
      setUser("");
      setPwd("");

      toast.success("Connexion réussie ! 🚀", {
        autoClose: 2000,
      });
      /* toast.success("Bienvenue " + user + " ! 🚀", {
        autoClose: 3000,
      }); */
    } else if (!isValidEmail) {
      toast.warning("Veuillez entrer une adresse email correcte", {
        autoClose: 2000,
      });
    } else {
      console.log("ERROR");
      toast.error("L'e-mail ou le mot de passe est incorrect !", {
        autoClose: 2000,
      });
    }
  };

  // useEffect(() => {
  //   checkLogin();
  // });

  // const checkLogin = () => {
  //   if (localStorage.getItem("logged") === true) {
  //     setLogged(true);
  //     navigate("/", { replace: true });
  //     console.log("You are already connected");
  //   }
  // };

  return (
    <section className="login-body">
      <div className="login-page-container">
        <div className="easyplanning-logo">
          <h3 className="easyplanning-logo-text">
            <span class="text-black">easy</span>
            <span class="text-green">Planning</span>
          </h3>
        </div>
        <h1 className="login-title">Bonjour!</h1>
        <p>
          Pour vous connecter à votre compte en tant que Team Leader, veuillez
          fournir votre adresse e-mail et votre mot de passe associé.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="email-section">
            <span className="email-icon">
              <MdIcons.MdPerson />
            </span>
            <label htmlFor="email" className="label-email">
              Email
            </label>
            <Input
              className="login-input"
              type="text"
              placeholder="Veuillez saisir votre adresse mail"
              ref={userRef}
              onChange={handleEmailChange}
              value={user}
              required
            />
          </div>

          <div className="password-section">
            <span className="password-icon">
              <IoIcons.IoIosLock />
            </span>
            <label htmlFor="password" className="label-password">
              Mot de passe
            </label>
            <Input
              className="login-input"
              type={showPassword ? "text" : "password"}
              placeholder="Veuillez saisir votre mot de passe"
              onChange={handlePasswordChange}
              value={pwd}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? (
                      <IoIcons.IoIosEyeOff />
                    ) : (
                      <IoIcons.IoIosEye />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          <button className="login-button" type="submit">
            Connexion
          </button>
        </form>

        <footer className="footer-rights">
          All rights reserved Schneider Electric 2023 ©
        </footer>
      </div>

      <div className="login-right-section">
        <div className="container-logo">
          <img
            className="logo-se-white"
            src={logo_se_white}
            alt="Logo_se_white"
          />
          <hr className="hr-logo"></hr>
        </div>

        <div className="container-login-intro">
          <img
            className="login-logo-intro"
            src={login_intro}
            alt="Login_logo_intro"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
