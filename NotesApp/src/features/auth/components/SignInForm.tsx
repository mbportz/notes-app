import React from 'react';
import {
  EmailField,
  PasswordField,
  GradientButton,
  FormMessage,
  AuthFooterLinks,
  AuthCard,
} from '../components';
import type { AuthFooterLinksProps } from './AuthFooterLinks';

export type SignInFormProps = {
  footer?: Omit<AuthFooterLinksProps, 'variant'>;
};

const SignInForm = ({ footer }: SignInFormProps) => {
  return (
    <AuthCard pad="lg" gap="md">
      <FormMessage title="Welcome back" subtitle="Sign in to access your notes" />
      <EmailField label="Email" placeholder="Enter your email" />
      <PasswordField label="Password" placeholder="Enter your password" />
      <GradientButton title="Sign In" />
      <AuthFooterLinks variant={'signin'} {...footer} />
    </AuthCard>
  );
};

export default SignInForm;
