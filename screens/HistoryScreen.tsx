import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../services/FirebaseConfig';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface Operation {
  id: string;
  cedula: string;
  studentName: string;
  studentAge: number;
  studentCourse: string;
  date: string;
}

const HistoryScreen = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Operation | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const operationsRef = ref(database, 'operations');
    
    const unsubscribe = onValue(operationsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedOperations: Operation[] = [];

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          loadedOperations.push({
            id: key,
            cedula: data[key].cedula,
            studentName: data[key].studentName,
            studentAge: data[key].studentAge,
            studentCourse: data[key].studentCourse,
            date: data[key].date,
          });
        }
      }

      setOperations(loadedOperations);
    });

    return () => unsubscribe();
  }, []);

  const handleSelectOperation = (operation: Operation) => {
    setSelectedStudent(operation);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: Operation }) => (
    <TouchableOpacity onPress={() => handleSelectOperation(item)} style={styles.operationItem}>
      <Text style={styles.operationText}>Nombre: {item.studentName}</Text>
      <Text style={styles.operationText}>Curso: {item.studentCourse}</Text>
      <Text style={styles.operationText}>Cedula: {item.cedula}</Text>
      <Text style={styles.operationText}>Fecha de registro: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={{uri: 'https://static.vecteezy.com/system/resources/previews/010/589/103/non_2x/purple-paper-notebook-with-lines-for-writing-vector.jpg'}} style={styles.container}>
      <Text style={styles.title}>Listado de estudiantes</Text>
      
      <FlatList
        data={operations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedStudent && (
              <>
                <Text style={styles.modalTitle}>Detalles del Estudiante</Text>
                <Text style={styles.modalText}>Nombre: {selectedStudent.studentName}</Text>
                <Text style={styles.modalText}>Edad: {selectedStudent.studentAge}</Text>
                <Text style={styles.modalText}>Curso: {selectedStudent.studentCourse}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#eea72e',
  },
  flatListContent: {
    paddingBottom: 20,
  },
  operationItem: {
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  operationText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15,
    color: '#007BFF',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333333',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HistoryScreen;
