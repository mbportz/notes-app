import React, { useState } from 'react';
import { AppBrand, SignInForm, SignUpForm, ForgotPasswordForm } from '../components';
import { Screen } from '@shared/ui';

type authView = 'signin' | 'signup' | 'forgot-password';

const AuthScreen = () => {
  const [form, setForm] = useState<authView>('signin');

  return (
    <Screen pad="lg" gap="xl" scroll>
      <AppBrand
        brandTitle="Notes App"
        tagline="Your thoughts, organized beautifully"
        size="lg"
        containerClassName="w-full items-center"
        taglineClassName="text-center"
      />
      {(() => {
        switch (form) {
          case 'signup':
            return <SignUpForm footer={{ variantAction: () => setForm('signin') }} />;
          case 'signin':
            return (
              <SignInForm
                footer={{
                  variantAction: () => setForm('signup'),
                  forgot: { onPress: () => setForm('forgot-password') },
                }}
              />
            );
          case 'forgot-password':
            return <ForgotPasswordForm footer={{ variantAction: () => setForm('signin') }} />;
          default:
            return null; // or a fallback UI
        }
      })()}
    </Screen>
  );
};

export default AuthScreen;
