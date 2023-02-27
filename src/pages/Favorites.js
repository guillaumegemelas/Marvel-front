import Cookies from "js-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import background from "../img/background.jpg";

const Favorites = () => {
  //j'importe des cookie la chaine de caractère stockée et la transforme en tableau avec split()
  const cookieChar = Cookies.get("elemCharId");

  //Eviter split() sur undefined si pas de favoris au clique sur favoris
  let tab1;
  if (cookieChar) {
    tab1 = cookieChar.split(",");
  } else tab1 = [];

  const [character, setCharacter] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/characters?`
        );
        setCharacter(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fovPage">
      <div>
        {isLoading ? (
          <div className="isLoading">
            <p>En cours de chargement...</p>
          </div>
        ) : (
          <div>
            <h1 style={{ marginTop: "30px" }}>Favorites characters</h1>
            {tab1.map((elem1, index) => {
              return (
                <div className=" favChar" key={index}>
                  {character.results.map((elem, index) => {
                    // console.log(elem._id);
                    return (
                      <div key={index}>
                        {elem._id === elem1 && (
                          <article className="charCard1" key={elem.id}>
                            {!elem.thumbnail.path.includes(
                              "image_not_available"
                            ) ? (
                              <img
                                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                                alt=""
                              />
                            ) : (
                              <img src={background} alt="background img" />
                            )}
                            <div className="favDescr">
                              <h1>{elem.name}</h1>
                              <p>{elem.description}</p>
                            </div>
                          </article>
                        )}
                      </div>
                      //il faudra créer un bouton pour retirer les éléments des favoris
                      //puis ajouter les comics en favoris
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
