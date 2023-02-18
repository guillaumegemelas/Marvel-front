import { Link } from "react-router-dom";
import Cookies from "js-cookie";
//import pour tab et newTab
import { useState } from "react";

const CharacCard = ({ character }) => {
  //test mise en favoris des characters: idée: remplir tableau vide et push dès qu'on clique
  const [tab, setTab] = useState([]);

  return (
    <div className="responseData">
      {/* on map sur le response.data.results */}
      {character.results.map((elem, index) => {
        // console.log(elem._id);
        return (
          //link vers la page Comics liés au personnage: route /comics/:characterId
          //requete vers comics/${charId}?apiKey=${apiKey}

          <article className="charCard" key={elem.id}>
            {/* initialement key:elem.id ou index mais pbm console each child should have a key */}
            {elem.thumbnail.path && (
              <img
                //   pour afficher les imgs, méthodo doc API
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
              />
            )}
            <h1>{elem.name}</h1>
            <p>{elem.description}</p>
            <div className="fav">
              <button
                className="favorite"
                onClick={() => {
                  const newTab = [...tab];
                  newTab.push(elem._id);
                  setTab(newTab);

                  Cookies.set("elemCharId", [newTab], { expires: 10 });
                }}
              >
                ♡
              </button>
              <Link to={`/comics/${elem._id}`} key={elem.id}>
                <button className="favorite1">see more</button>
              </Link>{" "}
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CharacCard;
