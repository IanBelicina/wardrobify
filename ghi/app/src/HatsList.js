import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function HatsList({ deleteMessage, setDeleteMessage, hats }) {
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : null);

  const navigate = useNavigate();

  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
      }, 3000);
      console.log(typeof setDeleteMessage);
      return () => {
        clearTimeout(timer);
        setDeleteMessage(null);
      };
    }
  }, [deleteMessage, setDeleteMessage]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        navigate('.', { state: null });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  return (
    <>
      {message && <div className="alert alert-success">{message}</div>}
      {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
      <div className="container">
        <h2>Owned Hats</h2>
        <div className="row">
          {hats.map(hat => {
            return (
              <div key={hat.id} className="col-4 mb-4">
                <div className="card">
                <img src={hat.picture_url} alt={hat.style_name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{hat.style_name}</h5>
                    <p className="card-text">Fabric: {hat.fabric}</p>
                    <p className="card-text">Color: {hat.color}</p>
                  </div>
                  <div className="card-footer">
                    {hat.location.closet_name}
                  </div>
                  <div className="card-footer">
                    <Link to={`/hats/${hat.id}`}>Edit/Delete Hat</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
          <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Hat</Link>
          <Link to="/closet/new" className="btn btn-primary btn-lg px-4 gap-3">Add a Closet</Link>
        </div>
      </div>
    </>
  );
}

export default HatsList;
