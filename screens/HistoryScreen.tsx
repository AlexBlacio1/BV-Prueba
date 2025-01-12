import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/FirebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface Operation {
  id: string;
  amount: number;
  type: string;
  comment: string;
  date: string;
}

const HistoryScreen = () => {
  const [operations, setOperations] = useState<Operation[]>([]);

  useEffect(() => {
    const operationsRef = ref(database, 'operations');
    
    const unsubscribe = onValue(operationsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedOperations: Operation[] = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          loadedOperations.push({
            id: key,
            amount: data[key].amount,
            type: data[key].type,
            comment: data[key].comment,
            date: data[key].date,
          });
        }
      }

      setOperations(loadedOperations);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: Operation }) => (
    <View style={styles.operationItem}>
      <Text style={styles.operationText}>Monto: ${item.amount}</Text>
      <Text style={styles.operationText}>Tipo: {item.type}</Text>
      <Text style={styles.operationText}>Comentario: {item.comment}</Text>
      <Text style={styles.operationText}>Fecha: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>
      
      <FlatList
        data={operations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  operationItem: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  operationText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HistoryScreen;