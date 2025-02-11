import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { FaCheck, FaTimes, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import './Materiels.css';
import { onAuthStateChanged } from "firebase/auth";

function Verification() {
  const { truckId } = useParams();
  const [equipment, setEquipment] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const q = query(collection(db, 'materials'), where('affection', '==', truckId));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), status: 'pending', comment: '' }));
        setEquipment(items);
      } catch (error) {
        console.error("Erreur lors de la récupération du matériel :", error);
      }
    };

    fetchEquipment();
  }, [truckId]);

  const handleValidClick = async (itemId) => {
    try {
      const itemDocRef = doc(db, 'materials', itemId);
      await updateDoc(itemDocRef, { status: 'ok', comment: '', timestamp: null, userPhoto: null, grade: null, name: null });

      setEquipment(prevEquipment =>
        prevEquipment.map(item =>
          item.id === itemId ? { ...item, status: 'ok', comment: '', timestamp: null, userPhoto: null, grade: null, name: null } : item
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  const handleInvalidClick = (itemId) => {
    setSelectedItemId(itemId);
    setComment('');
    setShowCommentPopup(true);
    setSelectedStatus('invalid');
  };

  const handleAlertClick = (itemId) => {
    setSelectedItemId(itemId);
    setComment('');
    setShowCommentPopup(true);
    setSelectedStatus('alert');
  };

  const handleCommentSubmit = async () => {
    try {
      if (!user) {
        console.error("No user is currently logged in.");
        return;
      }

      const itemDocRef = doc(db, 'materials', selectedItemId);
      const now = new Date();

      // Fetch user document from 'users' collection
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();

        await updateDoc(itemDocRef, {
          status: selectedStatus,
          comment: comment,
          timestamp: now.toISOString(),
          userPhoto: userDoc.userPhoto || null,
          grade: userDoc.Grade || null,
          name: userDoc.name || null
        });

        setEquipment(prevEquipment =>
          prevEquipment.map(item =>
            item.id === selectedItemId ? {
              ...item,
              status: selectedStatus,
              comment: comment,
              timestamp: now.toISOString(),
              userPhoto: userDoc.userPhoto || null,
              grade: userDoc.Grade || null,
              name: userDoc.name || null
            } : item
          )
        );
        setShowCommentPopup(false);
        setSelectedItemId(null);
        setComment('');
        setSelectedStatus(null);
      } else {
        console.error("Could not find user data in 'users' collection.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire :", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ok':
        return '#fff';
      case 'invalid':
        return '#dc3545';
      case 'alert':
        return '#ffc107';
      default:
        return '#fff';
    }
  };

  return (
    <main className="main-content">
      <div className="equipment-list">
        {equipment.map((item, index) => (
          <div
            key={item.id}
            className="equipment-item"
            style={{ backgroundColor: getStatusColor(item.status) }}
          >
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
              {item.comment && <p>Comment: {item.comment}</p>}
            </div>
            <div className="equipment-actions">
              <div className="action-button valid" onClick={() => handleValidClick(item.id)}>
                <FaCheck size={20} />
              </div>
              <div className="action-button invalid" onClick={() => handleInvalidClick(item.id)}>
                <FaTimes size={20} />
              </div>
              <div className="action-button alert" onClick={() => handleAlertClick(item.id)}>
                <FaExclamationTriangle size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCommentPopup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCommentPopup(false)}>&times;</span>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter comment"
            />
            <button onClick={() => handleCommentSubmit()}>Submit Comment</button>
          </div>
        </div>
      )}
      <button className="validate-button">
        Valider ma vérification
      </button>
    </main>
  );
}

export default Verification;
