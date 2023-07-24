import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function createCloset(closet) {
  const response = await fetch(`http://localhost:8100/api/locations/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(closet),
  });

  if (!response.ok) {
    throw new Error(`Failed to create closet`);
  }

  const createdCloset = await response.json();
  return createdCloset;
}

function ClosetForm ({ fetchLocations, locations }) {
  const [closetName, setClosetName] = useState('');
  const [sectionNumber, setSectionNumber] = useState('');
  const [shelfNumber, setShelfNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
      const closet = {
          closet_name: closetName,
          section_number: sectionNumber,
          shelf_number: shelfNumber,
      };

      try {
          await createCloset(closet);
          await fetchLocations();
          navigate('/hats', { state: { message: 'Closet created' } });
      } catch (error) {
          console.error('Failed to create closet:', error);
      }
  }

  return (
    <div className="container">
      <h2>Create a Closet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Closet Name:</label>
          <input type="text" className="form-control" value={closetName} onChange={(e) => setClosetName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Section Number:</label>
          <input type="number" className="form-control" value={sectionNumber} onChange={(e) => setSectionNumber(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Shelf Number:</label>
          <input type="number" className="form-control" value={shelfNumber} onChange={(e) => setShelfNumber(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Closet</button>
      </form>
    </div>
  );
}

export default ClosetForm;
