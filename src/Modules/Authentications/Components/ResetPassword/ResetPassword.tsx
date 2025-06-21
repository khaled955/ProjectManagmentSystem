
import { useForm } from "react-hook-form";
import photo from "../../../../assets/images/th.jpeg";
import { EMAIL_VALIDATION } from "../../../../Services/Validation";
import type { ResetFormInfo } from "../../../../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTHENTICATION_URL } from "../../../../Services/URL";
import axiosInstance from "../../../../Services/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<ResetFormInfo>({
    mode: "onChange",
    defaultValues: { email: location.state.email },
  });

  async function resetPassword(info: ResetFormInfo) {
    const toastId = toast.loading("Waiting....");

    try {
      const options = {
        url: AUTHENTICATION_URL.RESET_PASSWORD,
        method: "POST",
        data: info,
      };
      const { data } = await axiosInstance.request(options);
      toast.success(data.message || "Password reset successfully.");
      setErrorMessage(null);
      setTimeout(() => {
        navigate("/login");
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
      if (name === "password") trigger("confirmPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  return (
    <main className="rounded-2 py-2 px-4" aria-label="Reset Password Page">
      <section className="text mt-3" aria-labelledby="reset-heading">
        <p style={{ fontSize: 10 }} className="mb-0 text-white">
          Welcome to PMS
        </p>
        <h1 id="reset-heading" className="h4 fw-bold" style={{ color: "#EF9B28" }}>
          Reset Password
        </h1>
      </section>

      <div className="img text-center">
        <img
          src={photo}
          alt="Reset password illustration"
          width={60}
          height={60}
          className="rounded-circle"
        />
      </div>

      <form className="row mt-2 py-3" onSubmit={handleSubmit(resetPassword)} noValidate>
        <fieldset className="col-md-12">
          <legend className="visually-hidden">Reset Password Form</legend>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" style={{ color: "#EF9B28" }} className="d-block">
              E-mail
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: EMAIL_VALIDATION, message: "Email must be valid" },
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
              <p className="text-white" id="email-error" role="alert" style={{ fontSize: 12 }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* OTP Input */}
          <div className="mb-3">
            <label htmlFor="otp" style={{ color: "#EF9B28" }} className="d-block">
              OTP Verification
            </label>
            <input
              {...register("seed", {
                required: "OTP is required",
                minLength: { value: 4, message: "OTP must be 4 characters" },
                maxLength: { value: 4, message: "OTP must be 4 characters" },
              })}
              id="otp"
              type="text"
              placeholder="Enter the OTP"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.seed}
              aria-describedby={errors.seed ? "otp-error" : undefined}
            />
            {errors.seed && (
              <p className="text-white" id="otp-error" role="alert" style={{ fontSize: 12 }}>
                {errors.seed.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="position-relative">
            <label htmlFor="password" style={{ color: "#EF9B28" }} className="d-block">
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                  message:
                    "Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character",
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
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <i className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.password && (
              <p className="text-white" id="password-error" role="alert" style={{ fontSize: 12 }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="position-relative">
            <label htmlFor="confirmedpassword" style={{ color: "#EF9B28" }} className="d-block">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirmed password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              id="confirmedpassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.confirmPassword && (
              <p className="text-white" id="confirm-password-error" role="alert" style={{ fontSize: 12 }}>
                {errors.confirmPassword.message}
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








