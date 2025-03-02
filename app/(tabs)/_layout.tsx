import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

// Create the useColorScheme hook
import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import { PaperProvider, useTheme } from 'react-native-paper';

function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}

// Define Colors object
const Colors = {
  light: {
    tint: '#2f95dc',
  },
  dark: {
    tint: '#fff',
  },
};

export default function TabLayout() {
  const colorScheme = useTheme();

  return (
    <PaperProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colorScheme.colors.primary,
          headerShown: false, // Hide the header for all tabs
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              backgroundColor: colorScheme.colors.background,
            },
            default: { backgroundColor: colorScheme.colors.background,},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="paper-plane" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="gear" color={color} />,
          }}
        />
      </Tabs>
    </PaperProvider>
  );
}