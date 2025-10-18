import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@features/home/screens/HomeScreen';
import NewNoteScreen from '@features/home/screens/NewNoteScreen';
import ProfileScreen from '@features/auth/screens/ProfileScreen';
import { House, PlusSquare, UserRound } from 'lucide-react-native';
import Color from '@shared/theme/colors.json';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: { fontSize: 13, fontWeight: '600' },
        tabBarActiveTintColor: Color.primary.DEFAULT,
        tabBarInactiveTintColor: Color.text.muted,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Notes':
              return <House color={color} size={size ?? 20} strokeWidth={2.2} />;
            case 'New Note':
              return <PlusSquare color={color} size={size ?? 20} strokeWidth={2.2} />;
            default:
              return <UserRound color={color} size={size ?? 20} strokeWidth={2.2} />;
          }
        },
      })}
    >
      <Tab.Screen name="Notes" component={HomeScreen} />
      <Tab.Screen name="New Note" component={NewNoteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
