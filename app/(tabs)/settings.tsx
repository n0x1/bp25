import { Text, View, StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Button from '@/components/Button';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>settings</Text>
        <View style={styles.footerContainer}>
           < Button theme ="primary" label="Dark Mode" />
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ff0a1b',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
