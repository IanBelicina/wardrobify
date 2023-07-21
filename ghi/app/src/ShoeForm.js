import React, { useState, useEffect } from 'react';


function ShoeForm({getShoes, bins}){

    // console.log(bins, "in shoe form");


    const [ bin, setBin] = useState("");
    const [ modelName, setModelName] = useState("");
    const [ color, setColor] = useState("");
    const [ manufacturer, setManufacturer] = useState("");
    const [ url, setUrl] = useState("");


    async function handleSubmit(event){
        event.preventDefault();

        const data = {}
        data.manufacturer = manufacturer;
        data.model_name = modelName;
        data.color = color;
        data.url = url;
        data.bin = bin;


        const shoeUrl = 'http://localhost:8080/api/shoes/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
            const newShoe = await response.json();
            // console.log(newShoe);

            setManufacturer('');
            setBin('');
            setColor('');
            setModelName('');
            setUrl('');

            getShoes();
        }


    }



    function handleChangeBin(event) {
        const { value } = event.target;
        setBin(value);
      }

    function handleChangeModelName(event) {
        const { value } = event.target;
        setModelName(value);
    }

    function handleChangeColor(event) {
        const { value } = event.target;
        setColor(value);
    }

    function handleChangeManufacturer(event) {
        const { value } = event.target;
        setManufacturer(value);
    }

    function handleChangeURL(event) {
        const { value } = event.target;
        setUrl(value);
    }




    return(
        <div className="my-5 container">
        <div className="row">

          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="create-shoe-form">

                  <h1 className="card-title">Add a Shoe! </h1>
                  <p className="mb-3">
                    What shoe are you adding to the collection?
                  </p>


                  <div className="mb-3">
                    <select value={bin} onChange={handleChangeBin} name="bin" id="bin" className='form-select' required>
                      <option value="">Choose a bin</option>
                      {bins.map(bin => {
                        return (
                          <option key={bin.href} value={bin.href}>{bin.closet_name}</option>
                        )
                      })}
                    </select>
                  </div>


                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input value={modelName} onChange={handleChangeModelName} required placeholder="Model Name" type="text" id="modelName" name="modelName" className="form-control" />
                        <label htmlFor="modelName">Model Name</label>
                      </div>
                    </div>


                    <div className="col">
                      <div className="form-floating mb-3">
                        <input value={color} onChange={handleChangeColor} required placeholder="Color" type="text" id="color" name="color" className="form-control" />
                        <label htmlFor="email">Color</label>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input value={manufacturer} onChange={handleChangeManufacturer} required placeholder="Manufacturer" type="text" id="manufacturer" name="manufacturer" className="form-control" />
                        <label htmlFor="manufacturer">Manufacturer</label>
                      </div>
                    </div>


                    <div className="col">
                      <div className="form-floating mb-3">
                        <input value={url} onChange={handleChangeURL} required placeholder="Picture Url" type="text" id="Picture Url" name="Picture Url" className="form-control" />
                        <label htmlFor="Picture Url">Picture Url</label>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-lg btn-primary">Add</button>
                </form>


              </div>
            </div>
          </div>

        </div>
      </div>
    )
}

export default ShoeForm;
