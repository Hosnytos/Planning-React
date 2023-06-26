import { React, useRef } from "react";
import "../styles/SupportPage.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SupportPage() {
  const supportForm = useRef();

  const sendSupportEmail = (e) => {
    e.preventDefault();
     emailjs.sendForm('service_xgrvdsp', 'template_v1joqud', supportForm.current, 'y9YE02ncNeaAKZN9z')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          }); 
    toast.success("Votre message a été envoyé ! 🚀", {
      autoClose: 3000,
    });
    e.target.reset();
  };

  return (
    <div>
      <form
        ref={supportForm}
        className="support-form"
        onSubmit={sendSupportEmail}
      >
        <h1>
          Contactez-<span>nous</span>
        </h1>
        <div className="support-main-container">
          <div className="support-name-email-container">
            <input
              type="text"
              className="support-input"
              placeholder="Votre nom"
              name="user_name"
            />
            <input
              type="email"
              className="support-input"
              placeholder="Votre adresse email"
              name="user_email"
            />
          </div>
          <div className="support-subject-container">
            <input
              type="text"
              className="support-input"
              placeholder="Sujet du message"
              name="support_subject"
            />
          </div>
          <div className="support-message-container">
            <textarea
              className="support-textarea"
              placeholder="Votre message"
              rows="10"
              cols="30"
              name="support_message"
            ></textarea>
          </div>
          <div className="support-submit-container">
            <button className="support-button">Envoyer</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SupportPage;
