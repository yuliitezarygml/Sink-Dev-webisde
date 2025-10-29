import React from 'react';
import { Photo } from '../types/index';
import '../styles/PhotoCard.css';

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo, onClick }) => {
  return (
    <div className="photo-card" onClick={() => onClick(photo)}>
      <div className="photo-card-image-wrapper">
        <img 
          src={photo.thumbnailUrl} 
          alt={photo.title}
          className="photo-card-image"
        />
        <div className="photo-card-overlay">
          <div className="zoom-icon">🔍</div>
        </div>
      </div>
      <div className="photo-card-info">
        <h3 className="photo-card-title">{photo.title}</h3>
        <p className="photo-card-date">{photo.date}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
