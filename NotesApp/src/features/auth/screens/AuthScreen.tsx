import React, { useState } from 'react';
import { AppBrand, SignInForm, SignUpForm } from '../components';
import { Screen } from '@shared/ui';

type authView = 'signin' | 'signup';

const AuthScreen = () => {
  const [form, setForm] = useState<authView>('signin');

  return (
    <Screen pad="lg" gap="xl" scroll>
      <AppBrand brandTitle="Notes App" tagline="Your thoughts, organized beautifully" />
      {form === 'signup' ? (
        <SignUpForm
          footer={{
            variantAction: () => {
              setForm('signin');
            },
          }}
        />
      ) : (
        <SignInForm
          footer={{
            variantAction: () => {
              setForm('signup');
            },
            forgot: {
              onPress: () => {},
            },
          }}
        />
      )}
    </Screen>
  );
};

export default AuthScreen;
