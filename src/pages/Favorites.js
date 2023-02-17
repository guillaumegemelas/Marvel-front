import Cookies from "js-cookie";

const Favorites = () => {
  //j'importe des cookie la chaine de caractère stockée et la transforme en tableau avec split()
  const cookieChar = Cookies.get("elemCharId");
  const cookieCom = Cookies.get("elemComId");
  const tab1 = cookieChar.split(",");
  console.log(tab1);
  const tab2 = cookieCom.split(",");
  console.log(tab2);

  return (
    <div className="charPage">
      <h1 style={{ color: "white" }}>you are on favorite page</h1>
      <div></div>
    </div>
  );
};

export default Favorites;
