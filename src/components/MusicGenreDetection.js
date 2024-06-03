import React from 'react';
import './MusicGenreDetection.css';
import illustration from '../assets/gambar1.png';

function MusicGenreDetection() {
  return (
    <div className="detection-container">
      <div className="text-section">
        <h2>Kenali Genre Musikmu, sekarang!</h2>
        <p>Tentukan dan temukan selera musikmu</p>
        <div className="upload-section">
          <input type="file" id="file-upload" className="file-upload" />
          <button className="continue-button">Continue</button>
        </div>
        <div className="genre-result">
          <h3>Genre Musikmu</h3>
          <div className="genre-output"></div>
        </div>
      </div>
      <div className="illustration-section">
        <img src={illustration} alt="Illustration" />
      </div>
    </div>
  );
}

export default MusicGenreDetection;
