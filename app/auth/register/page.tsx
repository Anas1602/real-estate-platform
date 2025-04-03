"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiUser, FiMail, FiLock, FiHome, FiCheckCircle } from "react-icons/fi";

// Form validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["BUYER", "DEVELOPER"]),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "BUYER",
      agreeToTerms: false,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // In a real app, you would integrate with your auth service here
      console.log("Registration data:", data);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo, just redirect to login page
      router.push("/auth/login?registered=true");
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-muted/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-foreground">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:text-primary-dark">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-border">
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-md text-error text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground">
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-muted-foreground" />
                </div>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`form-input pl-10 ${
                    errors.name ? "border-error focus:ring-error" : ""
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-error">{errors.name.message}</p>
              )}
            </div>

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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-muted-foreground" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                  className={`form-input pl-10 ${
                    errors.confirmPassword
                      ? "border-error focus:ring-error"
                      : ""
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                I am registering as a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    selectedRole === "BUYER"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                  onClick={() => document.getElementById("roleBuyer")?.click()}>
                  <FiUser
                    className={`text-2xl mb-2 ${
                      selectedRole === "BUYER"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div className="text-center">
                    <div className="font-medium">Buyer</div>
                    <div className="text-xs text-muted-foreground">
                      Looking to purchase
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="roleBuyer"
                    value="BUYER"
                    {...register("role")}
                    className="sr-only"
                  />
                </div>

                <div
                  className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                    selectedRole === "DEVELOPER"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                  onClick={() =>
                    document.getElementById("roleDeveloper")?.click()
                  }>
                  <FiHome
                    className={`text-2xl mb-2 ${
                      selectedRole === "DEVELOPER"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <div className="text-center">
                    <div className="font-medium">Developer</div>
                    <div className="text-xs text-muted-foreground">
                      Selling properties
                    </div>
                  </div>
                  <input
                    type="radio"
                    id="roleDeveloper"
                    value="DEVELOPER"
                    {...register("role")}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                type="checkbox"
                {...register("agreeToTerms")}
                className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-sm text-muted-foreground">
                I agree to the{" "}
                <Link
                  href="/terms-of-service"
                  className="text-primary hover:text-primary-dark">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:text-primary-dark">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-error">
                {errors.agreeToTerms.message}
              </p>
            )}

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
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FiCheckCircle className="mr-2" />
                    Create Account
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
