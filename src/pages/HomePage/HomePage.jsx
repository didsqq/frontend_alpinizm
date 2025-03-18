import React from 'react';
import './HomePage.css'; // Импортируем стили

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Контейнер для фоновых изображений */}
      <div className="image-container">
        <img src="../../public/небо.png" alt="Image 1" className="image image1" />
        <img src="../../public/горы.png" alt="Image 2" className="image image2" />
        <img src="../../public/холм.png" alt="Image 3" className="image image3" />
        <img src="../../public/BG Hero.png" alt="Image 4" className="image image4"/>
        {/* <img src="../../public/BG Content.png" alt="Image 5" className="image image5" /> */}
        <div className="gradient-overlay"></div>
      </div>
    </div>
  );
};

export default HomePage;
