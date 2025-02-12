import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Settings.css';

function Settings() {
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);

  const [newVehicleDenomination, setNewVehicleDenomination] = useState('');
  const [newVehiclePhoto, setNewVehiclePhoto] = useState('');
  const [newVehicleLien, setNewVehicleLien] = useState('');

  const [newMaterialDenomination, setNewMaterialDenomination] = useState('');
  const [newMaterialQuantity, setNewMaterialQuantity] = useState('');
  const [newMaterialAffection, setNewMaterialAffection] = useState('');
  const [newMaterialEmplacement, setNewMaterialEmplacement] = useState('');
  const [newMaterialPhoto, setNewMaterialPhoto] = useState('');
  const [newMaterialDocumentation, setNewMaterialDocumentation] = useState('');
  const [newMaterialLien, setNewMaterialLien] = useState('');

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'vehicles'), {
        denomination: newVehicleDenomination,
        photo: newVehiclePhoto,
        lien: newVehicleLien
      });
      setNewVehicleDenomination('');
      setNewVehiclePhoto('');
      setNewVehicleLien('');
      setShowVehicleForm(false);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'materials'), {
        denomination: newMaterialDenomination,
        quantity: newMaterialQuantity,
        affection: newMaterialAffection,
        emplacement: newMaterialEmplacement,
        photo: newMaterialPhoto,
        documentation: newMaterialDocumentation,
        lien: newMaterialLien
      });
      setNewMaterialDenomination('');
      setNewMaterialQuantity('');
      setNewMaterialAffection('');
      setNewMaterialEmplacement('');
      setNewMaterialPhoto('');
      setNewMaterialDocumentation('');
      setNewMaterialLien('');
      setShowMaterialForm(false);
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  return (
    <main className="main-content">
      <button onClick={() => setShowVehicleForm(true)} className="settings-button">Ajouter un véhicule</button>
      <button onClick={() => setShowMaterialForm(true)} className="settings-button">Ajouter un matériel</button>

      {showVehicleForm && (
        <div className="modal">
          <div className="modal-content settings-modal">
            <span className="close" onClick={() => setShowVehicleForm(false)}>&times;</span>
            <h3>Ajouter un véhicule</h3>
            <form onSubmit={handleAddVehicle} className="settings-form">
              <input
                type="text"
                placeholder="Denomination"
                value={newVehicleDenomination}
                onChange={(e) => setNewVehicleDenomination(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={newVehiclePhoto}
                onChange={(e) => setNewVehiclePhoto(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Lien"
                value={newVehicleLien}
                onChange={(e) => setNewVehicleLien(e.target.value)}
                className="settings-input"
              />
              <div className="settings-buttons">
                <button type="submit" className="settings-submit-button">Ajouter</button>
                <button type="button" className="settings-cancel-button" onClick={() => setShowVehicleForm(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMaterialForm && (
        <div className="modal">
          <div className="modal-content settings-modal">
            <span className="close" onClick={() => setShowMaterialForm(false)}>&times;</span>
            <h3>Ajouter un matériel</h3>
            <form onSubmit={handleAddMaterial} className="settings-form">
              <input
                type="text"
                placeholder="Denomination"
                value={newMaterialDenomination}
                onChange={(e) => setNewMaterialDenomination(e.target.value)}
                className="settings-input"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newMaterialQuantity}
                onChange={(e) => setNewMaterialQuantity(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Affection"
                value={newMaterialAffection}
                onChange={(e) => setNewMaterialAffection(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Emplacement"
                value={newMaterialEmplacement}
                onChange={(e) => setNewMaterialEmplacement(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={newMaterialPhoto}
                onChange={(e) => setNewMaterialPhoto(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Documentation URL (optional)"
                value={newMaterialDocumentation}
                onChange={(e) => setNewMaterialDocumentation(e.target.value)}
                className="settings-input"
              />
              <input
                type="text"
                placeholder="Lien (optional)"
                value={newMaterialLien}
                onChange={(e) => setNewMaterialLien(e.target.value)}
                className="settings-input"
              />
              <div className="settings-buttons">
                <button type="submit" className="settings-submit-button">Ajouter</button>
                <button type="button" className="settings-cancel-button" onClick={() => setShowMaterialForm(false)}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Settings;
