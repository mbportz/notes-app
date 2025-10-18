import React, { useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Screen, OutlineButton } from '@shared/ui';
import { useLogout } from '@features/auth/hooks';
import { HomeActions, EmptyNotes } from '../components';
import { AppBrand } from '@features/auth/components';
import Color from '@shared/theme/colors.json';
import { LogOut } from 'lucide-react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { logout } = useLogout();
  const [searchValue, setSearchValue] = useState('');
  const userName = 'test3';

  return (
    <View className="flex-1 w-full bg-surface-50">
      <Screen pad="lg" gap="lg">
        <View className="gap-5">
          <View className="flex-row items-center justify-between">
            <AppBrand
              brandTitle="NotesApp"
              tagline={`Welcome back, ${userName}`}
              size="sm"
              containerClassName="flex-1"
              rowClassName="items-start"
            />
            <OutlineButton
              title="Sign Out"
              onPress={logout}
              icon={<LogOut color={Color.text.DEFAULT} size={18} />}
              className="h-[44px] px-5"
              textClassName="text-label"
            />
          </View>
          <HomeActions
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onNewNote={() => navigation.navigate('New Note' as never)}
          />
        </View>
        <EmptyNotes />
      </Screen>
    </View>
  );
}
