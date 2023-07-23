import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function HatsList({ hats }) {
  const location = useLocation();
  const [message, setMessage] = useState(location.state ? location.state.message : null);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="container">
        <h2>Owned Hats</h2>
        <div className="row">
          {hats.map(hat => {
            return (
              <div key={hat.id} className="col-4 mb-4">
                <div className="card">
                  <img src={"https://via.placeholder.com/150"} alt="Placeholder" className="card-img-top" />
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
          <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Add a hat</Link>
        </div>
      </div>
    </>
  );
}

export default HatsList;
