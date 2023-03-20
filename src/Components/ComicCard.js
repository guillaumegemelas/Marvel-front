// import Cookies from "js-cookie";
import background1 from "../img/background1.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useState } from "react";

const ComicCard = ({ comics, token }) => {
  //Mise en favoris des characters: remplir tableau vide et push dès qu'on clique
  // const [tab, setTab] = useState([]);

  const navigate = useNavigate();

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
                onClick={async () => {
                  // ajout des favoris en BDD ave requete au backend
                  if (token) {
                    try {
                      const response = await axios.post(
                        "http://localhost:3000/addfavouritescom",
                        {
                          image: `${elem.thumbnail.path}.${elem.thumbnail.extension}`,
                          token: token,
                        }
                      );
                      alert("Added to Favourites");
                      console.log(response.data);
                    } catch (error) {
                      console.log(error.message);
                      if (
                        error.message === "Request failed with status code 409"
                      ) {
                        alert("Favourites already added");
                      }
                    }
                  } else {
                    navigate("/user/login");
                  }
                  // ajout des favoris avec méthode des Cookies
                  //                   const newTab = [...tab];
                  //                   if (newTab.indexOf(elem._id) === -1) {
                  //                     newTab.push(elem._id);
                  //                     setTab(newTab);
                  //                     Cookies.set("elemCharId", [newTab], { expires: 10 });
                  //                   }
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
