import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/FirebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const OperationsScreen = () => {
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleSaveOperation = () => {
    const amountValue = parseFloat(amount);

    if (amountValue < 0) {
      Alert.alert('Error', 'El monto no puede ser negativo.');
      return;
    }

    if (amountValue > 500) {
      Alert.alert(
        'Confirmación',
        'El monto supera $500. ¿Desea continuar?',
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
      amount: parseFloat(amount),
      type,
      comment,
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
    setAmount('');
    setType('');
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>

      <Image
        source={require('../assets/operaciones.webp')}
        style={styles.image}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Operación"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Guardar Operación" onPress={handleSaveOperation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

export default OperationsScreen;
