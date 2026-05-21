import React from 'react';

function About() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">À Propos de Nous</h1>
      </div>

      <div className="card">
        <h2 className="info-title">Bienvenue chez Arabica Love  Café</h2>
        <p className="info-text">
          Arabica & Love Café est un lieu chaleureux où l'amour du café et des douceurs se rencontre.
          Nous sommes passionnés par l'art du café et nous nous efforçons de créer une expérience unique
          pour chacun de nos clients.
        </p>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 className="info-title">📍 Notre Adresse</h3>
          <p className="info-text">
            123 Rue de Bonheur<br />
            30000 Fès, Maroc
          </p>
        </div>

        <div className="card">
          <h3 className="info-title">📞 Contact</h3>
          <p className="info-text">
            Téléphone: +212 535 45 67 89<br />
            Email: contact@arabicalove
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="info-title">🕒 Horaires d'Ouverture</h3>
        <p className="info-text">
          Lundi - Vendredi: 7h00 - 23h00<br />
          Samedi: 8h00 - 00h00<br />
          Dimanche: 9h00 - 23h00
        </p>
      </div>

      <div className="card">
        <h3 className="info-title">❤️ Notre Histoire</h3>
        <p className="info-text">
          Fondé en 2020, Arabica & Love Café est né de la passion pour le café de qualité et
          l'accueil chaleureux. Notre équipe s'engage à vous offrir les meilleurs cafés, crêpes
          et gâteaux dans une ambiance conviviale.
        </p>
      </div>
    </div>
  );
}

export default About;
