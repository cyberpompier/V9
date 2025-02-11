import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './Materiels.css';

function Verification() {
  const { truckId } = useParams();
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const q = query(collection(db, 'materials'), where('affection', '==', truckId));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => doc.data());
        setEquipment(items);
      } catch (error) {
        console.error("Erreur lors de la récupération du matériel :", error);
      }
    };

    fetchEquipment();
  }, [truckId]);

  return (
    <main className="main-content">
      <div className="equipment-list">
        {equipment.map((item, index) => (
          <div key={index} className="equipment-item">
            <img
              src={item.photo}
              alt={item.denomination}
              className="equipment-image"
              style={{ cursor: 'pointer' }}
            />
            <div className="equipment-details">
              <div className="equipment-name">
                {item.denomination} <FaInfoCircle size={16} />
              </div>
              <p>Quantité: {item.quantity}</p>
              <a href="#">Documentation</a>
              <p>Affectation: {item.affection}</p>
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
      <button className="validate-button">
        Valider ma vérification
      </button>
    </main>
  );
}

export default Verification;
