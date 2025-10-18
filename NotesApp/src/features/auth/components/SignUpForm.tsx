import React, { useState } from 'react';
import {
  EmailField,
  PasswordField,
  GradientButton,
  FormMessage,
  AuthFooterLinks,
  AuthCard,
} from '../components';
import { FieldError, TextField } from '@shared/ui';
import type { AuthFooterLinksProps } from './AuthFooterLinks';
import { useRegister } from '../hooks';
import { z } from 'zod';

type FieldName = 'username' | 'email' | 'password' | 'password_confirmation';
type FieldErrors = Partial<Record<FieldName, string>>;

const registerSchema = z
  .object({
    username: z.string().trim().min(1, 'Username is required.'),
    email: z.string().trim().email('Enter a valid email.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    password_confirmation: z.string().min(6, 'Confirm your password with at least 6 characters.'),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        code: 'custom',
        path: ['password_confirmation'],
        message: 'Passwords do not match.',
      });
    }
  });

type SignUpFormProps = {
  footer?: Omit<AuthFooterLinksProps, 'forgot' | 'variant'>;
};

const SignUpForm = ({ footer }: SignUpFormProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const { mutate, isPending } = useRegister();

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = () => {
    if (isPending) return;

    const result = registerSchema.safeParse({
      username,
      email,
      password,
      password_confirmation: confirmation,
    });

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (typeof key === 'string') {
          nextErrors[key as FieldName] = issue.message;
        }
      }
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    mutate(result.data);
  };

  return (
    <AuthCard pad="lg" gap="md">
      <FormMessage title="Create Account" subtitle="Sign up to start taking notes" />
      <TextField
        label="Username"
        placeholder="Enter username"
        value={username}
        onChangeText={(value) => {
          clearFieldError('username');
          setUsername(value);
        }}
        autoCorrect={false}
      />
      <FieldError message={fieldErrors.username} />
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
      <PasswordField
        label="Confirm Password"
        placeholder="Enter your password"
        value={confirmation}
        onChangeText={(value) => {
          clearFieldError('password_confirmation');
          setConfirmation(value);
        }}
      />
      <FieldError message={fieldErrors.password_confirmation} />

      <GradientButton
        title={isPending ? 'Creating account...' : 'Create Account'}
        onPress={handleSubmit}
      />
      <AuthFooterLinks variant={'signup'} {...footer} />
    </AuthCard>
  );
};

export default SignUpForm;
