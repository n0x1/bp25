import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary'
};

export default function Button({ label, theme }: Props) {
  if (theme === 'primary')
    return (
        <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: '#ffc812', borderRadius: 18 },
        ]}>
      <Pressable style={styles.button} 
        style={[styles.button, { backgroundColor: '#ffd09e' }]}//box why is it error
        onPress={() => alert('Dark Mode Activated')}> 
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
});
