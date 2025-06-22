import styles from "./Register.module.css"
import { useForm } from "react-hook-form";
import photo from "../../../../assets/images/register-img.png";
import { EMAIL_VALIDATION } from "../../../../Services/Validation";
import type { FormInfo } from "../../../../Interfaces/Interfaces";
import { useCallback, useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import { AUTHENTICATION_URL } from "../../../../Services/URL";
import axiosInstance from "../../../../Services/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";

const countriesList = Object.values(countries)
  .map((country) => ({ Countryname: country.name, countryPhone: country.phone[0] }))
  .sort((a, b) => a.Countryname.localeCompare(b.Countryname));

export default function Register() {
  const [phonePrefix, SetphonePrefix] = useState<string | number>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputeValue = useRef<HTMLInputElement | null>(null)
  const [reviewImage , setReviewImage] = useState< string | null>(photo)
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<FormInfo>({ mode: "onChange", defaultValues: { country: "" } });



function convertDataIntoFormData(data:FormInfo){

const formData = new FormData()
formData.append("userName",data.userName)
formData.append("email",data.email)
formData.append("password",data.password)
formData.append("confirmPassword",data.confirmPassword)
formData.append("country",data.country)
formData.append("phoneNumber",data.phoneNumber)
if(data.profileImage){
  formData.append("profileImage",data.profileImage)

}

return formData

}








  async function registerEmploye(info: FormInfo) {
    const toastId = toast.loading("Waiting....");


    const formData = convertDataIntoFormData(info)

    try {
      const options = {
        url: AUTHENTICATION_URL.REGISTER,
        method: "POST",
        data: formData,
      };
      const { data } = await axiosInstance.request(options);
      if (
        data.message ===
        "Account created successfully. A verification code has been sent to your email address."
      ) {
        setErrorMessage(null);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/verify-account", { state: { email: watch("email") } });
        }, 2000);
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

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "password") trigger("confirmPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const selectedCountry = watch("country");

  const handleChangePrefix = useCallback(() => {
    const phone = countriesList.find((pre) => pre.Countryname === selectedCountry);
    SetphonePrefix(phone ? phone.countryPhone : "");
  }, [selectedCountry]);

  useEffect(() => {
    handleChangePrefix();
  }, [selectedCountry, handleChangePrefix]);


// handle imge and input preview
function handleFocusImge(){
  fileInputeValue.current?.click()
}

const watchImage = watch("profileImage")

useEffect(()=>{
if(watchImage instanceof File){
    const previewUrl = URL.createObjectURL(watchImage)
setReviewImage(previewUrl)

return ()=> URL.revokeObjectURL(previewUrl)

}


},[watchImage])









  return (
    <main className="rounded-2 py-2 px-4" aria-label="Register Page">
      <section className="text mt-3" aria-labelledby="register-heading">
        <p className="mb-0 text-white" style={{ fontSize: 10 }}>
          Welcome to PMS
        </p>
        <h1 id="register-heading" className="h4 fw-bold" style={{ color: "#EF9B28" }}>
          Create New Account
        </h1>
      </section>
    
      <form className="row mt-2 py-3" onSubmit={handleSubmit(registerEmploye)} noValidate>

{/*  input and Image */}
  <div className={`img text-center`}>
    <input
    {...register("profileImage",{
      onChange(e) {
        const file = e.target.files[0]
        setValue("profileImage",file)
      },
    })}
    
    ref={fileInputeValue} accept="image/*" style={{appearance:"none"}} className="d-none" type="file" />
        <img onClick={handleFocusImge} src={reviewImage || photo} alt="User profile" width={60} height={60} className={`rounded-circle ${styles.previewImge}`} />
      </div>


        {/* Left Column */}
        <fieldset className="col-md-6">
          <legend className="visually-hidden">Personal Details</legend>
          {/* UserName */}
          <div className="mb-3">
            <label htmlFor="userName" className="d-block" style={{ color: "#EF9B28" }}>
              User Name
            </label>
            <input
              {...register("userName", {
                required: "User Name Is Required",
                minLength: { value: 4, message: "Minimum 4 characters" },
                maxLength: { value: 8, message: "Maximum 8 characters" },
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9]*\d$/,
                  message: "Must end with numbers without spaces",
                },
              })}
              id="userName"
              type="text"
              placeholder="Enter Your Name"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
              aria-invalid={!!errors.userName}
              aria-describedby="userName-error"
            />
            {errors.userName && (
              <p id="userName-error" className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.userName.message}
              </p>
            )}
          </div>
          {/* Country */}
          <div className="mb-3">
            <label htmlFor="country" className="d-block" style={{ color: "#EF9B28" }}>
              Country
            </label>
            <select
              {...register("country", { required: "You Must Choose Your Country" })}
              id="country"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
            >
              <option disabled value="">
                Select Your Country
              </option>
              {countriesList.map((country) => (
                <option key={country.Countryname} value={country.Countryname}>
                  {country.Countryname}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.country.message}
              </p>
            )}
          </div>
          {/* Password */}
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
                    "Minimum 8 chars, with upper/lowercase, number, and special character",
                },
              })}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
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
              <p className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.password.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* Right Column */}
        <fieldset className="col-md-6">
          <legend className="visually-hidden">Contact Info</legend>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="d-block" style={{ color: "#EF9B28" }}>
              E-mail
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: EMAIL_VALIDATION, message: "Email must be valid" },
              })}
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
            />
            {errors.email && (
              <p className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Phone */}
          <div className="mb-3">
            <label htmlFor="phone" className="d-block" style={{ color: "#EF9B28" }}>
              Phone
            </label>
            <div className="d-flex gap-1 align-items-center bg-transparent">
              <span className="d-inline-block text-white">{phonePrefix}</span>
              <input
                {...register("phoneNumber", {
                  required: "Phone is required",
                  minLength: { value: 10, message: "At least 10 digits" },
                  pattern: { value: /^\d+$/, message: "Digits only" },
                })}
                id="phone"
                type="text"
                placeholder="Enter Your Phone"
                className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
                style={{ outline: 0 }}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          {/* Confirm Password */}
          <div className="position-relative">
            <label htmlFor="confirmedpassword" className="d-block" style={{ color: "#EF9B28" }}>
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Confirmed Password is required",
                validate: (value) => value === watch("password") || "Passwords do not match",
              })}
              id="confirmedpassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Your Password"
              className="border-0 border-1 border-bottom bg-transparent p-1 w-100"
              style={{ outline: 0 }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="btn btn-sm position-absolute end-0 top-50 translate-middle-y text-white"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
            </button>
            {errors.confirmPassword && (
              <p className="text-white" role="alert" style={{ fontSize: 12 }}>
                {errors.confirmPassword.message}
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
          {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
        </button>
      </form>
      <Link className="text-white text-decoration-none fw-bolder" to="/login"> login ?</Link>
    </main>
  );
}







