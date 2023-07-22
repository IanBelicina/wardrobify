import React, {useEffect, useState} from 'react';

function HatForm () {
    const [locations, setLocations] = useState([]);
    const [fabric, setFabric] = useState('');
    const [style_name, setStyleName] = useState('');
    const [color, setColor] = useState('');
    const [picture_url, setPictureUrl] = useState('');
    const [location, setLocation] = useState('');

    const fetchData = async () => {
      const url = 'http://localhost:8100/api/locations/';
      const response = await fetch(url);
      if (response.ok) {
        const locations_data = await response.json();
        setLocations(locations_data.locations)
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
      setPictureUrl(value);
    }

    const handleLocationChange= (event) => {
      const value = event.target.value;
      setLocation(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.fabric = fabric;
        data.style_name = style_name;
        data.color = color;
        data.picture_url = picture_url;
        data.location = location;

    const hatUrl = 'http://localhost:8090/api/hats/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };

    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      setFabric('');
      setStyleName("");
      setColor("");
      setPictureUrl("");
      setLocation("");
    } else {
      const errorResponse = await response.json();
      console.error(errorResponse);
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
              <input placeholder="Picture Url" value={picture_url} onChange={handlePictureUrlChange} name="picture_url" required type="text" id="picture_url" className="form-control"/>
              <label htmlFor="picture_url">Picutre Url</label>
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
