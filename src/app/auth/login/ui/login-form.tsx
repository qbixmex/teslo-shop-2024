'use client';

import { FormFields } from "@/components";
import styles from "../../auth.module.css";
import { useFormState } from "react-dom";
import { authenticate } from "@/actions";

const LoginForm = () => {

  const [state, dispatch] = useFormState(authenticate, undefined);

  console.log("============== STATE ==============");
  console.log("STATE:", state);
  console.log("===================================");

  return (
    <form action={dispatch}>

      <FormFields />

      <section>
        <button
          type="submit"
          className={`btn-primary ${styles['btn--extras']}`}
        >Login</button>
      </section>
    </form>
  );
};

export default LoginForm;
