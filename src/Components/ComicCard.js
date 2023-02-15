const ComicCard = ({ comics }) => {
  return (
    <div className="responseDataComics">
      {comics.results.map((elem, index) => {
        console.log(elem);
        return (
          <article className="comiCard">
            <img
              //   pour afficher les imgs, méthodo doc API
              src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
              alt=""
            />
            <h1>{elem.title}</h1>
            <p>{elem.description}</p>
          </article>
        );
      })}
    </div>
  );
};

export default ComicCard;
