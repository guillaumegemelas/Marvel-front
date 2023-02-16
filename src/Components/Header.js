import logo from "../img/logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo Marvel" />
      </div>

      <div className="display">
        {/* <input type="text" value="comics" />
        <input type="text" value="personnages" />
        <input type="text" value="favoris" /> */}
      </div>
    </div>
  );
};

export default Header;
