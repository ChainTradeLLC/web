"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./register.module.scss";
import { AuthLayout } from "@/src/components/ui/auth-layout";
import { Button } from "@/src/components/ui/button";
import { Checkbox, CheckboxField } from "@/src/components/ui/checkbox";
import { Field, Label } from "@/src/components/ui/fieldset";
import { Heading } from "@/src/components/ui/heading";
import { Input } from "@/src/components/ui/input";
import { Select } from "@/src/components/ui/select";
import { Strong, Text, TextLink } from "@/src/components/ui/text";
import Image from "next/image";

export default function Register() {
  const { data: session, status, update } = useSession();
  //   const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-sm grid-cols-1 gap-8"
      >
        <Link href="/" className={`${styles.logo}`}>
          <Image
            alt="ChainTrade Logo"
            src="/main-2.png"
            fill
            style={{
              objectFit: "cover",
            }}
            className=""
          />
        </Link>
        <Heading>Create your account</Heading>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <Field>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@example.com"
            required
          />
        </Field>
        <Field>
          <Label>Full name</Label>
          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            minLength={4}
            required
          />
        </Field>
        <Field>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </Field>
        <Button type="submit" className="w-full">
          Create account
        </Button>
        <Text>
          Already have an account?{" "}
          <TextLink href="/login">
            <Strong>Sign in</Strong>
          </TextLink>
        </Text>
      </form>
    </>
  );
}
