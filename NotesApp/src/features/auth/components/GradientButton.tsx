import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import themeColors from '@shared/theme/colors.json';

type GradientButtonProps = {
  title: string;
};

const GradientButton = ({ title }: GradientButtonProps) => {
  return (
    <TouchableOpacity
      className="rounded-xl w-full overflow-hidden h-[50px]"
      accessibilityRole="button"
    >
      <LinearGradient
        colors={[themeColors.primary.DEFAULT, themeColors.secondary.DEFAULT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute inset-0"
      >
        <View className="h-full items-center justify-center">
          <Text className="text-md font-bold text-center text-neutral-100">{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
