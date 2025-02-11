import React from 'react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const equipment = [
  {
    id: 1,
    name: 'Seau pompe',
    quantity: 1,
    location: 'coffre AV gauche',
    image: 'https://www.mondialextincteur.fr/Seau-pompe/Seau-pompe-15-litres-038485C5C.jpg',
  },
  {
    id: 2,
    name: 'MULTI paramétrique',
    quantity: 1,
    location: 'Plateau',
    image: 'https://www.schiller.ch/schiller_images_pdfs/devices/monitoring_defi_cpr/defigard-touch-7/defigard-touch-7-emergency-monitor-defibrillator.jpg',
  },
  {
    id: 3,
    name: 'Aspirateur',
    quantity: 1,
    location: 'Plateau',
    image: 'https://laerdal.com/cdn-cgi/image/width=1200,height=675,format=avif,fit=pad,quality=65/cdn-4af27a/globalassets/images--blocks/products/therapy-products/lsu/ld8_3863.jpg',
  },
];

function Materiels() {
  return (
    <main className="main-content">
      <h2>Materiels</h2>
      <div className="equipment-list">
        {equipment.map((item) => (
          <div key={item.id} className="equipment-item">
            <img src={item.image} alt={item.name} className="equipment-image" />
            <div className="equipment-details">
              <div className="equipment-name">
                {item.name} <FaInfoCircle size={16} />
              </div>
              <p>Quantité: {item.quantity}</p>
              <a href="#">Documentation</a>
              <p>Emplacement: {item.location}</p>
            </div>
            <div className="equipment-actions">
              <div className="action-button valid">
                <FaCheck size={20} />
              </div>
              <div className="action-button invalid">
                <FaTimes size={20} />
              </div>
              <div className="action-button alert">
                <FaExclamationTriangle size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Materiels;
