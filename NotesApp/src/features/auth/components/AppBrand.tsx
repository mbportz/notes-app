import { View, Text } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Color from '@shared/theme/colors.json';

type BrandSize = 'lg' | 'md' | 'sm';

const SIZE_STYLES: Record<
  BrandSize,
  {
    title: string;
    tagline: string;
    container: string;
    spacing: string;
    headingAlign: string;
    taglineAlign: string;
  }
> = {
  lg: {
    title: 'text-4xl leading-tight',
    tagline: 'text-label leading-5',
    container: 'flex-col items-center',
    spacing: 'gap-2',
    headingAlign: 'items-center',
    taglineAlign: 'text-center',
  },
  md: {
    title: 'text-3xl leading-tight',
    tagline: 'text-md leading-5',
    container: 'flex-col items-start',
    spacing: 'gap-1.5',
    headingAlign: 'items-start',
    taglineAlign: 'text-left',
  },
  sm: {
    title: 'text-2xl leading-snug',
    tagline: 'text-sm leading-4',
    container: 'flex-col items-start',
    spacing: 'gap-1',
    headingAlign: 'items-start',
    taglineAlign: 'text-left',
  },
};

export type AppBrandProps = {
  brandTitle?: string;
  tagline?: string;
  containerClassName?: string;
  rowClassName?: string;
  titleClassName?: string;
  taglineClassName?: string;
  size?: BrandSize;
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
  <Text
    accessibilityRole="header"
    className={`font-extrabold text-text ${titleClassName ?? ''}`.trim()}
  >
    {brandTitle}
  </Text>
);

const AppBrand = ({
  brandTitle = 'Panote',
  tagline,
  containerClassName,
  rowClassName,
  titleClassName,
  taglineClassName,
  size = 'md',
  colors = [Color.primary.DEFAULT, Color.secondary.DEFAULT],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
}: AppBrandProps) => {
  const sizeStyles = SIZE_STYLES[size];
  const finalTitleClass = `${sizeStyles.title} ${titleClassName ?? ''}`.trim();
  const finalContainerClass = `${sizeStyles.container} ${sizeStyles.spacing} ${
    containerClassName ?? ''
  }`.trim();
  const finalHeadingRow = `${sizeStyles.headingAlign} ${rowClassName ?? ''}`.trim();
  const finalTaglineClass = `${sizeStyles.tagline} ${sizeStyles.taglineAlign} ${
    taglineClassName ?? ''
  }`.trim();

  return (
    <View className={finalContainerClass}>
      <View className={`w-full ${finalHeadingRow}`}>
        <MaskedView
          maskElement={<Title brandTitle={brandTitle} titleClassName={finalTitleClass} />}
        >
          <LinearGradient colors={colors} start={start} end={end} className="px-1">
            <Title brandTitle={brandTitle} titleClassName={`${finalTitleClass} opacity-0`} />
          </LinearGradient>
        </MaskedView>
      </View>
      {tagline ? (
        <Text className={`font-medium text-text-muted ${finalTaglineClass}`}>{tagline}</Text>
      ) : null}
    </View>
  );
};

export default AppBrand;
