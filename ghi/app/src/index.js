import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


async function getHats() {
  const response = await fetch('http://localhost:8090/api/hats/');
  if (response.ok) {
    const data = await response.json();
    root.render(
      <React.StrictMode>
        <App hats={data.hats} />
      </React.StrictMode>
    );
    console.log(data);
  } else {
    console.error(response);
  }
}
getHats();
