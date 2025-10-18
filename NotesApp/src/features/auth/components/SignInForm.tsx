import React, { useState } from 'react';
import { Text } from 'react-native';
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

export type SignInFormProps = {
  footer?: Omit<AuthFooterLinksProps, 'variant'>;
};

const SignInForm = ({ footer }: SignInFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, error } = useLogin();

  return (
    <AuthCard pad="lg" gap="md">
      <FormMessage title="Welcome back" subtitle="Sign in to access your notes" />
      <EmailField
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <PasswordField
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
      />
      <GradientButton
        title={isPending ? 'Signing in...' : 'Sign in'}
        onPress={() => mutate({ email, password })}
      />
      <AuthFooterLinks variant={'signin'} {...footer} />
    </AuthCard>
  );
};

export default SignInForm;
