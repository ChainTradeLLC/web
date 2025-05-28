'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.scss';
import { Button } from '@/components/ui/button';
import { Checkbox, CheckboxField } from '@/components/ui/checkbox';
import { Field, Label } from '@/components/ui/fieldset';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Strong, Text, TextLink } from '@/components/ui/text';
import Image from 'next/image';

export default function Login() {
    const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Session data:', status);
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm grid-cols-1 gap-8">
      <Link href="/" className={`${styles.logo}`}>
                  <Image
                    alt="ChainTrade Logo"
                    src="/main-2.png"
                    fill
                    style={{
                      objectFit: 'cover',
                  }}
                    className=""
                  />
                </Link>
      <Heading>Sign in to your account</Heading>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <Field>
        <Label>Email</Label>
        <Input type="email" value={email}
            onChange={(e) => setEmail(e.target.value)} name="email" required />
      </Field>
      <Field>
        <Label>Password</Label>
        <Input type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} name="password" required />
      </Field>
      <div className="flex items-center justify-between">
        <CheckboxField>
          <Checkbox name="remember" />
          <Label>Remember me</Label>
        </CheckboxField>
        <Text>
          <TextLink href="#">
            <Strong>Forgot password?</Strong>
          </TextLink>
        </Text>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Text>
        Don’t have an account?{' '}
        <TextLink href="/register">
          <Strong>Sign up</Strong>
        </TextLink>
      </Text>
    </form>
  </>
  );
}