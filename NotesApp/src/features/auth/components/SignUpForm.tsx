import React from 'react';
import {
  EmailField,
  PasswordField,
  GradientButton,
  FormMessage,
  AuthFooterLinks,
  AuthCard,
} from '../components';
import { TextField } from '@shared/ui';
import type { AuthFooterLinksProps } from './AuthFooterLinks';

type SignUpFormProps = {
  footer?: Omit<AuthFooterLinksProps, 'forgot' | 'variant'>;
};

const SignUpForm = ({ footer }: SignUpFormProps) => {
  return (
    <AuthCard pad="lg" gap="md">
      <FormMessage title="Create Account" subtitle="Sign up to start taking notes" />
      <TextField label="Username" placeholder="Enter username" />
      <EmailField label="Email" placeholder="Enter your email" />
      <PasswordField label="Password" placeholder="Enter your password" />
      <PasswordField label="Confirm Password" placeholder="Enter your password" />
      <GradientButton title="Create Account" />
      <AuthFooterLinks variant={'signup'} {...footer} />
    </AuthCard>
  );
};

export default SignUpForm;
