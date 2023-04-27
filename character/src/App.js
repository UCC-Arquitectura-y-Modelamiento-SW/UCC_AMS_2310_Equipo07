import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import './App.css';

function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    const ts = new Date().getTime().toString();
    const privateKey = "aa23a315bd2cad67cba8cad6457fa9517e450e1d";
    const publicKey = "c4e1fcbb5e390a28033b517f2bafe9f1";
    const hash = md5(ts + privateKey + publicKey);
    console.log(hash);
    console.log(ts);

    const fetchHeroes = async () => {
      const response = await axios.get(
        "https://gateway.marvel.com/v1/public/characters",
        {
          params: {
            apikey: publicKey,
            ts: ts,
            hash: hash,
            limit: 50,
          },
        }
      );
      setHeroes(response.data.data.results);
    };

    fetchHeroes();
  }, []);

  console.log(heroes);

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>HEROES HEROES</h1>
        
      </header>
      <div>
      <div className="row">
        <div className="col-md-3"> <h2>HEROE Y FOTO</h2></div>
        <div className="col-md-6"> <h2>Comics</h2></div>
      
        </div>
        {heroes.map((heroe) => (
          <div className="row" key={heroe.id}>
            <div className="col-md-3">
              <h2>{heroe.name}</h2>
              <img src={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`} alt={heroe.name} />
            </div>
            <div className="col-md-6">
              {heroe.comics.items.map((history, index) => (
                <div key={index}>
                  <ul>
                    <li>{history.name}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
