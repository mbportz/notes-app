import React, { useState } from 'react';
import {
  EmailField,
  PasswordField,
  GradientButton,
  FormMessage,
  AuthFooterLinks,
  AuthCard,
} from '../components';

import type { AuthFooterLinksProps } from './AuthFooterLinks';
import { useLogin } from '../hooks';
import { FieldError } from '@shared/ui';
import { z } from 'zod';

export type SignInFormProps = {
  footer?: Omit<AuthFooterLinksProps, 'variant'>;
};

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email.'),
  password: z.string().min(1, 'Password is required.'),
});

const SignInForm = ({ footer }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const { mutate, isPending, error } = useLogin();

  const clearFieldError = (field: 'email' | 'password') => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = () => {
    if (isPending) return;

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const next: { email?: string; password?: string } = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key === 'email' || key === 'password') {
          next[key] = issue.message;
        }
      }
      setFieldErrors(next);
      return;
    }

    setFieldErrors({});
    mutate(result.data);
  };

  return (
    <AuthCard pad="lg" gap="md">
      <FormMessage title="Welcome back" subtitle="Sign in to access your notes" />
      <EmailField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={(value) => {
          clearFieldError('email');
          setEmail(value);
        }}
      />
      <FieldError message={fieldErrors.email} />
      <PasswordField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={(value) => {
          clearFieldError('password');
          setPassword(value);
        }}
      />
      <FieldError message={fieldErrors.password} />
      {error ? <FieldError message={(error as Error).message} /> : null}
      <GradientButton title={isPending ? 'Signing in...' : 'Sign in'} onPress={handleSubmit} />
      <AuthFooterLinks variant={'signin'} {...footer} />
    </AuthCard>
  );
};

export default SignInForm;
