import { ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';

export function useColorScheme(): NonNullable<ColorSchemeName> {
  return _useColorScheme() as NonNullable<ColorSchemeName>;
}