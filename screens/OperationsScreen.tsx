import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/FirebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const OperationsScreen = () => {
  const [cedula, setCedula] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [studentAge, setStudentAge] = useState<string>('');
  const [studentCourse, setStudentCourse] = useState<string>('');

  const handleSaveOperation = () => {
    const ageValue = parseInt(studentAge);

    if (isNaN(ageValue) || ageValue < 18) {
      Alert.alert('Error', 'El estudiante debe ser mayor de edad.');
      return;
    }

    if (!cedula || !studentName || !studentAge || !studentCourse) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    if (studentCourse.toLowerCase() === 'angular') {
      Alert.alert(
        'Confirmación',
        'Para tomar el curso de Angular es necesario conocer desarrollo web. ¿Desea continuar?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Continuar',
            onPress: saveOperationToFirebase,
          },
        ]
      );
      return;
    }
    saveOperationToFirebase();
  };

  const saveOperationToFirebase = () => {
    const operation = {
      id: Date.now().toString(),
      cedula,
      studentName,
      studentAge: parseInt(studentAge),
      studentCourse,
      date: new Date().toISOString(),
    };

    const operationsRef = ref(database, 'operations');
    push(operationsRef, operation)
      .then(() => {
        Alert.alert('Éxito', 'La operación se realizó con éxito.');
        clearForm();
      })
      .catch((error) => {
        Alert.alert('Error', 'Hubo un problema al guardar la operación.');
        console.error(error);
      });
  };

  const clearForm = () => {
    setCedula('');
    setStudentName('');
    setStudentAge('');
    setStudentCourse('');
  };

  return (
    <ImageBackground
      source={require('../assets/fondo.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registro de estudiante</Text>

        <Image
          source={require('../assets/estudiante.webp')}
          style={styles.image}
        />

        <TextInput
          style={styles.input}
          placeholder="Cédula"
          value={cedula}
          onChangeText={setCedula}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre del Estudiante"
          value={studentName}
          onChangeText={setStudentName}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad del Estudiante"
          value={studentAge}
          onChangeText={setStudentAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Curso"
          value={studentCourse}
          onChangeText={setStudentCourse}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveOperation}>
          <Text style={styles.buttonText}>Guardar Estudiante</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 75,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OperationsScreen;
