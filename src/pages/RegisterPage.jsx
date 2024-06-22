// Register.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Card, Message, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaKey, FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import InputLabel from "../components/inputs/InputLabel";
import { Button } from "../components/buttons/Button";
import { RiLoginCircleFill } from "react-icons/ri";
import { LoginWith } from "../components/LoginWith";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    console.log("Form value: ", value);
    await signup(value);
  };

  const [timeoutId, setTimeoutId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setShowConfirmPassword(false);
    }, 1000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center w-full">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-3xl font-bold flex justify-center items-center p-2">
          Register
        </h1>

        <Label htmlFor="username" for="username">
          Username
        </Label>
        <InputLabel
          id="username"
          label=""
          register={register}
          errors={errors}
          required
          type="text"
          Icon={FaUserCheck}
          placeholder="mariosalazar.ms.10"
        />
        {errors.username?.message && (
          <p className="text-red-500">{errors.username?.message}</p>
        )}

        <Label htmlFor="email">Email</Label>
        <InputLabel
          id="email"
          label=""
          register={register}
          errors={errors}
          required
          type="email"
          Icon={MdEmail}
          placeholder="mariosalazar@gmail.com"
        />
        {errors.email?.message && (
          <p className="text-red-500">{errors.email?.message}</p>
        )}

        <Label htmlFor="password">Password</Label>
        <InputLabel
          id="password"
          label=""
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
        {errors.password?.message && (
          <p className="text-red-500">{errors.password?.message}</p>
        )}

        <Label htmlFor="confirmPassword">Confirm Password:</Label>
        <InputLabel
          id="confirmPassword"
          label=""
          register={register}
          errors={errors}
          required
          type="password"
          placeholder="**************"
          onChange={handleChangeConfirmPassword}
          onIconClick={toggleConfirmPasswordVisibility}
          showPassword={showConfirmPassword}
          Icon={
            confirmPassword.length == 0
              ? FaKey
              : !showConfirmPassword && confirmPassword.length > 0
              ? FaEye
              : FaEyeSlash
          }
        />
        {errors.confirmPassword?.message && (
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        )}

        <div className="flex justify-center items-center p-1 mt-3">
          <Button
            label="Log In"
            onClick={handleSubmit(onSubmit)}
            Icon={RiLoginCircleFill}
          />
        </div>

        <div className="flex justify-center items-center w-full p-3">
          <div className="w-full flex justify-center">
            Already Have an Account?
          </div>
          <div className="w-full flex justify-center">
            <Link
              className="text-sky-500 flex justify-end font-bold hover:text-fuchsia-700"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
        <LoginWith />
      </Card>
    </div>
  );
}

export default Register;
