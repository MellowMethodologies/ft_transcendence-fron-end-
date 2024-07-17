"use client"
import React, { useState } from 'react'
import classes from './page.module.css'
import playerSigningInImage from "../../public/image 1.png"
import Image from 'next/image'
import Link from 'next/link'
import { z } from 'zod'

// Define the validation schema using zod
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

type Errors ={
  email: string;
  password:string
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({ email: "", password: "" });

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const errorMessages = result.error.flatten().fieldErrors;
      setErrors({
        email: errorMessages.email ? errorMessages.email[0] : "",
        password: errorMessages.password ? errorMessages.password[0] : "",
      });
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const RenderField: React.FC<{ name: keyof Errors; value: string; setValue: React.Dispatch<React.SetStateAction<string>> }> = ({ name, value, setValue }) => (
    <>
      <input
        className={errors[name] ? classes.inputError : classes.input}
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        type={name === "email" ? "email" : "text"}
        value={value}
        onChange={(e) => { setValue(e.target.value); setErrors({ ...errors, [name]: "" }); }}
      />
      <div className={classes.errorMsgContainer}>
        {errors[name] && <p className={classes.errorMsg}>{errors[name]}</p>}
      </div>
    </>
  );

  return (
    <div className={classes.Container}>
      <div className={classes.loginInput}>
        <h1 className={classes.title}>Login</h1>
        <h1 className={classes.desc}>Welcome to the Ping Pong World</h1>
        <p className={classes.welcomeMsg}>Welcome back! Please login to your account.</p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <RenderField name="email" value={email} setValue={setEmail} />
          <RenderField name="password" value={password} setValue={setPassword} />
          <button className={classes.button} type='submit'>Login</button>
        </form>
        <p className={classes.welcomeMsg}>
          If you don't have an account <Link href="/" className={classes.signUp}>SignUp</Link>
        </p>
      </div>
      <div className={classes.loginImage}>
        <Image src={playerSigningInImage} className={classes.PlayerSigningInStyle} alt="Player Signing In" />
      </div>
    </div>
  )
}

export default Login
