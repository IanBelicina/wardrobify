import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function ShoeColumn(props) {
    // console.log(props, "this is props");
    return (
      <div className="col">
        {props.list.map(data => {
          const shoe = data;
            console.log(shoe, "this is shoe")
          return (
            <div key={shoe.id} className="card mb-3 shadow">
              <img src={shoe.url} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Model: {shoe.model_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Manufacturer: {shoe.manufacturer}
                </h6>
                <p className="card-text">
                  Color: {shoe.color}
                </p>
              </div>
              <div className="card-footer">
                Bin: {shoe.bin.closet_name}

              </div>
            </div>
          );
        })}
      </div>
    );
  }


function ShoesList({ shoes }){

    const [ shoeColumns, setShoeColumns] = useState([]);

    useEffect(() => {


        async function getShoeDetails(){
            try{
                const requests = [];
                for (let shoe of shoes){
                    // console.log(shoe.id)
                    const detailUrl = `http://localhost:8080/api/shoes/${shoe.id}`;

                    requests.push(fetch(detailUrl));

                }

                const responses = await Promise.all(requests);
                const shoeColumns = [[], [], []];

                let i = 0;
                for (const shoeResponse of responses){
                    if (shoeResponse.ok){
                        const details = await shoeResponse.json();
                        shoeColumns[i].push(details);
                        i = i + 1;
                        if (i > 2) {
                          i = 0;
                        }
                    }
                    else{
                        console.error(shoeResponse);
                    }

                }
                setShoeColumns(shoeColumns);
            }
            catch(e){
                console.error(e);
            }
        }
        getShoeDetails();
    }, [shoes]);






    return(
        <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <h1 className="display-5 fw-bold">Shoes!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              Here is your current shoe collection!
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/shoes/new" className="btn btn-primary btn-lg px-4 gap-3">Attend a shoe</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Shoes</h2>
          <div className="row">
            {shoeColumns.map((shoeList, id) => {
              return (
                <ShoeColumn key={id} list={shoeList} />
              );
            })}
          </div>
        </div>
      </>
    );
}

export default ShoesList;
