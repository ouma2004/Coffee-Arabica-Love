import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* HERO SECTION - Comme Image 3 */}
      <section className="hero">
        <h1 className="hero-title">
           Café Arabica Love <br></br>
          All You Need is <span className="love-text">Love</span> and Coffee
        </h1>
        <p className="hero-tagline">
          Découvrez notre café artisanal, nos délicieuses pâtisseries et nos crêpes
          gourmandes dans une ambiance chaleureuse et romantique.
        </p>
         <Link to="/menu" >
                    <button className="hero-cta">Découvrir Notre Menu</button>
          </Link>
      </section>

      {/* SECTION POURQUOI NOUS CHOISIR - Comme Image 2 */}
      <section className="why-choose-section">
        <h2 className="section-title">
          Pourquoi Nous <span className="highlight">Choisir</span> ?
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">☕</span>
            <h3 className="feature-title">Café Artisanal</h3>
            <p className="feature-description">
              Grains sélectionnés et torréfiés avec passion pour un goût unique.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🍰</span>
            <h3 className="feature-title">Pâtisseries Maison</h3>
            <p className="feature-description">
              Gâteaux et desserts préparés chaque jour avec des ingrédients frais.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💖</span>
            <h3 className="feature-title">Ambiance Chaleureuse</h3>
            <p className="feature-description">
              Un espace cosy et romantique pour vos moments de détente.
            </p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <img 
          src="/coffee-shop-interior.jpg" 
          alt="Notre café" 
          className="story-image" 
        />
        <div className="story-content">
          <h2 className="story-title">Notre Histoire</h2>
          <p className="story-text">
            Bienvenue chez Arabica ♥ Love, un lieu où la passion du café
            rencontre l'art de la pâtisserie. Depuis notre ouverture, nous nous
            efforçons de créer un espace où chaque visiteur se sent chez soi.
          </p>
          <p className="story-text">
            Nos baristas experts préparent chaque tasse avec amour, utilisant
            des grains soigneusement sélectionnés et torréfiés localement.
            Nos pâtissiers créent chaque jour des délices qui ravissent les
            papilles.
          </p>
           <Link to="/menu" className="story-cta">
            Voir le Menu
          </Link>
        </div>
      </section>

      {/* SECTION CTA COMMANDER */}
      <section className="cta-section">
        <h2 className="cta-title">Prêt à Commander ?</h2>
        <p className="cta-subtitle">
          Découvrez notre menu complet et passez votre commande en ligne.
        </p>
        <Link to="/menu">
          <button className="cta-button">Commander Maintenant</button>
        </Link>
        
      </section>
    </div>
  );
}

export default Home;