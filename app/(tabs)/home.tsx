import { Text, View, StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image'; 
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import { Link } from 'expo-router';

const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <View style = {styles.text}>
      <Link href ="/explore" style={styles.button}>
        Start Planning!
      </Link>
      </View>

      <View style={styles.imageContainer}>
        <Image source={PlaceholderImage} style={styles.image} />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(69, 117, 124, 0.8)',
    alignItems: 'center',
    paddingTop: 50,
  },
  
  imageContainer: {
    flex: 1, 
  },
  image: {
    width: 340,
    height: 540,
    borderRadius: 18

  },
  text: {
    color: '#000000',
  },
  footerContainer: {
    flex: 2,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(69, 117, 124)', // Optional: Add a background color with some transparency
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
