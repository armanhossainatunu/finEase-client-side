import { useContext, useEffect, useState } from "react";
import { FaEye, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import loginImg from "../assets/login-img.jpg";
import loginLogo from "../assets/logo-white.png";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AuthContext } from "../Context/AuthContext";
import Button from "../Components/Button";

const Login = () => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { user, login, googleWithLogin, resetPassword, setLoading } =
    useContext(AuthContext);
  console.log(user);
  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
setEmail(email)
    console.log(email, password);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    setLoading(true);
    setError("");
    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Login Successfully");
        navigate(location.state || "/");
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

  const handleResetPassword = (email) => {
    resetPassword(email)
      .then(() => {
        toast.success("Password Reset Email Sent");
      })
      .catch((error) => {
        console.log(error);
      });
  };
useEffect(() => {
setEmail(defaultValue => email)

}, [email]);
  return (
    <div>
      <div className="mx-auto bg-base-200 pt-18 min-h-[85vh]">
        <div className="hero-content flex flex-col  md:flex-row">
          {/* Login Image */}
          <div className="relative w-full max-w-sm rounded-xl overflow-hidden">
            <img
              src={loginImg}
              alt=""
              className="h-[438px] object-cover rounded-xl "
            />
            <div className="absolute inset-0 bg-black/50">
              <div className="mt-10 ml-8">
                <Link to="/" className="text-2xl font-bold text-white">
                  <img src={loginLogo} alt="" className="w-10" />
                </Link>
                <h1 className="text-white mt-1.5 font-bold ">
                  Welcome to FinEase
                </h1>

                <h1 className="text-xl font-medium text-white mt-7">
                  Professional & Trustworthy
                </h1>
                <p className="text-sm font-medium text-white mt-2">
                  FinEase is a user-friendly and secure platform that empowers
                  you to efficiently manage your income, expenses, and savings.
                </p>
              </div>
            </div>
            <div className="absolute  ml-8 bottom-15 text-white flex gap-3">
              <Link to="https://linkedin.com/login" target="_blank">
                <FaLinkedin />
              </Link>
              <Link to="https://github.com/login" target="_blank">
                <FaGithubSquare />
              </Link>
              <Link to="https://x.com/login" target="_blank">
                <FaSquareXTwitter />
              </Link>
            </div>
            <p className="text-white absolute ml-8 bottom-5 text-sm b-0">
              Have an issue with 2-factor authentication?
            </p>
          </div>
          {/* Login Form */}
          <div className="rounded-xl bg-base-100 w-full max-w-sm shrink-0">
            <form onSubmit={handelLogin} className="card-body">
              <h1 className="text-center font-bold text-2xl">Sign In</h1>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Email"
                  name="email"
                  required
                />
                {/* Password */}
                <div className="relative">
                  <label className="block text-gray-600 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {error && <p className="text-red-600">{error}</p>}
                  <span
                    onClick={() => {
                      setShow(!show);
                    }}
                    className="absolute right-5 top-[35px] z-50 cursor-pointer"
                  >
                    {show ? <FaEye></FaEye> : <FiEyeOff></FiEyeOff>}
                  </span>
                </div>

                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  type="button"
                  className="text-start text-sm mt-3 hover:underline"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Forgot password?
                </button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <form onSubmit={handleResetPassword}>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                      <div className="flex justify-center mt-5">
                        <button type="submit" className="btn mx-auto">Submit</button>
                      </div>
                    </form>
                  </div>
                </dialog>

                {/* <div>
                  <Link className="text-sm hover:underline" to="/auth/forgot">
                    Forgot password?
                  </Link>
                </div> */}

                <Button className={"z-50 w-[90%]"}> Signup</Button>
              </fieldset>
            </form>
            <div className="flex w-[90%] mx-auto flex-col">
              <div className="card rounded-box grid  place-items-center"></div>
              <div className="divider mt-0">OR</div>
              <div className="card rounded-box grid place-items-center"></div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleGoogleLogin}
                className="btn w-[90%] text-2xl"
              >
                <FcGoogle />
                Google
              </button>
            </div>
            <div className="text-center my-5">
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/auth/signup"}
                  className="text-[#875DF8] hover:underline"
                >
                  Signup
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
