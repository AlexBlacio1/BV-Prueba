import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { registerUser } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Register'>>();

  const handleRegister = async () => {
    if (!email || !password || !name || !phone) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    try {
      await registerUser(email, password, { name, email, phone });
      Alert.alert('Éxito', 'Registro exitoso. Inicia sesión ahora.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido!</Text>
      <Text style={styles.subtitle}>Por favor, llena los campos para registrarte</Text>
      
      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2417/2417841.png' }}
        style={styles.image}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Número Celular"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#7f8c8d',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    color: '#333',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default RegisterScreen;
