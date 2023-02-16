import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const CharacCard = ({ character }) => {
  return (
    <div className="responseData">
      {/* on map sur le response.data.results */}
      {character.results.map((elem, index) => {
        console.log(elem);
        console.log(elem._id);
        return (
          //link vers la page Comics liés au personnage: route /comics/:characterId
          //requete vers comics/${charId}?apiKey=${apiKey}

          <article className="charCard" key={index}>
            {/* initialement key:elem.id mais pbm console each child should have a key */}
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
                  Cookies.set("elemCharId", elem._id, { expires: 10 });
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
