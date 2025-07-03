import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Navbar from './Navbar';
import {
  FaArrowLeft, FaArrowRight, FaCheckCircle, FaClock, FaThumbsUp,
  FaFacebook, FaInstagram, FaWhatsapp, FaStar, FaBalanceScale,
  FaCogs, FaSmile, FaDollarSign, FaCertificate
} from 'react-icons/fa';

function App() {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReservation, setShowReservation] = useState(false);
  const [serviceSlides, setServiceSlides] = useState([0, 0, 0, 0, 0]);

  const slideImages = [
    `${process.env.PUBLIC_URL}/images/image1.png`,
    `${process.env.PUBLIC_URL}/images/image5.png`,
    `${process.env.PUBLIC_URL}/images/image6.png`
  ];

  const serviceImages = [
    [`${process.env.PUBLIC_URL}/images/image2.png`, `${process.env.PUBLIC_URL}/images/image5.png`, `${process.env.PUBLIC_URL}/images/image6.png`],
    [`${process.env.PUBLIC_URL}/images/image5.png`, `${process.env.PUBLIC_URL}/images/image2.png`, `${process.env.PUBLIC_URL}/images/image3.png`],
    [`${process.env.PUBLIC_URL}/images/image6.png`, `${process.env.PUBLIC_URL}/images/image7.png`, `${process.env.PUBLIC_URL}/images/image1.png`],
    [`${process.env.PUBLIC_URL}/images/image7.png`, `${process.env.PUBLIC_URL}/images/image3.png`, `${process.env.PUBLIC_URL}/images/image4.png`],
    [`${process.env.PUBLIC_URL}/images/image3.png`, `${process.env.PUBLIC_URL}/images/image6.png`, `${process.env.PUBLIC_URL}/images/image5.png`]
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/images')
      .then(response => setImages(response.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServiceSlides((prevSlides) =>
        prevSlides.map((slideIndex, idx) =>
          (slideIndex + 1) % serviceImages[idx].length
        )
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [serviceImages]);

  const prevServiceSlide = (index) => {
    setServiceSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] = (newSlides[index] - 1 + serviceImages[index].length) % serviceImages[index].length;
      return newSlides;
    });
  };

  const nextServiceSlide = (index) => {
    setServiceSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      newSlides[index] = (newSlides[index] + 1) % serviceImages[index].length;
      return newSlides;
    });
  };

  const toggleReservation = () => {
    setShowReservation(!showReservation);
  };

  return (
    <div className="app-background">
      <div className="App">
        <Navbar />

        {/* Accueil */}
        <section id="accueil" className="section-background fade-in">
          <h2 className="welcome-message">Bienvenue sur notre site de décoration événementielle !</h2>
          <section className="slider-container">
            <img src={slideImages[currentSlide]} alt="Slide" className="slider-image" />
            <button className="slider-button prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}><FaArrowLeft /></button>
            <button className="slider-button next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}><FaArrowRight /></button>
            <button className="reservation-button" onClick={toggleReservation}>Réserver Maintenant</button>
          </section>
        </section>

        {/* Modal Réservation */}
        {showReservation && (
          <div className="reservation-modal">
            <div className="reservation-content">
              <h3>Réservation</h3>
              <form>
                <label>Adresse:</label>
                <input type="text" placeholder="Entrez votre adresse" required />

                <label>Téléphone:</label>
                <input type="text" placeholder="Entrez votre numéro de téléphone" required />

                <label>Email:</label>
                <input type="email" placeholder="Entrez votre email" required />

                <label>Localisez votre position:</label>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.946501451227!2d-1.533878885225729!3d12.370849691283263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2ebf260be3be95%3A0x9a10ef403c755b0!2sOuagadougou!5e0!3m2!1sfr!2sbf!4v1615476465589!5m2!1sfr!2sbf"
                  width="100%"
                  height="300"
                  allowFullScreen=""
                  loading="lazy"
                  title="Google Maps"
                ></iframe>

                <button type="submit" className="submit-button">Envoyer la Réservation</button>
              </form>
              <button className="close-button" onClick={toggleReservation}>Fermer</button>
            </div>
          </div>
        )}

        {/* Section Image Milieu + Texte Accueil */}
        <section className="middle-section gradient-background slide-in">
          <div className="middle-text">
            <h1>Accueil</h1>
            <p>
              Bienvenue sur notre site de décoration événementielle. Nous vous accompagnons pour sublimer vos événements : mariages, réceptions, soirées d’entreprise et bien plus encore.
            </p>
          </div>

          <div className="middle-image zoom-in">
            <img src={`${process.env.PUBLIC_URL}/images/image4.png`} alt="Décoration Milieu" />
          </div>
        </section>

        {/* Nos Services */}
        <section id="services" className="services gradient-background">
          <h2>Nos Services</h2>

          <div className="service-row">
            {serviceImages.map((slides, index) => (
              <div className="service-item hover-animate overlap-container" key={index}>
                <img src={slides[serviceSlides[index]]} alt={`Service ${index}`} className="service-slider-image" />
                <button className="service-slider-button prev" onClick={() => prevServiceSlide(index)}><FaArrowLeft /></button>
                <button className="service-slider-button next" onClick={() => nextServiceSlide(index)}><FaArrowRight /></button>
                <h3 className="service-title">{['Mariage', 'Salle', 'Table', 'Ambiance Spéciale', 'Réception'][index]}</h3>
              </div>
            ))}
          </div>

          <div className="service-row">
            <div className="service-item hover-animate text-only">
              <h3>Texte personnalisé</h3>
              <p>
                Nous sommes spécialisés dans la conception de décors sur-mesure qui transforment vos événements en expériences inoubliables.
              </p>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section id="galerie" className="gallery section-background">
          <div className="gallery-grid">
            {images.map((image, index) => (
              <img key={index} src={image.url} alt={image.name} className="gallery-animate" />
            ))}
          </div>
        </section>

        {/* Section Avis et Engagements fusionnée */}
        <section className="review-section gradient-background">
          <h2>Avis vérifiés par Feefo et Nos Engagements</h2>
          <p className="review-summary">15729 avis, 7371 avec commentaires</p>
          <div className="review-rating">
            <FaStar className="review-star" />
            <FaStar className="review-star" />
            <FaStar className="review-star" />
            <FaStar className="review-star" />
            <FaStar className="review-star-half" />
            <span className="review-score">4.6 / 5</span>
          </div>
          <div className="review-categories">
            <div className="review-category">
              <FaBalanceScale className="review-icon" />
              <p>Rapport qualité/prix</p>
            </div>
            <div className="review-category">
              <FaCogs className="review-icon" />
              <p>Conception / Apparence</p>
            </div>
            <div className="review-category">
              <FaSmile className="review-icon" />
              <p>Facilité d'emploi</p>
            </div>
            <div className="review-category">
              <FaCertificate className="review-icon" />
              <p>Qualité d'impression</p>
            </div>
            <div className="review-category">
              <FaDollarSign className="review-icon" />
              <p>Prix</p>
            </div>
          </div>
          <div className="engagements-row">
            <div className="engagement-item">
              <FaCheckCircle className="engagement-icon" />
              <h3>Votre entière satisfaction</h3>
              <p>Nos solutions et nos valeurs au service de votre évènement, telle est notre philosophie.</p>
            </div>
            <div className="engagement-item">
              <FaClock className="engagement-icon" />
              <h3>Dans les temps</h3>
              <p>Nous sommes reconnus pour une gestion rigoureuse du temps et sur la mise en place.</p>
            </div>
            <div className="engagement-item">
              <FaThumbsUp className="engagement-icon" />
              <h3>Une équipe impliquée et appliquée</h3>
              <p>Nous vous accompagnons dans vos projets et vous suggérons des idées innovantes.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <section id="contact" className="footer-section gradient-background">
          <footer>
            <h3>Prêt à sublimer votre événement ?</h3>
            <p>Contactez-nous dès aujourd’hui !</p>
            <p>📞 +226 70 00 00 00 | +226 65 00 00 00 | +226 76 00 00 00</p>

            <div className="footer-socials">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://wa.me/22670000000" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default App;
