import '../../styles/LoginPage.css';
import logo_se_white from '../../assets/images/schneider_lio_life_green_rgb.png';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';

export const LoginPage = () => {

  return (
    <div className="login-page-container">
        <div className="container-logo">
            <img className='logo-se-white' src={logo_se_white} alt="Logo_se_white" />
            <hr className='hr-logo'></hr>
        </div>
        <h1 className="login-title">EasyPlanning</h1>
        <form className="login-form">
            <div className="label-email">Email</div>
            <input className="login-input" type="text" placeholder="Veuillez saisir votre adresse mail" />
            <span className="email-icon"><MdIcons.MdPerson /></span>
            <div className="label-password">Mot de passe</div>
            <input className="login-input" type="password" placeholder="Veuillez saisir votre mot de passe" />
            <span className="password-icon"><IoIcons.IoIosLock /></span>
            <button className="login-button" type="submit">Connexion</button>
        </form>
    </div>
  )
}


export default LoginPage;