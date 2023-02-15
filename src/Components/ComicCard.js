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
            <p>{elem.title}</p>
            <p>{elem.description}</p>
          </article>
        );
      })}
    </div>
  );
};

export default ComicCard;
