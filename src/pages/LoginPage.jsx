import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import InputLabel from "../components/inputs/InputLabel";
import { FaEye, FaEyeSlash, FaKey, FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";
import { Button } from "../components/buttons/Button";
import { LoginWith } from "../components/LoginWith";
import mario from "../images/mario.gif";
import { ToastCustom } from "../components/ui/ToastCustom";

export function LoginPage() {
  const [password, setPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const [timeoutId, setTimeoutId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setShowPassword(false);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      ToastCustom(
        "success",
        "Login successfully!",
        "Message Info",
        "top-right"
      );
      navigate("/tasks");
    }
  }, [isAuthenticated, navigate]);

  console.log("object", isAuthenticated);

  const onSubmit = (data) => {
    signin(data);
  };

  return (
    <div className="h-[calc(100vh-100px)] w-full flex items-center justify-center">
      <Card>
        <h1 className="text-3xl font-bold flex justify-center items-center p-2">
          Sign In
        </h1>
        <div className="flex justify-center items-center">
          <img
            src={mario}
            alt="Mario Salazar"
            className="h-[125px] w-[125px] rounded-e-full rounded-s-full"
          />
        </div>

        <h4 className="font-bold flex justify-center items-center p-2 text-blue-600">
          Enter your login credentials
        </h4>

        <Label htmlFor="email"></Label>
        <InputLabel
          id="email"
          label="Email Address"
          register={register}
          errors={errors}
          required
          type="email"
          Icon={MdEmail}
          placeholder="mariosalazar@gmail.com"
        />

        <p>{errors.email?.message}</p>

        <Label htmlFor="password"></Label>

        <InputLabel
          id="password"
          label="Secret Key"
          register={register}
          errors={errors}
          required
          type="password"
          placeholder="**************"
          onChange={handleChangePassword}
          onIconClick={togglePasswordVisibility}
          showPassword={showPassword}
          Icon={
            password.length == 0
              ? FaKey
              : !showPassword && password.length > 0
              ? FaEye
              : FaEyeSlash
          }
        />
        <p>{errors.password?.message}</p>

        <div className="flex justify-center items-center p-1 mt-2 w-full">
          <Button
            label="Log In"
            onClick={handleSubmit(onSubmit)}
            Icon={RiLoginCircleFill}
          />
        </div>

        <div className="flex justify-center items-center w-full p-3 bg-slate-900 mt-2 rounded-md">
          <div className="w-full flex justify-center">
            Don't have an account?{" "}
          </div>
          <div className="w-full flex justify-center">
            <Link
              className="text-sky-500 flex justify-end font-bold hover:text-fuchsia-700"
              onClick={() => {
                ToastCustom(
                  "error",
                  "User Not found!",
                  "Message Error",
                  "top-right"
                );
              }}
              to="/register"
            >
              Sign up
            </Link>
          </div>
        </div>
        <LoginWith />
      </Card>
    </div>
  );
}
