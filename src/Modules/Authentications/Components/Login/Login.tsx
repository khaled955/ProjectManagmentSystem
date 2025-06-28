
import { useForm } from "react-hook-form";
import photo from "../../../../assets/images/th.jpeg";
import { EMAIL_VALIDATION } from "../../../../Services/Validation";
import type { FormLoginProps } from "../../../../Interfaces/Interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTHENTICATION_URL } from "../../../../Services/URL";
import axiosInstance from "../../../../Services/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Hooks/useAuth";





export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

const {setToken} = useAuth()




  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginProps>({ mode: "onChange" });

   const login = async function(info: FormLoginProps) {
    const toastId = toast.loading("Waiting....");

    try {
      const options = {
        url: AUTHENTICATION_URL.LOGIN,
        method: "POST",
        data: info,
      };
      const { data } = await axiosInstance.request(options);
    if(!data.message && data.token){
 
 localStorage.setItem("userToken", data.token);
      setToken(data.token)
      toast.success("Login Successfully 👌");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      setErrorMessage(null);






    }else{


      setErrorMessage(data.message)


    }



    } catch (error) {

      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Something went wrong!");
        setErrorMessage(error.response?.data.message || "Something went wrong!");

  
      }
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <main className="rounded-2 py-2 px-4" aria-label="Login Page">
      <section className="text mt-3" aria-labelledby="login-heading">
        <p style={{ fontSize: 10 }} className="mb-0 text-white">
          Welcome to PMS
        </p>
        <h1 id="login-heading" style={{ color: "#EF9B28" }} className="h4 fw-bold">
          Login To PMS
        </h1>
      </section>

      <div className="img text-center">
        <img
          width={60}
          height={60}
          className="rounded-circle"
          src={photo}
          alt="User avatar or login illustration"
        />
      </div>

      <form
        className="row mt-2 py-3"
        onSubmit={handleSubmit(login)}
        aria-describedby="form-description"
        noValidate
      >
        <fieldset className="col-md-12">
          <legend className="visually-hidden">Login Form</legend>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="d-block" style={{ color: "#EF9B28" }}>
              E-mail
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_VALIDATION,
                  message: "Email must be valid",
                },
              })}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="position-relative">
            <label htmlFor="password" className="d-block" style={{ color: "#EF9B28" }}>
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    "Minimum 8 characters, with at least one upper case, lower case, number, and special character.",
                },
              })}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.password && (
              <p id="password-error" className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.password.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* Navigation Links */}
        <nav className="link-btn d-flex justify-content-between my-2" aria-label="Login navigation links">
          <Link className="text-white text-decoration-none" to="/register">
            Register Now?
          </Link>
          <Link className="text-white text-decoration-none" to="/forget-password">
            Forget Password
          </Link>
        </nav>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-center text-white mt-2" role="alert">
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="auth-btn mt-3"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? <i className="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> : "Save"}
        </button>
      </form>
    </main>
  );
}
