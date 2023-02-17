import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(Cookies.get("token") || null);

  const [errorMessage, setErrorMessage] = useState("");

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
      console.log(response.data);

      if (response.data.token) {
        setToken(token);
        Cookies.set("token", token, { expires: 10 });
      } else {
        setToken(null);
        // Cookies.remove("token");
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
          "Cet username est déjà utilisé, veuillez créer un compte avec un username valide"
        );
      }
      if (error.response.data.message === "Missing parameter") {
        setErrorMessage("Veuillez remplir tous les champs s'il vous plaît");
      }
    }
  };

  return (
    <div className="signupForm">
      <h1>hello you are on the signu up page</h1>
    </div>
  );
};

export default Signup;
