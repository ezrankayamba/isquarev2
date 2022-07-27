import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Auth from "../../services/auth";

let styles = {
  asteric: {
    paddingLeft: ".5rem",
    paddingBottom: ".4rem",
  },
};

const SignUpModal = ({ onClose }) => {
  let emailRef = useRef();
  let passwordRef = useRef();
  let fnameRef = useRef();
  let lnameRef = useRef();
  const [errorMsg, setErrorMsg] = useState(null);
  let navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();
    let params = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      first_name: fnameRef.current.value,
      last_name: lnameRef.current.value,
      role: "USER",
    };
    console.log(params);

    let res = await Auth.signUpUser(params);
    console.log(res);
    if (res.status === 200) {
      onClose();
    }
  };

  const closeHandler = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    console.log("Close the model...");
    onClose();
  };
  return (
    <section className="user-auth-page">
      <div className="login-form">
        <form onSubmit={onSubmit}>
          <div className="form-header">
            <h1>Sign Up</h1>
            <small>It’s quick and easy.</small>
            <button type="button" className="btn-close" onClick={closeHandler}>
              &#x2716;
            </button>
          </div>
          <div className="horizontal-wrap">
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="fname">
                First name <span style={styles.asteric}>*</span>
              </label>
              <input
                ref={fnameRef}
                name="fname"
                type="person"
                id="fname"
                className="form-control"
                required
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="lname">
                Last name <span style={styles.asteric}>*</span>
              </label>
              <input
                ref={lnameRef}
                name="lname"
                type="person"
                id="lname"
                className="form-control"
                required
              />
            </div>
          </div>
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="typeEmailX-2">
              Email <span style={styles.asteric}>*</span>
            </label>
            <input
              ref={emailRef}
              name="email"
              type="email"
              id="typeEmailX-2"
              className="form-control"
              required
            />
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="typePasswordX-2">
              Password <span style={styles.asteric}>*</span>
            </label>
            <input
              ref={passwordRef}
              name="password"
              type="password"
              id="typePasswordX-2"
              className="form-control"
              required
            />
          </div>
          {errorMsg && <p className="text-danger">Error: {errorMsg}</p>}
          <button className="btn btn-primary  btn-block w-100" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpModal;
