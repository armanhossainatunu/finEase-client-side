import { useState } from "react";
import { FaEye, FaGithub, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff } from "react-icons/fi";
import { Link } from "react-router";
import { toast } from "react-toastify";
import loginImg from "../assets/login-img.jpg";
import loginLogo from "../assets/logo-white.png";
import { FaSquareXTwitter } from "react-icons/fa6";

const Login = () => {
  const [error, setError] = useState("");

  const [show, setShow] = useState(false);

  const handelLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }
    (email, password)
      .then((result) => {
        const user = result.user;
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
  const handleGoogleLogin = () => {};
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
                    <img src={loginLogo} alt="" className="w-10" h-5 />
                  </Link>
                  <h1 className="text-white mt-1.5 font-bold ">
                    Welcome to FinEase
                  </h1>

                  <h1 className="text-xl font-medium text-white mt-7">
                    Professional & Trustworthy
                  </h1>
                  <ul className="text-white list-disc text-sm space-y-3">
                    <li>
                      “Securely log in to manage your income, expenses, and
                      savings.”
                    </li>
                    <li>
                      “Access your FinEase account safely and efficiently.”
                    </li>
                    <li>
                      “Sign in to track your finances and achieve your goals.”
                    </li>
                  </ul>
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
                  <div>
                    <Link className="text-sm hover:underline" to="/auth/forgot">
                      Forgot password?
                    </Link>
                  </div>
                  <button type="submit" className="btn btn-bg mt-4">
                    SignIn
                  </button>
                </fieldset>
              </form>
              <div className="flex w-[90%] mx-auto flex-col">
                <div className="card rounded-box grid  place-items-center"></div>
                <div className="divider mt-0">OR</div>
                <div className="card rounded-box grid place-items-center"></div>
              </div>
              <div className="text-center flex justify-center items-center gap-2.5">
                <button onClick={handleGoogleLogin} className="btn">
                  <FcGoogle />
                  Google
                </button>
                <button className="btn">
                  <FaGithub /> Github
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
