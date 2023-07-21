import React, { useState, useEffect } from 'react';


function DeleteShoe({bins, shoes, getShoes}){

    // console.log(shoes, "shoes in delete");

    const [ bin, setBin] = useState("");
    const [ shoe, setShoe] = useState("");


    async function handleSubmit(event){
        event.preventDefault();

        const data = {}
        data.model_name = shoe;
        data.bin = bin;

        // console.log(shoe);
        const shoeUrl = `http://localhost:8080/api/shoes/${shoe}`;
        // console.log(shoe.id);
        const fetchConfig = {
            method: "delete",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {

            setBin('');
            setShoe('');

            getShoes();
        }


    }

    function handleChangeBin(event) {
        const { value } = event.target;
        setBin(value);
      }

    function handleChangeModelName(event) {
        const { value } = event.target;
        setShoe(value);
    }




    return(
        <div className="my-5 container">
        <div className="row">

          <div className="col">
            <div className="card shadow">
              <div className="card-body">
                <form onSubmit={handleSubmit} id="delete-shoe-form">

                  <h1 className="card-title">Delete a Shoe! </h1>
                  <p className="mb-3">
                    What shoe are you removing from the collection?
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

                  <div className="mb-3">
                    <select value={shoe.model_name} onChange={handleChangeModelName} name="modelName" id="modelName" className='form-select' required>
                      <option value="">Choose a model</option>
                      {shoes.map(shoe => {
                        return (
                          <option key={shoe.id} value={shoe.id}>{shoe.model_name}</option>
                        )
                      })}
                    </select>
                  </div>

                  <button className="btn btn-lg btn-primary">Delete</button>
                </form>


              </div>
            </div>
          </div>

        </div>
      </div>
    );
}

export default DeleteShoe;
