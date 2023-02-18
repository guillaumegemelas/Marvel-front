import Cookies from "js-cookie";
//test requete------------------
import axios from "axios";
import { useState, useEffect } from "react";

//-------------------------------

const Favorites = () => {
  //j'importe des cookie la chaine de caractère stockée et la transforme en tableau avec split()
  const cookieChar = Cookies.get("elemCharId");
  const cookieCom = Cookies.get("elemComId");
  const tab1 = cookieChar.split(",");
  console.log(tab1);
  const tab2 = cookieCom.split(",");
  console.log(tab2);

  //test requete-------------------------------------------
  const [character, setCharacter] = useState();
  const [isLoading, setIsloading] = useState(true);
  //---------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/characters?`
        );
        setCharacter(response.data);
        setIsloading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fovPage">
      {/* <h1 style={{ color: "white" }}>you are on favorite page</h1> */}
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
                  {/* {elem1} */}
                  {/* {console.log(elem1, "map sur le tab des cookies")} */}
                  {character.results.map((elem, index) => {
                    return (
                      <div key={index}>
                        {elem._id === elem1 && (
                          <article className="charCard1" key={elem.id}>
                            <img
                              //   pour afficher les imgs, méthodo doc API
                              src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                              alt=""
                            />
                            <div className="favDescr">
                              <h1>{elem.name}</h1>
                              <p>{elem.description}</p>
                            </div>
                          </article>
                        )}
                      </div>
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
