import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo Marvel" />
      </div>

      <div className="display">
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Characters
        </button>
        <button
          onClick={() => {
            navigate("/comics");
          }}
        >
          Comics
        </button>
        <button>favoris</button>
      </div>
    </div>
  );
};

export default Header;
