"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { loginUser } from "@/lib/api/auth"

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/contacts")
    },
  })
}