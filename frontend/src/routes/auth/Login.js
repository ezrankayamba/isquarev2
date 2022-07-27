import { useRef, useState } from "react";
import useAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import SignUpModal from "./SignUpModal";

const Login = (props) => {
  let emailRef = useRef();
  let passwordRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();
  let auth = useAuth();
  let [signUpOpen, setSignUpOpen] = useState(false);

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
  const doneSignUp = () => {
    setSignUpOpen(false);
    navigate("/");
  };
  return (
    <>
      <section className="user-auth-page">
        <div className="intro-text">
          <h1 className="logo-text">iSQUARE</h1>
          <p>
            iSQUARE is meant to be a platform to link between various innovation
            stakeholders in different industries;
          </p>
        </div>
        <div className="login-form">
          <form onSubmit={onSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="typeEmailX-2">
                Email
              </label>
              <input
                ref={emailRef}
                name="email"
                type="email"
                id="typeEmailX-2"
                className="form-control"
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="typePasswordX-2">
                Password
              </label>
              <input
                ref={passwordRef}
                name="password"
                type="password"
                id="typePasswordX-2"
                className="form-control"
              />
            </div>
            {errorMsg && <p className="text-danger">Error: {errorMsg}</p>}
            <button className="btn btn-primary  btn-block w-100" type="submit">
              Login
            </button>
            <a href="/auth/forgot-password" className="m-2">
              Forgot password?
            </a>
            <hr />
            <button
              type="button"
              className="btn btn-primary  btn-block w-100 btn-create-new-account"
              onClick={() => setSignUpOpen(true)}
            >
              Create new Account
            </button>
          </form>
        </div>
      </section>
      {signUpOpen && (
        <Modal>
          <SignUpModal onClose={() => doneSignUp()} />
        </Modal>
      )}
    </>
  );
};

export default Login;
