"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FiMail,
  FiLock,
  FiLogIn,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  useEffect(() => {
    // Check if user was redirected from registration
    const registered = searchParams.get("registered");
    if (registered === "true") {
      setSuccess(
        "Registration successful! Please sign in with your new account."
      );
    }

    // Check if there was an error during login
    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          setError("Invalid email or password. Please try again.");
          break;
        default:
          setError("An error occurred during sign in. Please try again.");
          break;
      }
    }
  }, [searchParams]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, this would call the NextAuth signIn method
      // For this demo, simulate a successful login after a delay
      console.log("Login data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, redirect to home
      // In a real app with NextAuth:
      // const result = await signIn('credentials', {
      //   redirect: false,
      //   email: data.email,
      //   password: data.password,
      // });

      // if (result?.error) {
      //   setError('Invalid email or password');
      // } else {
      //   router.push('/dashboard');
      // }

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-foreground">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-primary hover:text-primary-dark">
            Sign up
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm flex items-start">
              <FiAlertCircle className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-success/10 border border-success/20 rounded-md text-success text-sm flex items-start">
              <FiCheckCircle className="mr-2 mt-0.5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-muted-foreground" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`form-input pl-10 ${
                    errors.email ? "border-error focus:ring-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-muted-foreground" />
                </div>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={`form-input pl-10 ${
                    errors.password ? "border-error focus:ring-error" : ""
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-muted-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/auth/forgot-password"
                  className="text-primary hover:text-primary-dark">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex justify-center">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FiLogIn className="mr-2" />
                    Sign in
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => {
                  // In a real app: signIn('google')
                  console.log("Google sign in clicked");
                }}>
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor">
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.879-1.754-4.387-2.825-7.123-2.825-5.809 0-10.517 4.708-10.517 10.517s4.708 10.517 10.517 10.517c8.967 0 10.9-8.539 10.051-12.576h-9.663z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-background text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => {
                  // In a real app: signIn('facebook')
                  console.log("Facebook sign in clicked");
                }}>
                <svg
                  className="h-5 w-5 mr-2 text-[#4267B2]"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
