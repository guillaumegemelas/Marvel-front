import { Link } from "react-router-dom";

const CharacCard = ({ character }) => {
  return (
    <div className="responseData">
      {/* on map sur le response.data.results */}
      {character.results.map((elem) => {
        console.log(elem);
        console.log(elem._id);
        return (
          //link vers la page Comics liés au personnage: route /comics/:characterId
          //requete vers comics/${charId}?apiKey=${apiKey}
          <Link to={`/comics/${elem._id}`}>
            <article className="charCard" key={elem.id}>
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
  );
};

export default CharacCard;
