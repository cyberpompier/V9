import React from 'react';
import { FaFileAlt } from 'react-icons/fa';

const fireTrucks = [
  {
    id: 1,
    name: 'VSAV1',
    lastVerification: '05/02/2025',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Vsav_pompiers_france.JPG/800px-Vsav_pompiers_france.JPG',
  },
  {
    id: 2,
    name: 'FPT',
    lastVerification: '03/02/2025',
    image: 'https://rescue18.com/wp-content/uploads/2022/03/fpt-sdis-35.jpg',
  },
];

function FireTruck() {
  return (
    <main className="main-content">
      <h2>Fire Trucks</h2>
      <div className="truck-list">
        {fireTrucks.map((truck) => (
          <div key={truck.id} className="truck-item">
            <img src={truck.image} alt={truck.name} className="truck-image" />
            <div className="truck-details">
              <h3>{truck.name}</h3>
              <p>Dernière vérification: {truck.lastVerification}</p>
              <p>par</p>
            </div>
            <div className="truck-actions">
              <button className="verified-button">Vérifié</button>
              <FaFileAlt size={20} />
              <button className="verify-button">Vérifier</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FireTruck;
