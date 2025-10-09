import React from 'react';
import {
  EmailField,
  PasswordField,
  GradientButton,
  AppBrand,
  FormMessage,
  AuthFooterLinks,
  AuthCard,
} from '../components';
import { Screen } from '@shared/components';

const AuthScreen = () => {
  return (
    <Screen pad="lg" gap="xl">
      <AppBrand brandTitle="Notes App" tagline="Your thoughts, organized beautifully" />
      <AuthCard pad="lg" gap="md">
        <FormMessage title="Welcome back" subtitle="Sign in to access your notes" />
        <EmailField label="Email" placeholder="Enter your email" />
        <PasswordField label="Password" placeholder="Enter your password" />
        <GradientButton title="Sign In" />
        <AuthFooterLinks />
      </AuthCard>
    </Screen>
  );
};

export default AuthScreen;
