import Cookies from "js-cookie";

const Favorites = () => {
  return (
    <div className="charPage">
      <h1 style={{ color: "white" }}>you are on favorite page</h1>
      <div>
        {Cookies.get("elemCharId")}
        {console.log(Cookies.get("elemCharId"))}
        <p style={{ color: "white" }}>{Cookies.get("elemCharId")}</p>
        {/* renvoie le cookie contenant l'id du perso mis en favoris */}
        <p style={{ color: "white" }}>Favorites Comics</p>{" "}
      </div>

      <div>
        <p style={{ color: "white" }}>Favorites Characters</p>{" "}
      </div>
    </div>
  );
};

export default Favorites;
