import { ref, push, onValue } from 'firebase/database';
import { database } from './FirebaseConfig';

export const saveOperation = async (operation: any): Promise<void> => {
  const operationsRef = ref(database, 'operations/');
  await push(operationsRef, operation);
};

export const fetchOperations = (callback: (data: any) => void) => {
  const operationsRef = ref(database, 'operations/');
  onValue(operationsRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  });
};