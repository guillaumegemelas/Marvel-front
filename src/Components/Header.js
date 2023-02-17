import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ handleToken, token }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo Marvel" />
      </div>
      <div className="connecButton">
        {token ? (
          <button
            className="but0"
            onClick={() => {
              handleToken(null);
              navigate("/user/login");
            }}
          >
            Disconnect
          </button>
        ) : (
          <div>
            <button className="but1" onClick={() => navigate("/user/signup")}>
              Sign up
            </button>

            <button className="but2" onClick={() => navigate("/user/login")}>
              Login
            </button>
          </div>
        )}
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
        <button
          onClick={() => {
            navigate("/myfavorites");
          }}
        >
          My favorites
        </button>
      </div>
    </div>
  );
};

export default Header;
