import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  let history = useNavigate();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const MyForm = new FormData();

    MyForm.set("name", name);
    MyForm.set("email", email);
    MyForm.set("password", password);
    MyForm.set("avatar", avatar);

    dispatch(register(MyForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: [e.target.value] });
    }
  };

  const location = useLocation();
 
  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                action=""
                className="loginForm"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    name=""
                    value={loginEmail}
                    required
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <AiFillUnlock />
                  <input
                    type="password"
                    placeholder="password"
                    name=""
                    value={loginPassword}
                    required
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot"> Forgot Password </Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                action=""
                className="signUpForm"
                ref={registerTab}
                encType="multipart/formdata"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <CgProfile />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpEmail">
                  <AiOutlineMail />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    required
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <AiFillUnlock />
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    required
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Register"
                  className="signUpBtn"
                    disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
