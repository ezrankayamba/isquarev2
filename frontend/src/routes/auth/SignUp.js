import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/auth";
import SignUpModal from "./SignUpModal";

const SignUp = () => {
  let emailRef = useRef();
  let passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();
  let auth = useAuth();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    let params = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(params);

    auth.signin(params, (err) => {
      if (!err) {
        navigate("/");
      } else {
        setErrorMsg(err);
      }
    });
  };
  return (
    <section className="user-auth-page">
      <div className="intro-text">
        <h1 className="logo-text">iSQUARE</h1>
        <p>
          iSQUARE is meant to be a platform to link between various innovation
          stakeholders in different industries;
        </p>
      </div>

      <SignUpModal onClose={() => navigate("/")} />
    </section>
  );
};

export default SignUp;
