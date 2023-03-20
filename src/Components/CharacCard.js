import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "js-cookie";
// import { useState } from "react";
import background from "../img/background.jpg";

//import pour messages erreurs perso
import toast, { Toaster } from "react-hot-toast";

const CharacCard = ({ character, token }) => {
  // const [tab, setTab] = useState([Cookies.get("elemCharId")]);
  console.log(token);

  const navigate = useNavigate();

  return (
    <div className="responseData">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {character.results.map((elem, index) => {
        return (
          <article className="charCard" key={index}>
            {/* initialement key:elem.id ou index mais pbm console each child should have a key */}
            {!elem.thumbnail.path.includes("image_not_available") ? (
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
              />
            ) : (
              <img src={background} alt="background img" />
            )}
            <h1>{elem.name}</h1>
            <p>{elem.description}</p>
            <div className="fav">
              <button
                key={elem.id}
                className="favorite"
                onClick={async () => {
                  // ajout des favoris en BDD ave requete au backend
                  if (token) {
                    try {
                      const response = await axios.post(
                        "https://site--marvel-back--zqfvjrr4byql.code.run/addfavouritescharc",
                        {
                          name: elem.name,
                          image: `${elem.thumbnail.path}.${elem.thumbnail.extension}`,
                          token: token,
                        }
                      );
                      // alert("Added to Favourites");
                      toast.success("Added to Favourites!", {
                        duration: 3000,
                        icon: "👏",
                      });
                      console.log(response.data);
                    } catch (error) {
                      console.log(error.message);
                      if (
                        error.message === "Request failed with status code 409"
                      ) {
                        toast.error("Already added to Favourites!", {
                          duration: 3000,
                          icon: "⚠️",
                        });
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

              <Link to={`/comics/${elem._id}`} key={elem.id}>
                <button className="favorite1">▷</button>
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default CharacCard;
