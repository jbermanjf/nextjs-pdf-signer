import React from 'react';

const Form = ({
    participantName, participantAddress, date, handleNameChange, handleAddressChange, handleDateChange,
    isMinor, handleIsMinorChange, guardianName, handleGuardianNameChange, guardianRelationship, handleGuardianRelationshipChange,
    email, setEmail, emergencyContact, setEmergencyContact, emergencyContactRelationsip: emergencyContactRelationship, setEmergencyContactRelationship, emergencyContactPhone, setEmergencyContactPhone }) => (
  <div className="form-container">
    <input
      type="text"
      value={participantName}
      onChange={handleNameChange}
      placeholder="Participant's Name"
      className="text-field"
    />
    <input
      type="text"
      value={participantAddress}
      onChange={handleAddressChange}
      placeholder="Participant's Address"
      className="text-field"
    />
    <input
      type="date"
      value={date}
      onChange={handleDateChange}
      placeholder="Date"
      className="participants-name"
    />
    <div className="checkbox-container mt-2">
        <input 
            type="checkbox"
            checked={isMinor}
            onChange={handleIsMinorChange}
            className="checkbox-input mr-2"
        />
        <label>Is a minor?</label>
    </div>
    {
        isMinor && (
            <div className="form-container">
                <input
                    type="text"
                    value={guardianName}
                    onChange={handleGuardianNameChange}
                    placeholder="Guardian's Name"
                    className="text-field"
                />
                <input
                    type="text"
                    value={guardianRelationship}
                    onChange={handleGuardianRelationshipChange}
                    placeholder="Guardian's Relationship"
                    className="text-field"
                />
            </div>
        )
    }
    <div className="form-container">
    <input
      type="text"
      value={emergencyContact}
      onChange={setEmergencyContact}
      placeholder="Emergency Contact"
      className="text-field"
    />
    <input
      type="text"
      value={emergencyContactRelationship}
      onChange={setEmergencyContactRelationship}
      placeholder="Emergency Contact Relationship"
      className="text-field"
    />
    <input
      type="text"
      value={emergencyContactPhone}
      onChange={setEmergencyContactPhone}
      placeholder="Emergency Contact Phone Number"
      className="text-field"
    />
    <input
      type="email"
      value={email}
      onChange={setEmail}
      placeholder="Email"
      className="text-field"
    />
    </div>
  </div>
);

export default Form;
