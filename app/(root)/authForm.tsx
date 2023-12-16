"use client"
import React, { useState } from "react"
import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { CircleDashedIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formLogin, setFormLogin] = useState({
    karyawanId: "",
    password: ""
  })
  const [errorMessage, setErrorMessage] = useState("");

  // login
  const handleLogin = async () => {
      setLoading(true)
      if(formLogin.karyawanId.length < 3) {
        setErrorMessage("karyawan id salah atau terlalu pendek")
      } else if (formLogin.password.length < 2) {
        setErrorMessage("password terlalu pendek")
      }
      const LOGIN = await signIn('credentials', {
        karyawanId: formLogin.karyawanId,
        password: formLogin.password,
        redirect: false
      });

      if(LOGIN?.error) {
        toast({
          title: 'terjadi kesalahan saat login',
          variant: 'destructive'
        });
        setLoading(false)
      } else {
        router.push('/dashboard')
      }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="sr-only" htmlFor="idk">
              ID Karyawan
            </label>
            <Input
              placeholder="masukan ID"
              type="text"
              autoCapitalize="none"
              autoComplete="id"
              autoCorrect="off"
              disabled={loading}
              value={formLogin.karyawanId}
              onChange={(e) => {
                setFormLogin((prev) => ({
                  ...prev,
                  karyawanId: e.target.value
                }))
              }}
            />
          </div>

          <div className="grid gap-1">
            <label className="sr-only" htmlFor="email">
              Password
            </label>
            <Input
              placeholder="masukan password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              required
              disabled={loading}
              value={formLogin.password}
              onChange={(e) => {
                setFormLogin((prev) => ({
                  ...prev,
                  password: e.target.value
                }))
              }}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-xs">
              {errorMessage}
            </p>
          )}
          <Button disabled={loading}>
            {loading && (
              <CircleDashedIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {loading ? "Loading..." : "Masuk"}
          </Button>
        </div>
      </form>
    </div>
  )
}