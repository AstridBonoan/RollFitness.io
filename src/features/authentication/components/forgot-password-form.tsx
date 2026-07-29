"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  forgotPasswordAction,
  type AuthActionState,
} from "@/features/authentication/actions/auth";
import {
  FieldError,
  FormMessage,
} from "@/features/authentication/components/auth-shell";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/features/authentication/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: AuthActionState = {};

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    initialState,
  );

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  useEffect(() => {
    if (state.error) {
      setError("root", { message: state.error });
    }
  }, [state.error, setError]);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <FormMessage
        error={state.error ?? errors.root?.message}
        success={state.success}
      />

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

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Sending link…" : "Send reset link"}
      </Button>
    </form>
  );
}
