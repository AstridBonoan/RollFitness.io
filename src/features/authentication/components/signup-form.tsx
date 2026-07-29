"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  signUpAction,
  type AuthActionState,
} from "@/features/authentication/actions/auth";
import {
  FieldError,
  FormMessage,
} from "@/features/authentication/components/auth-shell";
import {
  signupSchema,
  type SignupInput,
} from "@/features/authentication/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (state.error) {
      setError("root", { message: state.error });
    }
  }, [state.error, setError]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <FormMessage error={state.error ?? errors.root?.message} />

      <div>
        <Label htmlFor="displayName">Display name</Label>
        <Input
          id="displayName"
          type="text"
          autoComplete="name"
          className="mt-2"
          aria-invalid={Boolean(errors.displayName)}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
          {...register("displayName")}
        />
        <FieldError
          id="displayName-error"
          message={errors.displayName?.message}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          className="mt-2"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <FieldError id="email-error" message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          className="mt-2"
          aria-invalid={Boolean(errors.password)}
          aria-describedby={
            errors.password ? "password-error" : "password-hint"
          }
          {...register("password")}
        />
        <p id="password-hint" className="mt-1.5 text-sm text-muted-foreground">
          At least 8 characters.
        </p>
        <FieldError id="password-error" message={errors.password?.message} />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          className="mt-2"
          aria-invalid={Boolean(errors.confirmPassword)}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
          {...register("confirmPassword")}
        />
        <FieldError
          id="confirmPassword-error"
          message={errors.confirmPassword?.message}
        />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
