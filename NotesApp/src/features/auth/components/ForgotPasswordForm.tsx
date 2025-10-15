import React from 'react';
import { EmailField, GradientButton, FormMessage, AuthFooterLinks, AuthCard } from '../components';
import type { AuthFooterLinksProps } from './AuthFooterLinks';

export type ForgotPasswordFormProps = {
  footer?: Omit<AuthFooterLinksProps, 'variant'>;
};

const ForgotPasswordForm = ({ footer }: ForgotPasswordFormProps) => {
  return (
    <AuthCard pad="lg" gap="md">
      <FormMessage
        title="Forgot password?"
        subtitle="Enter your email and we'll send you reset instructions"
      />
      <EmailField label="Email" placeholder="Enter your email" />
      <GradientButton title="Send Reset Instructions" />
      <AuthFooterLinks variant={'forgotpassword'} {...footer} />
    </AuthCard>
  );
};

export default ForgotPasswordForm;
