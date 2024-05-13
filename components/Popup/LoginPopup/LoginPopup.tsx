import { authActions } from "@/Redux/Reducers/authReducer";
import { SVGIcon } from "@/components/Icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
interface passwordItem {
  eye: string;
  eye_off: string;
}

interface checkboxItem {
  name: string;
  label: string;
}

interface InputItem {
  name: string;
  placeholder: string;
  label: string;
  icon: string;
}

interface LoginPopupProps {
  email: InputItem;
  password: InputItem;
  button: string;
  password_protection: passwordItem;
  checkbox: checkboxItem;
}

export const LoginPopup: React.FC<LoginPopupProps> = ({
  email,
  password,
  button,
  password_protection,
  checkbox,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    const fakeCredentials = [
      {
        email: "admin",
        password: "123",
        username: "admin",
        role: "admin",
      },
      {
        email: "user",
        password: "123",
        username: "user",
        role: "user",
      },
    ];

    const { email, password } = data;

    const user = fakeCredentials.find(
      (cred) => cred.email === email && cred.password === password
    );
    if (user) {
      if (user.role === "admin") {
        localStorage.setItem("token", "admin");
        dispatch(authActions.SET_ADMIN({ is_admin: true }));
      } else if (user.role === "user") {
        localStorage.setItem("token", "user");
        dispatch(authActions.SET_ADMIN({ is_admin: false }));
      } else {
        alert("Invalid email or password");
        dispatch(authActions.SET_ADMIN({ is_admin: false }));
      }
      reset();
      window.location.reload();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" mb-5 mt-3 space-y-4">
      <div className="email_field">
        <Controller
          name={email.name}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="space-y-2">
              <label className="text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left">
                {email.label}
              </label>
              <span className="input-border flex items-center border rounded-md border-solid border-[#BEBEBE] px-2.5">
                <SVGIcon className="text-sm text-[#9D9D9D]" name={email.icon} />
                <input
                  type="text"
                  className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                  placeholder={email.placeholder}
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                />
              </span>
            </div>
          )}
        />
        <div className="mt-[10px]">
          {errors[email.name] && (
            <span className="text-[red] text-sm">
              Please Enter {email.placeholder}
            </span>
          )}
        </div>
      </div>
      <div className="password_field">
        <Controller
          name={password.name}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="space-y-2">
              <label className="text-[#777777] text-[12px] font-medium leading-[21px] tracking-[0px] text-left">
                {password.label}
              </label>
              <span className="input-border flex items-center border rounded-md border-solid border-[#BEBEBE] px-2.5">
                <SVGIcon
                  className="text-sm text-[#9D9D9D]"
                  name={password.icon}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control w-full border-none rounded-md focus:outline-none focus:shadow-none shadow-none h-[50px] placeholder:text-[#9D9D9D] text-[14px] px-3"
                  placeholder={password.placeholder}
                  autoComplete="off"
                  value={value}
                  onChange={onChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <SVGIcon
                    name={
                      showPassword
                        ? password_protection.eye_off
                        : password_protection.eye
                    }
                  />
                </button>
              </span>
            </div>
          )}
        />
        <div className="mt-[10px]">
          {errors[password.name] && (
            <span className="text-[red] text-sm">
              Please Enter {password.placeholder}
            </span>
          )}
        </div>
      </div>
      <div className="checkbox_field">
        <Controller
          name={checkbox.name}
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <div className="space-y-2">
              <span className="flex gap-3">
                <input
                  type="checkbox"
                  autoComplete="off"
                  value={value}
                  id={checkbox.name}
                  onChange={onChange}
                />
                <label htmlFor={checkbox.name} className="text-sm">
                  {checkbox.label}
                </label>
              </span>
            </div>
          )}
        />
        <div className="mt-[10px]">
          {errors[checkbox.name] && (
            <span className="text-[red] text-sm my-2">
              Please {checkbox.label}
            </span>
          )}
        </div>
      </div>
      <button className="text-[15px] bg-secondary rounded-[12px] text-white w-full px-5 py-2.5 mt-3">
        {button}
      </button>
    </form>
  );
};
