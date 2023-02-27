import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import background from "../img/background.jpg";

const CharacCard = ({ character }) => {
  const [tab, setTab] = useState([Cookies.get("elemCharId")]);

  return (
    <div className="responseData">
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
                onClick={() => {
                  const newTab = [...tab];
                  console.log(newTab);

                  if (newTab.indexOf(elem._id) === -1) {
                    newTab.push(elem._id);
                    setTab(newTab);
                    Cookies.set("elemCharId", JSON.stringify(newTab), {
                      expires: 10,
                    });
                  }
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
