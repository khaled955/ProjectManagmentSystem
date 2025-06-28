
import { useForm } from "react-hook-form";
import type { ChangePassInfoProps } from "../../../../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTHENTICATION_URL } from "../../../../Services/URL";
import axiosInstance from "../../../../Services/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [showOldPassword , setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<ChangePassInfoProps>({
    mode: "onChange",
    
  });

  async function changePassword(info: ChangePassInfoProps) {
    const toastId = toast.loading("Waiting....");

    try {
      const options = {
        url: AUTHENTICATION_URL.CHANGE_PASSWORD,
        method: "PUT",
        data: info,
      };
      const { data } = await axiosInstance.request(options);
      toast.success(data.message || "Password Changed successfully.");
      setErrorMessage(null);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data.message || "Something went wrong!");
        setErrorMessage(error.response?.data.message || "Something went wrong!");
      }
    } finally {
      toast.dismiss(toastId);
    }
  }

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "newPassword") trigger("confirmNewPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);


  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "oldPassword") trigger("newPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);













  return (
    <main className="rounded-2 py-2 px-4 col-md-6" aria-label="Reset Password Page">
      <section className="text mt-3" aria-labelledby="reset-heading">
        <p style={{ fontSize: 10 }} className="mb-0 text-white">
          Welcome to PMS
        </p>
        <h1 id="reset-heading" className="h4 fw-bold" style={{ color: "#EF9B28" }}>
          Change Password
        </h1>
      </section>

    

      <form className="row mt-2 py-3" onSubmit={handleSubmit(changePassword)} noValidate>
        <fieldset className="col-md-12">
          <legend className="visually-hidden">Reset Password Form</legend>

        
  {/*  oldPassword Input */}
          <div className="position-relative">
            <label htmlFor="oldPassword" style={{ color: "#EF9B28" }} className="d-block">
              Old Password
            </label>
            <input
              {...register("oldPassword", {
                required: " Old Password is required",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    "Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character",
                },

              })}
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your Old password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.oldPassword}
              aria-describedby={errors.oldPassword ? "oldpassword-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showOldPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid ${showOldPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.oldPassword && (
              <p className="text-white" id="password-error" role="alert" style={{ fontSize: 12 }}>
                {errors.oldPassword.message}
              </p>
            )}
          </div>


       
          {/*  newPassword Input */}
          <div className="position-relative">
            <label htmlFor="newPassword" style={{ color: "#EF9B28" }} className="d-block">
              Password
            </label>
            <input
              {...register("newPassword", {
                required: " New Password is required",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    "Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character",
                },
               validate: (value) => value !== watch("oldPassword") || "New Password Must Be Different Than Old Password",

              })}
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.newPassword}
              aria-describedby={errors.newPassword ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.newPassword && (
              <p className="text-white" id="password-error" role="alert" style={{ fontSize: 12 }}>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm  newPassword Input */}
          <div className="position-relative">
            <label htmlFor="confirmedpassword" style={{ color: "#EF9B28" }} className="d-block">
              Confirm Password
            </label>
            <input
              {...register("confirmNewPassword", {
                required: "Confirmed password is required",
                validate: (value) => value === watch("newPassword") || "Passwords do not match",
              })}
              id="confirmedpassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.confirmNewPassword}
              aria-describedby={errors.confirmNewPassword ? "confirm-password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.confirmNewPassword && (
              <p className="text-white" id="confirm-password-error" role="alert" style={{ fontSize: 12 }}>
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* Global Error */}
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








