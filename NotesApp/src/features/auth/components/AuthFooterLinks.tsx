import { View, Text } from 'react-native';
import React from 'react';
import TextLink from './TextLink';

type AuthFooterLinksProps = {
  onForgot?: () => void;
  onSignup?: () => void;
};

const AuthFooterLinks = ({ onForgot, onSignup }: AuthFooterLinksProps) => {
  return (
    <View className="w-full items-center justify-center gap-5">
      <TextLink linkTitle="Forgot password?" textClassName="font-medium" onPress={onForgot} />
      <View className="flex-row gap-2">
        <Text className="font-medium text-body color-neutral-500">Don't have an account?</Text>
        <TextLink linkTitle="Sign up" onPress={onSignup} />
      </View>
    </View>
  );
};

export default AuthFooterLinks;
