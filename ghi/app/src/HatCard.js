import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

async function updateHat(hat) {
    if (!hat.id) {
        throw new Error('Cannot update hat: hat id is undefined or null.');
    }

    const response = await fetch(`http://localhost:8090/api/hats/${hat.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hat),
    });

    if (!response.ok) {
        throw new Error(`Failed to update hat with id ${hat.id}/`);
    }

    const updatedHat = await response.json();
    return updatedHat;
}

async function deleteHat(id) {
    const response = await fetch(`http://localhost:8090/api/hats/${id}/`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error(`Failed to delete hat with id ${id}`);
    }

    return id;
}

function HatCard({ getHats, setDeleteMessage, hats, onDelete, picture_url }) {
    const { id } = useParams();
    console.log('id from useParams:', id);
    console.log('hats array:', hats);

    const hat = hats.find(hat => hat.id === Number(id));
    console.log('Found hat:', hat);
    const [isEditing, setIsEditing] = useState(false);
    const [editedHat, setEditedHat] = useState(
        hat
            ? {
                id: hat.id,
                fabric: hat.fabric || "",
                style_name: hat.style_name || "",
                color: hat.color || "",
            }
            : {}
    );

    const navigate = useNavigate();
    useEffect(() => {
        if (hat) {
            setEditedHat({
                id: hat.id,
                fabric: hat.fabric || "",
                style_name: hat.style_name || "",
                color: hat.color || "",
            });
        }
    }, [hat, onDelete]);

    const handleEditChange = (event) => {
        setEditedHat({
            ...editedHat,
            [event.target.name]: event.target.value
        });
    }

    const handleDelete = async () => {
        try {
            await deleteHat(hat.id);
            setDeleteMessage('Hat deleted');
            getHats();  // Fetch hats data after deleting a hat
            navigate('/hats');
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault();

        if (hat.id) {
            try {
                await updateHat(editedHat);
                setIsEditing(false);
                getHats();  // Fetch hats data after updating a hat
                navigate('/hats', { state: { message: 'Hat updated' } });
            } catch (error) {
                console.error("Failed to update hat:", error);
            }
        } else {
            console.error("Cannot update hat: hat id is undefined.");
        }
    };

    if (!hat) {
        return <div>No hat found with the specified ID.</div>;
    }

    return (
        <div className="hat-card">
            {isEditing ? (
                <form onSubmit={handleEditSubmit}>
                    <label>
                        Fabric:
                        <input type="text" name="fabric" value={editedHat.fabric} onChange={handleEditChange} />
                    </label>
                    <label>
                        Style:
                        <input type="text" name="style_name" value={editedHat.style_name} onChange={handleEditChange} />
                    </label>
                    <label>
                        Color:
                        <input type="text" name="color" value={editedHat.color} onChange={handleEditChange} />
                    </label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <>
                    <img src={hat.picture_url} alt={hat.style_name} />
                    <div className="card-body">
                        <h5 className="card-title">{hat.style_name}</h5>
                        <p className="card-text">Fabric: {hat.fabric}</p>
                        <p className="card-text">Color: {hat.color}</p>
                    </div>
                    <div className="card-footer">
                        {hat.location?.closet_name}
                    </div>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
}

export default HatCard;
