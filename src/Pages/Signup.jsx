import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import signUpVideo from "../assets/signUp.mp4";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { createUser, updateUser, googleWithLogin, setUser } =
    useContext(AuthContext);

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, photo, email, password);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo }).then(() => {
          setUser({ ...user, displayName: name, photoURL: photo });
          navigate("/");
        }).catch((error) => {
          console.log(error);
        })
        console.log(user);
        toast.success("Login Successfully");

        form.reset();
      })
      .catch((error) => {
        console.log(error.code);
        if (error.code === "auth/invalid-credential") {
          setError("Invalid Email or Password");
        } else if (error.code === "auth/user-not-found") {
          alert("No account found with this email.");
        }
      });
  };
  const handleGoogleLogin = () => {
    googleWithLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className=" bg-base-200 pt-10 ">
        <div className="hero-content px-0 relative flex flex-col ">
          <video
            className="w-full h-screen object-cover"
            width="360"
            height="115"
            autoPlay
            loop
            muted
            playsInline
            src={signUpVideo}
          ></video>
          <div className="absolute top-0 bottom-4 inset-0 bg-black/50"></div>
          {/* Login Form */}
          <div className="rounded-xl absolute  bg-transparent w-full max-w-sm shrink-0">
            <form onSubmit={handelLogin} className="card-body">
              <h1 className="text-center text-white font-bold text-2xl">
                Sign Up
              </h1>
              <fieldset className="fieldset">
                {/* Name */}
                <div>
                  <label className="block text-white font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full text-white  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Your Name"
                    name="name"
                    required
                  />
                </div>
                {/* Photo */}
                <div>
                  <label className="block text-white font-medium mb-1">
                    Photo URL
                  </label>
                  <input
                    type="text"
                    className="w-full text-white  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Photo URL"
                    name="photo"
                    required
                  />
                </div>
                {/* Email */}
                <label className="label text-white ">Email</label>
                <input
                  type="email"
                  className="w-full text-white  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Email"
                  name="email"
                  required
                />
                {/* Password */}
                <div className="relative">
                  <label className="block text-white font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full text-white  px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {error && <p className="text-red-600">{error}</p>}
                  <span
                    onClick={() => {
                      setShow(!show);
                    }}
                    className="absolute text-white  right-5 top-[35px] z-50 cursor-pointer"
                  >
                    {show ? <FaEye></FaEye> : <FiEyeOff></FiEyeOff>}
                  </span>
                </div>
                 <Button className={'z-50 w-full text-black'}> Signup</Button>
               
              </fieldset>
            </form>
            <div className="flex w-[90%] mx-auto flex-col">
              <div className="card rounded-box grid  place-items-center"></div>
              <div className="divider text-white mt-0">OR</div>
              <div className="card rounded-box grid place-items-center"></div>
            </div>
            <div className="text-center ">
              <Button
                onClick={handleGoogleLogin}
                className="z-50 w-[90%] text-2xl"
              >
                <FcGoogle />
                Google
              </Button>
              {/* <button className="btn">
                <FaGithub /> Github
              </button> */}
            </div>
            <div className="text-center text-white my-5">
              <p>
                have an account...?
                <Link
                  to={"/auth/login"}
                  className="text-[#875DF8] font-semibold hover:underline"
                >
                  SignIn
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
