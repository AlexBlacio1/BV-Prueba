import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Welcome'>>();

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/58/1c/40/581c40b407b21972beee83c38908cf9a.jpg' }} 
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>

        <Image 
          source={{ uri: 'https://img.freepik.com/vector-gratis/ilustracion-encantadora-casa-dibujos-animados_1308-176076.jpg' }} 
          style={styles.image}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>Desarrollado por: Alexis Vallejo</Text>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff',
  },
  image: {
    width: 280,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default WelcomeScreen;
