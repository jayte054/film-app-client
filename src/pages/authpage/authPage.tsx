import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authcontext/authContext";
import { registerUser, signIn } from "../../stores/authStore";
import "./authPage.css";

export const AuthPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const {updateUser} = useContext(AuthContext)

  //handle password for the passord input
  const handlePassword = (value: string) => {
    setPassword(value);
  };

   const handlePassword1 = (value: string) => {
     setPassword1(value);
   };

  // handle signup call which communicates with the registerUser endpoint
  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await registerUser(fullName, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  //handle signIn which communicates with the signin endpoint
  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const userData = await signIn( email1, password1 );
      console.log(userData)
      updateUser(userData);
      //navigates to homePage
        navigate("/homePage", {
        state: { data: userData.user.email },
        replace: true,
      });
      console.log("signin successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authPage-container">
      <h1>Film Purchase App</h1>
      <div className="authPage-body">
        <div className="signUp">
          <h1>signup</h1>
          <span>Full Name</span>
          <input
            type="text"
            placeholder="firstname"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
          /><br />
          <span> Email Address</span>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />
          <span> Password </span>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
            required
          />
          <br />
          <button
            className="signup-button"
            type="button"
            onClick={(e) => handleSignup(e)}
          >
            Sign Up
          </button>
        </div>
        <div className="signIn">
          <h1>signin</h1>
          <span> Email </span>
          <input
            type="email"
            placeholder="email"
            value={email1}
            onChange={(e) => setEmail1(e.target.value)}
            required
          /><br />
          <span> Password </span>
          <input
            type="password"
            placeholder="password"
            value={password1}
            onChange={(e) => handlePassword1(e.target.value)}
            required
          />
          <br />
          <button
            className="signup-button"
            type="button"
            onClick={(e) => handleSignIn(e)}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
