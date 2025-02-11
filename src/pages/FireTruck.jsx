import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function FireTruck() {
  const [fireTrucks, setFireTrucks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFireTrucks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'vehicles'));
        const trucks = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            denomination: data.denomination || 'Nom inconnu',
            photo: data.photo || 'URL photo par défaut',
            lien: data.lien || null
          };
        });
        setFireTrucks(trucks);
      } catch (error) {
        console.error("Erreur lors de la récupération des camions de pompiers :", error);
      }
    };

    fetchFireTrucks();
  }, []);

  const handleVerifyClick = (denomination) => {
    navigate(`/verification/${denomination}`);
  };

  return (
    <main className="main-content">
      <div className="truck-list">
        {fireTrucks.map((truck) => (
          <div key={truck.id} className="truck-item">
            <img src={truck.photo} alt={truck.denomination} className="truck-image" />
            <div className="truck-details">
              <h3>{truck.denomination}</h3>
            </div>
            <div className="truck-actions">
              <button className="verified-button">Vérifié</button>
              {truck.lien && (
                <a href={truck.lien} target="_blank" rel="noopener noreferrer">
                  <FaFileAlt size={20} />
                </a>
              )}
              <button className="verify-button" onClick={() => handleVerifyClick(truck.denomination)}>Vérifier</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default FireTruck;
