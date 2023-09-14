import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  renderHook,
} from "@testing-library/react";
import SupportPage from "../components/SupportPage";
import { toast } from "react-toastify";

// mock pour le toatufy
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("Support Page tests", () => {
  it("should render Support Page when we get in", () => {
    render(<SupportPage />);

    // Utiliser getByRole pour sélectionner le titre
    const titleElement = screen.getByRole("heading", { level: 1 });

    // Extraire le texte du titre (y compris le contenu du span)
    const titleText = titleElement.textContent;

    // Vérifier que le titre contient le texte attendu
    expect(titleText).toContain("Contactez-nous");

    // Vérifier que les champs de formulaire sont présents dans le DOM (comme précédemment)
    const nomInput = screen.getByPlaceholderText("Votre nom");
    const emailInput = screen.getByPlaceholderText("Votre adresse email");
    const sujetInput = screen.getByPlaceholderText("Sujet du message");
    const messageTextarea = screen.getByPlaceholderText("Votre message");
    const envoyerButton = screen.getByRole("button", { name: "Envoyer" });

    expect(nomInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(sujetInput).toBeInTheDocument();
    expect(messageTextarea).toBeInTheDocument();
    expect(envoyerButton).toBeInTheDocument();
  });

  /*it("Should retrieve an error message because of empty fields validation", () => {
    render(<SupportPage />);

    // Sélectionner le bouton "Envoyer"
    const envoyerButton = screen.getByRole("button", { name: "Envoyer" });

    // Vérifier que le message d'erreur requis s'affiche pour chaque champ requis
    const nomInput = screen.getByPlaceholderText("Votre nom");
    const emailInput = screen.getByPlaceholderText("Votre adresse email");
    const sujetInput = screen.getByPlaceholderText("Sujet du message");
    const messageTextarea = screen.getByPlaceholderText("Votre message");

    // Saisir du texte dans le champ "Nom"
    fireEvent.change(nomInput, { target: { value: "John Doe" } });

    // Simuler un clic sur le bouton "Envoyer" pour soumettre le formulaire
    fireEvent.click(envoyerButton);

    // Vérifier que les messages d'erreur requis s'affichent pour chaque champ requis
    expect(nomInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("required");
    expect(sujetInput).toHaveAttribute("required");
    expect(messageTextarea).toHaveAttribute("required");
  });

  it("Should fill all fields and verify that the submit return a success message", async () => {
    render(<SupportPage />);

    // Sélectionner les champs du formulaire et les remplir
    const nomInput = screen.getByPlaceholderText("Votre nom");
    const emailInput = screen.getByPlaceholderText("Votre adresse email");
    const sujetInput = screen.getByPlaceholderText("Sujet du message");
    const messageTextarea = screen.getByPlaceholderText("Votre message");

    fireEvent.change(nomInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@doe.com" } });
    fireEvent.change(sujetInput, { target: { value: "test unitaire" } });
    fireEvent.change(messageTextarea, {
      target: { value: "je suis entrain de tester la page de support" },
    });

    // Sélectionner le bouton "Envoyer"
    const envoyerButton = screen.getByRole("button", { name: "Envoyer" });

    // Simuler un clic sur le bouton "Envoyer" pour soumettre le formulaire
    fireEvent.click(envoyerButton);

    // Attendre que le message de succès apparaisse (utilise waitFor pour les actions asynchrones)
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });*/
});
