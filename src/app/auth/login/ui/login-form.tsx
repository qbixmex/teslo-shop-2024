'use client';

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import clsx from "clsx";
import { authenticate } from "@/actions";
import { Alert } from "@/components";
import styles from "../../auth.module.css";
import formFields from "@/app/auth/form-fields.module.css";

const LoginForm = () => {

  const [ state, dispatch ] = useFormState(authenticate, undefined);
  const [ isPasswordVisible, setPasswordIsVisible ] = useState(false);

  useEffect(() => {
    if (state === "Signin Successful") {
      window.location.replace('/');
    }
  }, [state]);

  const handleVisibly = () => {
    return setPasswordIsVisible(prev => !prev);
  };

  return (
    <>
      {state === "Credentials Sign in failed !" && (
        <Alert type="error" withIcon>Invalid Credentials</Alert>
      )}

      <form action={dispatch}>
        <section className={formFields.group}>
          <label className={formFields.label} htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className={formFields.field}
            autoComplete="off"
          />
        </section>

        <section className={formFields.group}>
          <label htmlFor="password" className={formFields.label}>
            password
          </label>
          <input
            id="password"
            name="password"
            type={ isPasswordVisible ? 'text' : 'password' }
            required
            className={formFields.field}
            autoComplete="off"
          />
          {
            (isPasswordVisible)
              ? <IoEye onClick={handleVisibly} className={formFields.fieldIcon} />
              : <IoEyeOff onClick={handleVisibly} className={formFields.fieldIcon} />
          }
        </section>

        <LoginButton />

      </form>
    </>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <section>
      <button
        type="submit"
        className={clsx(`btn-primary ${styles.btnExtras}`, {
          "btn-disabled": pending,
        })}
        disabled={pending}
      >{pending ? 'Checking ...' : 'Login'}</button>
    </section>
  );
};

export default LoginForm;
