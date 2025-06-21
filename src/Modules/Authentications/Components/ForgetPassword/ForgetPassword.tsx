import { useForm } from "react-hook-form";
import photo from "../../../../assets/images/th.jpeg";
import { EMAIL_VALIDATION } from "../../../../Services/Validation";
import type { FormForgetProps } from "../../../../Interfaces/Interfaces";
import { useState } from "react";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTHENTICATION_URL } from "../../../../Services/URL";
import axiosInstance from "../../../../Services/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormForgetProps>({ mode: "onChange" });

  async function forgetPassword(info: FormForgetProps) {
    const toastId = toast.loading("Waiting....");
    try {
      const options = {
        url: AUTHENTICATION_URL.FORGOT_PASSWORD,
        method: "POST",
        data: info,
      };
      const { data } = await axiosInstance.request(options);
      toast.success(data.message || "Check your email for OTP");
      setErrorMessage(null);
      setTimeout(() => {
        navigate("/reset-password", { state: { email: watch("email") } });
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

  return (
    <main className="rounded-2 py-2 px-4" aria-label="Forget Password Page">
      <section className="text mt-3" aria-labelledby="forget-heading">
        <p className="mb-0 text-white" style={{ fontSize: 10 }}>
          Welcome to PMS
        </p>
        <h1 id="forget-heading" className="h4 fw-bold" style={{ color: "#EF9B28" }}>
          Forget Password
        </h1>
      </section>

      <div className="img text-center">
        <img
          src={photo}
          alt="Password recovery"
          width={60}
          height={60}
          className="rounded-circle"
        />
      </div>

      <form
        className="row mt-2 py-3"
        onSubmit={handleSubmit(forgetPassword)}
        noValidate
        aria-describedby="forget-instructions"
      >
        <fieldset className="col-md-12">
          <legend className="visually-hidden">Forget Password Form</legend>

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
              placeholder="Enter Your Email"
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
        </fieldset>

        {errorMessage && (
          <p className="text-center text-white mt-2" role="alert">
            {errorMessage}
          </p>
        )}

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
