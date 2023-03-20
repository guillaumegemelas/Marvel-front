import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://site--marvel-back--zqfvjrr4byql.code.run/user/signup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        handleToken(response.data.token);
        alert("Votre compte est créé");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data, "erreur signup 🤕");
      if (error.response.data.message === "This email is already used") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un email valide"
        );
      }
      if (error.response.data.message === "This username is already used") {
        setErrorMessage(
          "Ce nom d'utilisateur est déjà utilisé, veuillez créer un compte avec un nom d'utilisateur valide"
        );
      }
      if (error.response.data.message === "Missing parameter") {
        setErrorMessage("Veuillez remplir tous les champs s'il vous plaît");
      }
    }
  };

  return (
    <div className="signupForm">
      <div className="h1form">
        <h1>Sign up</h1>
      </div>

      <form
        className="formSign"
        onSubmit={(event) => {
          event.preventDefault();
          handleSignup();
        }}
      >
        <input
          id="username"
          value={username}
          type="text"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          id="email"
          value={email}
          type="text"
          placeholder="Email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          id="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button className="inscriptionButton" type="submit">
          Sign up
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Link to={"/user/login"}>
          <p>Already have an account, please login</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
