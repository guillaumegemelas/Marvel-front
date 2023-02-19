import Cookies from "js-cookie";
import background1 from "../img/background1.jpg";
import { useState } from "react";

const ComicCard = ({ comics }) => {
  //Mise en favoris des characters: remplir tableau vide et push dès qu'on clique
  const [tab, setTab] = useState([]);

  return (
    <div className="responseDataComics">
      {comics.results.map((elem) => {
        return (
          <article className="comiCard" key={elem._id}>
            {!elem.thumbnail.path.includes("image_not_available") ? (
              <img
                //   pour afficher les imgs, méthodo doc API
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
              />
            ) : (
              <img src={background1} alt="background img" />
            )}
            <h1>{elem.title}</h1>
            <div className="test">
              <p>{elem.description}</p>
            </div>
            <div className="fav">
              <button
                className="favorite"
                onClick={() => {
                  const newTab = [...tab];
                  newTab.push(elem._id);
                  setTab(newTab);
                  Cookies.set("elemComId", [newTab], { expires: 10 });
                }}
              >
                ♡
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ComicCard;
