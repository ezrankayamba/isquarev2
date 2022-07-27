import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/auth";

const ForgotPassword = () => {
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
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <div className="form-header">
            <h1>Forgot password?</h1>
            <small>It’s quick and easy.</small>
          </div>

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
          {errorMsg && <p className="text-danger">Error: {errorMsg}</p>}
          <button className="btn btn-primary  btn-block w-100" type="submit">
            Request new password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
