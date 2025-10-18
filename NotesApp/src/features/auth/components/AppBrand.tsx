import { View, Text } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Color from '@shared/theme/colors.json';

export type AppBrandProps = {
  brandTitle: string;
  tagline?: string;
  containerClassName?: string;
  rowClassName?: string;
  titleClassName?: string;
  colors?: string[];
  start?: {
    x: number;
    y: number;
  };
  end?: {
    x: number;
    y: number;
  };
};

type TitleProps = Pick<AppBrandProps, 'brandTitle' | 'titleClassName'>;

const Title = ({ brandTitle, titleClassName }: TitleProps) => (
  <Text accessibilityRole="header" className={`text-display font-extrabold ${titleClassName}`}>
    {brandTitle}
  </Text>
);

const AppBrand = ({
  brandTitle,
  tagline,
  containerClassName,
  rowClassName,
  titleClassName,
  colors = [Color.primary.DEFAULT, Color.secondary.DEFAULT],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}: AppBrandProps) => {
  return (
    <View className={`w-full items-center ${containerClassName}`}>
      <View className={`h-[60px] w-full items-center justify-center ${rowClassName} `}>
        <MaskedView maskElement={<Title brandTitle={brandTitle} titleClassName={titleClassName} />}>
          <LinearGradient
            colors={colors}
            start={start}
            end={end}
            className="size-full items-center justify-center"
          >
            <View className="items-center justify-center">
              <Title brandTitle={brandTitle} titleClassName="opacity-0" />
            </View>
          </LinearGradient>
        </MaskedView>
      </View>
      {tagline ? <Text className="text-label font-semibold text-text-muted">{tagline}</Text> : null}
    </View>
  );
};

export default AppBrand;
