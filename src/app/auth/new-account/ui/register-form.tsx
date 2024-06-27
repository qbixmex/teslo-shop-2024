"use client";

import { useState } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import styles from '../../auth.module.css';
import formFields from "@/app/auth/form-fields.module.css";
import { Alert } from "@/components";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";

type FormInputs = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const PASSWORDS_VISIBILITY = {
  password: false,
  passwordConfirmation: false,
};

const RegisterForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();
  const [ isVisible, setIsVisible ] = useState(PASSWORDS_VISIBILITY);

  const handleVisibly = (field: 'password' | 'passwordConfirmation') => {
    return setIsVisible(prev => ({
      ...prev,
      password: (field === 'password') && !prev.password,
      passwordConfirmation: (field === 'passwordConfirmation') && !prev.passwordConfirmation
    }));
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { name, email, password } = data;
    console.table({ name, email, password })
  };

  return (
    <>
      {false && (
        <Alert type="error" withIcon>Invalid Credentials</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={formFields.group}>
          <label className={formFields.label} htmlFor="name">Full Name:</label>
          <input
            id="name"
            type="text"
            className={clsx(formFields.field, {
              [formFields.errorField]: !!errors.name
            })}
            autoComplete="off"
            autoFocus
            { ...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must have at least 3 characters'
              }
            })}
          />
          {errors.name && (
            <p className={formFields.errorMessage}>
              * {errors.name.message}
            </p>
          )}
        </section>

        <section className={formFields.group}>
          <label className={formFields.label} htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className={clsx(formFields.field, {
              [formFields.errorField]: !!errors.email
            })}
            autoComplete="off"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Invalid email'
              }
            })}
          />
          {errors.email && (
            <p className={formFields.errorMessage}>
              * {errors.email.message}
            </p>
          )}
        </section>

        <section className={formFields.group}>
          <label htmlFor="password" className={formFields.label}>
            password
          </label>
          <input
            id="password"
            type={isVisible.password ? 'text' : 'password'}
            className={clsx(formFields.field, {
              [formFields.errorField]: !!errors.password
            })}
            autoComplete="off"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters'
              }
            })}
          />
          {
            (isVisible.password)
              ? <IoEye onClick={() => handleVisibly('password')} className={formFields.fieldIcon} />
              : <IoEyeOff onClick={() => handleVisibly('password')} className={formFields.fieldIcon} />
          }
          {errors.password && (
            <p className={formFields.errorMessage}>
              * {errors.password.message}
            </p>
          )}
        </section>

        <section className={formFields.group}>
          <label className={formFields.label} htmlFor="passwordConfirmation">
            Password Confirmation
          </label>
          <input
            type={isVisible.passwordConfirmation ? 'text' : 'password'}
            id="passwordConfirmation"
            className={clsx(formFields.field, {
              [formFields.errorField]: !!errors.passwordConfirmation
            })}
            {...register('passwordConfirmation', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password Confirmation must have at least 6 characters'
              },
              validate: (value, formInputs) => {
                if (value !== formInputs.password) {
                  return 'Passwords must match';
                }
              }
            })}
          />
          {(isVisible.passwordConfirmation)
            ? (
              <IoEye
                onClick={() => handleVisibly('passwordConfirmation')}
                className={formFields.fieldIcon}
              />
            ) : (
              <IoEyeOff
                onClick={() => handleVisibly('passwordConfirmation')}
                className={formFields.fieldIcon}
              />
          )}
          {errors.passwordConfirmation && (
            <p className={formFields.errorMessage}>
              * {errors.passwordConfirmation.message}
            </p>
          )}
        </section>

        <section>
          <button
            type="submit"
            className={`btn-primary ${styles.btnExtras}`}
          >Create Account</button>
        </section>
      </form>
    </>
  );
};

export default RegisterForm;
