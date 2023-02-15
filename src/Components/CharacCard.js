const CharacCard = ({ character }) => {
  return (
    <div className="responseData">
      {/* on map sur le response.data.results */}
      {character.results.map((elem, index) => {
        console.log(elem);
        return (
          //link vers la page Comics liés au personnage: route /comics/:characterId
          //requete vers comics/${charId}?apiKey=${apiKey}

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
        );
      })}
    </div>
  );
};

export default CharacCard;
