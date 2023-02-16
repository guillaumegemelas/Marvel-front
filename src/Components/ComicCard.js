import Cookies from "js-cookie";

const ComicCard = ({ comics }) => {
  return (
    <div className="responseDataComics">
      {comics.results.map((elem) => {
        console.log(elem);
        return (
          <article className="comiCard" key={elem._id}>
            <img
              //   pour afficher les imgs, méthodo doc API
              src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
              alt=""
            />
            <h1>{elem.title}</h1>
            <div className="test">
              <p>{elem.description}</p>
            </div>
            <div className="fav">
              <button
                className="favorite"
                onClick={() => {
                  // on met dans les cookies elem._id et on le stock
                  Cookies.set("elemComId", elem._id, { expires: 10 });
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
