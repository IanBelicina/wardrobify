import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const PEXELS_API_KEY = 'msPS61sdGahbkEM9hUW4HpxOHNAuNFIi0WxVhhIn3PZYc1yB5VC1kIMk';

const fetchImageFromPexels = async (searchTerm) => {
  const response = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
    headers: {
      Authorization: PEXELS_API_KEY,
    },
  });

  if (response.ok) {
    const data = await response.json();
    return data.photos[0].src.large; // Return the URL of the first photo
  } else {
    throw new Error('Failed to fetch image from Pexels');
  }
};


function HatForm ({ locations, getHats }) {
    const [locallocations, setLocalLocations] = useState([]);
    const [fabric, setFabric] = useState('');
    const [style_name, setStyleName] = useState('');
    const [color, setColor] = useState('');
    const [picture_url, setPictureUrl] = useState('Auto');
    const [location, setLocation] = useState('');


    let navigate = useNavigate();

    const fetchData = async () => {
      const url = 'http://localhost:8100/api/locations/';
      const response = await fetch(url);
      if (response.ok) {
        const locations_data = await response.json();
        setLocalLocations(locations_data.locations)
        console.log(locations_data.locations);
      }}

    useEffect(() => {
      fetchData();
    }, []);

    const handleFabricChange = (event) => {
      const value = event.target.value;
      setFabric(value);
    }

    const handleStyleNameChange = (event) => {
      const value = event.target.value;
      setStyleName(value);
    }

    const handleColorChange = (event) => {
      const value = event.target.value;
      setColor(value);
    }



    const handlePictureUrlChange = (event) => {
      const value = event.target.value;
      if (!value) {
        setPictureUrl('Auto');
      } else {
        setPictureUrl(value);
      }
    };

    const handleLocationChange= (event) => {
      const value = event.target.value;
      setLocation(value);
    }




    const handleSubmit = async (event) => {
      event.preventDefault();

      let finalPictureUrl;
      if (picture_url === 'Auto') {
        // If the picture_url field is 'Auto', fetch an image from Pexels
        finalPictureUrl = await fetchImageFromPexels(`${fabric} ${style_name} ${color}`);
      } else {
        // If the user entered a URL, use that
        finalPictureUrl = picture_url;
      }


      const data = {
          fabric: fabric,
          style_name: style_name,
          color: color,
          picture_url: finalPictureUrl,
          location: location,
      };

      const hatUrl = 'http://localhost:8090/api/hats/';
      const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
          'Content-Type': 'application/json',
          },
      };

      try {
          const response = await fetch(hatUrl, fetchConfig);
          if (response.ok) {
            setFabric('');
            setStyleName("");
            setColor("");
            setPictureUrl("Auto");
            setLocation("");

            navigate('/hats', { state: { message: 'Hat Created' } });
            getHats();
          } else {
            const errorResponse = await response.json();
            console.error(errorResponse);
          }
      } catch (error) {
          console.error('Failed to create hat:', error);
      }
    }






    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a new hat</h1>
            <form onSubmit={handleSubmit} id="create-hat-form">
              <div className="form-floating mb-3">
                <input placeholder="Fabric" onChange={handleFabricChange} name="fabric" required type="text" id="fabric" className="form-control" value={fabric}/>
                <label htmlFor="fabric">Fabric</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Style Name" onChange={handleStyleNameChange} name="style" required type="text" id="style_name" value={style_name} className="form-control"/>
                <label htmlFor="style_name">Style Name</label>
              </div>
              <div className="form-floating mb-3">
                <input placeholder="Color" onChange={handleColorChange} name="color" required type="text" id="color" value={color} className="form-control"/>
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
              <input placeholder="Enter Picture URL or 'Auto'" value={picture_url} onChange={handlePictureUrlChange} name="picture_url" required type="text" id="picture_url" className="form-control"/>
                <label htmlFor="picture_url">Picture Url</label>
              </div>
              <div className="mb-3">
                <select required id="location" value={location} onChange={handleLocationChange} name="location" className="form-select">
                  <option value="">Choose a location</option>
                  {locations.map(location => {
                      return (
                      <option key={location.id} value={location.href}>
                          {location.closet_name}
                      </option>
                      );
                  })}
                </select>
              </div>
              <button className="btn btn-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default HatForm;
