// import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
// import background from "../img/background.jpg";

const Favorites = ({ token }) => {
  //j'importe des cookie la chaine de caractère stockée et la transforme en tableau avec split()
  // const cookieChar = Cookies.get("elemCharId");

  //Eviter split() sur undefined si pas de favoris au clique sur favoris
  // let tab1;
  // if (cookieChar) {
  //   tab1 = cookieChar.split(",");
  // } else tab1 = [];

  const [character, setCharacter] = useState([]);
  const [comics, setComics] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isLoading1, setIsloading1] = useState(true);

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/favourites`);
        setCharacter(response.data);
        console.log(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchFavourites();
  }, []);

  useEffect(() => {
    const fetchFavouritesCom = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/favouritescom`);
        setComics(response.data);
        console.log(response.data);
        setIsloading1(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchFavouritesCom();
  }, []);

  return (
    <div className="fovPage">
      <div>
        {isLoading ? (
          <div className="isLoading">
            <p>En cours de chargement...</p>
          </div>
        ) : (
          <div className="favouriteContainer">
            <div className="favouriteContainer1">
              <h1>Favorites characters</h1>
              <div className="favCard0">
                {character.favourites.map((even, index) => {
                  console.log(even);
                  return (
                    <div key={index}>
                      {token === even.token && (
                        <div className="favCard">
                          <img src={even.image} alt="charactimg" />
                          <div className="underSection">
                            <p>{even.name}</p>
                            <button
                              onClick={async () => {
                                try {
                                  const response = await axios.delete(
                                    `http://localhost:3000/favourites/delete/${even._id}`
                                  );
                                  setCharacter(response.data);
                                  console.log(response.data.favourites);
                                  alert("favourite deleted");
                                } catch (error) {
                                  console.log(
                                    error.response,
                                    "error delete fav**************"
                                  );
                                }
                              }}
                            >
                              ✘
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {isLoading1 ? (
          <div className="isLoading">
            <p>En cours de chargement...</p>
          </div>
        ) : (
          <div className="favouriteContainer">
            <div className="favouriteContainer1">
              <h1>Favorites comics</h1>
              <div className="favCard0">
                {comics.favouritescom.map((item, index) => {
                  console.log(item);
                  return (
                    <div key={index}>
                      {token === item.token && (
                        <div className="favCard">
                          <img src={item.image} alt="charactimg" />
                          <div className="underSection">
                            <button
                              onClick={async () => {
                                try {
                                  const response = await axios.delete(
                                    `http://localhost:3000/favouritescom/delete/${item._id}`
                                  );
                                  setComics(response.data);
                                  // console.log(response.data);
                                  alert("favourite deleted");
                                } catch (error) {
                                  console.log(
                                    error.response,
                                    "error delete fav**************"
                                  );
                                }
                              }}
                            >
                              ✘
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
