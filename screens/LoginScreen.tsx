import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator, Image, Dimensions } from 'react-native';
import { loginUser } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/Navigation';

type LoginScreenProps = {
  onLogin: () => void;
};

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingrese un correo electrónico válido.');
      return;
    }

    setLoading(true);
    try {
      await loginUser(email, password);
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      onLogin();
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <Image
        source={require('../assets/lock.webp')}
        style={styles.image}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <View style={styles.buttonContainer}>
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.03,
    color: '#333',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
    marginBottom: height * 0.03,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: height * 0.015,
    marginBottom: height * 0.02,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: width * 0.045,
  },
  buttonContainer: {
    marginTop: height * 0.02,
    borderRadius: 8,
    overflow: 'hidden',
  },
  loader: {
    marginTop: height * 0.03,
  },
});

export default LoginScreen;
