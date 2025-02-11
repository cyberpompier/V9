import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaFileAlt } from 'react-icons/fa';

function FireTruck() {
  const [fireTrucks, setFireTrucks] = useState([]);

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
          };
        });
        setFireTrucks(trucks);
      } catch (error) {
        console.error("Erreur lors de la récupération des camions de pompiers :", error);
      }
    };

    fetchFireTrucks();
  }, []);

  return (
    <main className="main-content">
      <h2>Fire Trucks</h2>
      <div className="truck-list">
        {fireTrucks.map((truck) => (
          <div key={truck.id} className="truck-item">
            <img src={truck.photo} alt={truck.denomination} className="truck-image" />
            <div className="truck-details">
              <h3>{truck.denomination}</h3>
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
