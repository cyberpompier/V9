import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './FireTruck.css';

function FireTruck() {
  const [fireTrucks, setFireTrucks] = useState([]);
  const navigate = useNavigate();
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [showCommentsPopup, setShowCommentsPopup] = useState(false);
  const [truckComments, setTruckComments] = useState([]);
  const [trucksWithComments, setTrucksWithComments] = useState([]);

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

    const fetchTrucksWithComments = async () => {
      try {
        const q = query(collection(db, 'materials'), where('comment', '!=', null));
        const querySnapshot = await getDocs(q);
        const trucks = new Set(querySnapshot.docs.map(doc => doc.data().affection));
        setTrucksWithComments(Array.from(trucks));
      } catch (error) {
        console.error("Erreur lors de la récupération des camions avec commentaires :", error);
      }
    };

    fetchFireTrucks();
    fetchTrucksWithComments();
  }, []);

  const handleVerifyClick = (denomination) => {
    navigate(`/verification/${denomination}`);
  };

  const handleInfoClick = async (truck) => {
    setSelectedTruck(truck);
    setShowCommentsPopup(true);

    try {
      const q = query(
        collection(db, 'materials'),
        where('affection', '==', truck.denomination)
      );
      const querySnapshot = await getDocs(q);
      const comments = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setTruckComments(comments);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires du camion :", error);
    }
  };

  const closeCommentsPopup = () => {
    setShowCommentsPopup(false);
  };

  const hasComments = (truck) => {
    return trucksWithComments.includes(truck.denomination);
  };

  return (
    <main className="main-content">
      <div className="truck-list">
        {fireTrucks.map((truck) => (
          <div key={truck.id} className="truck-item">
            <img src={truck.photo} alt={truck.denomination} className="truck-image" />
            <div className="truck-details">
              <h3>
                {truck.denomination}
                {hasComments(truck) && (
                  <span className="info-icon" onClick={() => handleInfoClick(truck)}>
                    <FaInfoCircle className="blinking-icon" />
                  </span>
                )}
              </h3>
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

      {showCommentsPopup && selectedTruck && (
        <div className="modal">
          <div className="modal-content comment-modal">
            <span className="close" onClick={closeCommentsPopup}>&times;</span>
            <h3>Comments for {selectedTruck.denomination}</h3>
            {truckComments.length > 0 ? (
              truckComments.map((comment, index) => {
                if (comment.comment && comment.affection === selectedTruck.denomination) {
                  return (
                    <div key={index} className="comment-item">
                      {comment.denomination && <h4>{comment.denomination}</h4>}
                      {comment.comment && <p>{comment.comment}</p>}
                      {comment.timestamp && comment.grade && comment.name && (
                        <p className="comment-info">
                          {new Date(comment.timestamp).toLocaleString()} - {comment.grade} - {comment.name}
                        </p>
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <p>No comments found for this truck.</p>
            )}
            <button className="close-button" onClick={closeCommentsPopup}>Fermer</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default FireTruck;
