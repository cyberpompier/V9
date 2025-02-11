import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

function Materiels() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'materials'));
        const items = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            denomination: data.denomination || 'Nom inconnu',
            quantity: data.quantity || 0,
            emplacement: data.emplacement || 'Emplacement inconnu',
            photo: data.photo || 'URL photo par défaut'
          };
        });
        setEquipment(items);
      } catch (error) {
        console.error("Erreur lors de la récupération du matériel :", error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <main className="main-content">
      <h2>Materiels</h2>
      <div className="equipment-list">
        {equipment.map((item) => (
          <div key={item.id} className="equipment-item">
            <img src={item.photo} alt={item.denomination} className="equipment-image" />
            <div className="equipment-details">
              <div className="equipment-name">
                {item.denomination} <FaInfoCircle size={16} />
              </div>
              <p>Quantité: {item.quantity}</p>
              <a href="#">Documentation</a>
              <p>Emplacement: {item.emplacement}</p>
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
