
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useCallback, useEffect, useRef, useState } from "react";
import { countries } from "countries-list";
import photoPlaceholder from "../../../../assets/images/register-img.png";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../../Services/Validation";
import { baseURL } from "../../../../Services/URL";
import type { ProfileData } from "../../../../Interfaces/Interfaces";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Hooks/useAuth";

const countriesList = Object.values(countries)
  .map((country) => ({ Countryname: country.name, countryPhone: country.phone[0] }))
  .sort((a, b) => a.Countryname.localeCompare(b.Countryname));

export default function UpdateProfile() {
  const [phonePrefix, setPhonePrefix] = useState<string | number>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [reviewImage, setReviewImage] = useState<string | null>(photoPlaceholder);
const navigate = useNavigate()
const {updateProfileInfo,userInfo,fetchUser} = useAuth()



  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ProfileData>({
    mode: "onChange",
    defaultValues: {
      country: userInfo?.country,
      userName: userInfo?.userName,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber,
    },
  });

  const selectedCountry = watch("country");
  const watchImage = watch("profileImage") as File | string | undefined;

  const handleChangePrefix = useCallback(() => {
    const phone = countriesList.find((pre) => pre.Countryname === selectedCountry);
    setPhonePrefix(phone ? phone.countryPhone : "");
  }, [selectedCountry]);

  useEffect(() => {
    handleChangePrefix();
  }, [selectedCountry, handleChangePrefix]);

  function handleFocusImage() {
    fileInputRef.current?.click();
  }

  useEffect(() => {
    const initialImage = userInfo?.imagePath
      ? `${baseURL}/${userInfo.imagePath}`
      : photoPlaceholder;
    setReviewImage(initialImage);
  }, [userInfo?.imagePath]);

  useEffect(() => {
    if (watchImage instanceof File) {
      const previewUrl = URL.createObjectURL(watchImage);
      setReviewImage(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [watchImage]);




useEffect(()=>{
fetchUser()
},[fetchUser])






if(!userInfo) return ""

  return (
    <div   className="position-fixed top-0 bottom-0 start-0 end-0 row justify-content-center align-items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-profile-heading"
      style={{ zIndex: 99999, backgroundColor: '#42696180', overflowY: 'auto', padding: '2rem 1rem' }}>


      <main className="bg-white rounded-4 shadow-lg p-4 mx-auto modal-scrollable position-relative col-md-6">
        <Helmet>
          <title>Update Profile</title>
        </Helmet>

        <button onClick={()=>{navigate(-1)}}  className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close update profile form"></button>

        <h2 className="h4 text-primary fw-bold mb-4" id="register-heading">Update Your Profile</h2>

        <form className="row g-4" onSubmit={handleSubmit((data) => updateProfileInfo(data, () => navigate(-1)))} noValidate>
          <section className="text-center">
            <input
              type="file"
              accept="image/*"
              {...register("profileImage", {
                onChange: (e) => {
                  const file = e.target.files?.[0];
                  if (file) setValue("profileImage", file);
                },
              })}
              ref={fileInputRef}
              className="d-none"
            />
            <button type="button" onClick={handleFocusImage} className="border-0 bg-transparent" aria-label="Upload profile image">
              <img
                src={reviewImage || photoPlaceholder}
                alt="Profile Preview"
                width={80}
                height={80}
                className="rounded-circle shadow object-fit-cover"
              />
            </button>
          </section>

          <fieldset className="col-md-6">
            <legend className="visually-hidden">Personal Information</legend>

            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              id="userName"
              type="text"
              {...register("userName", {
                required: "User Name Is Required",
                minLength: { value: 4, message: "Minimum 4 characters" },
                maxLength: { value: 8, message: "Maximum 8 characters" },
                pattern: {
                  value: /^[A-Za-z]+[A-Za-z0-9]*\d$/,
                  message: "Must end with numbers without spaces",
                },
              })}
              className={`form-control ${errors.userName ? "is-invalid" : ""}`}
              placeholder="Enter Your Name"
              aria-describedby="userName-error"
            />
            {errors.userName && <div id="userName-error" className="invalid-feedback">{errors.userName.message}</div>}

            <label htmlFor="country" className="form-label mt-3">Country</label>
            <select
              id="country"
              {...register("country", { required: "You Must Choose Your Country" })}
              className={`form-select ${errors.country ? "is-invalid" : ""}`}
            >
              <option disabled value="">Select Your Country</option>
              {countriesList.map((country) => (
                <option key={country.Countryname} value={country.Countryname}>{country.Countryname}</option>
              ))}
            </select>
            {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
          </fieldset>

          <fieldset className="col-md-6">
            <legend className="visually-hidden">Contact Information</legend>

            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: EMAIL_VALIDATION, message: "Email must be valid" },
              })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter Your Email"
              aria-describedby="email-error"
            />
            {errors.email && <div id="email-error" className="invalid-feedback">{errors.email.message}</div>}

            <label htmlFor="phone" className="form-label mt-3">Phone</label>
            <div className="input-group">
              <span className="input-group-text">{phonePrefix}</span>
              <input
                id="phone"
                type="text"
                {...register("phoneNumber", {
                  required: "Phone is required",
                  minLength: { value: 10, message: "At least 10 digits" },
                  pattern: { value: /^\d+$/, message: "Digits only" },
                })}
                className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                placeholder="Enter Your Phone"
                aria-describedby="phone-error"
              />
              {errors.phoneNumber && <div id="phone-error" className="invalid-feedback">{errors.phoneNumber.message}</div>}
            </div>

            <label htmlFor="confirmedpassword" className="form-label mt-3">Confirm Password</label>
            <div className="input-group has-validation">
              <input
                id="confirmedpassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", { required: "Confirmed Password is required",pattern:PASSWORD_VALIDATION
                  })}
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                placeholder="Confirm Your Password"
                aria-describedby="confirmPassword-error"
                  autoComplete="new-password"

              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="btn btn-outline-secondary"
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                <i className={`fa-solid ${showConfirmPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
              </button>
              {errors.confirmPassword && <div id="confirmPassword-error" className="invalid-feedback d-block">{errors.confirmPassword.message}</div>}
            </div>
          </fieldset>

          <div className="text-danger text-center mt-3" role="alert">{""}</div>

          <div className="text-center">
            <button type="submit" disabled={isSubmitting} className="btn btn-primary rounded-pill px-4 mt-4 w-75">
              {isSubmitting ? <i className="fa-solid fa-spinner fa-spin"></i> : "Save"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
