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
          const denomination = data.denomination || 'Nom inconnu';
          const displayName = typeof data.displayName === 'string' ? data.displayName : 'Inconnu';
          let grade = 'Inconnu';
          if (typeof data.grade === 'string' || typeof data.grade === 'number') {
            grade = data.grade.toString();
          }
          let timestamp = 'Inconnu';
          if (data.timestamp) {
            try {
              timestamp = data.timestamp.toString();
            } catch (e) {
              timestamp = 'Invalid Date';
            }
          }
          return {
            id: doc.id,
            denomination: denomination,
            lastVerification: data.lastVerification || 'Date inconnue',
            displayName: displayName,
            image: data.image || 'URL image par défaut',
            grade: grade,
            timestamp: timestamp
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
            <img src={truck.image} alt={truck.denomination} className="truck-image" />
            <div className="truck-details">
              <h3>{truck.denomination}</h3>
              <p>Dernière vérification: {truck.lastVerification}</p>
              <p>par {truck.displayName}</p>
              {/* Ajoutez ces lignes pour afficher grade et timestamp si nécessaire */}
              <p>Grade: {truck.grade}</p>
              <p>Timestamp: {truck.timestamp}</p>
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
