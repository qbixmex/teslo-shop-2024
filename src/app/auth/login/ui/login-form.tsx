'use client';

import { Alert, FormFields } from "@/components";
import styles from "../../auth.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/actions";
import clsx from "clsx";
import { useEffect } from "react";

const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);


  useEffect(() => {
    if (state === "Signin Successful") {
      window.location.replace('/');
    }
  }, [state]);

  return (
    <>
      
      {state === "Credentials Sign in failed !" && (
        <Alert type="error" withIcon>Invalid Credentials</Alert>
      )}

      <form action={dispatch}>

        <FormFields />

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
