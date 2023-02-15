import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

//page généraliste sur laquelle apparaîssent tous les personnages par fiche: /characters?
const Characters = ({ apiKey, limit, skip, title }) => {
  const [character, setCharacter] = useState();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/characters?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
        );
        setCharacter(response.data);
        setIsloading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [apiKey, title, limit, skip]);

  return (
    <div>
      <div>
        <h1>vous etes sur la page characters</h1>
      </div>

      {isLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        <div className="responseData">
          {/* on map sur le response.data.results */}
          {character.results.map((elem, index) => {
            console.log(elem);
            return (
              //link vers la page Comics liés au personnage: route /comics/:characterId
              //requete vers comics/${charId}?apiKey=${apiKey}
              <Link>
                <article className="charCard" key={index}>
                  {elem.thumbnail.path && (
                    <img
                      //   pour afficher les imgs, méthodo doc API
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt=""
                    />
                  )}

                  <h1>{elem.name}</h1>
                  <p>{elem.description}</p>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Characters;
