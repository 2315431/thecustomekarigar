"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { loginAction } from "./action";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);
    setError("");

    const res = await loginAction(formData);

    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/assets/bg-texture.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/assets/logo.png"
            alt="The Custom कारिगर"
            width={200}
            height={67}
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="font-playfair text-3xl text-[#6A0F16] font-bold">
            Admin Login
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-800 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <form
          action={handleSubmit}
          className="bg-[#F5E6D3] border-2 border-[#6A0F16] rounded-lg p-8 shadow-lg"
          style={{
            backgroundImage: "url('/assets/bg-texture.jpg')",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
          }}
        >
          <div className="space-y-6">
            <div>
              <label className="block text-[#6A0F16] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16]"
              />
            </div>

            <div>
              <label className="block text-[#6A0F16] font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-[#6A0F16]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6A0F16] text-[#F5E6D3] rounded-full px-8 py-4 text-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
