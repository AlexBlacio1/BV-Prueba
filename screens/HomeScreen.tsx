import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';

const HomeScreen = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);

      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserName(userData.name || currentUser.displayName);
          setUserEmail(userData.email || currentUser.email);
          setUserPhone(userData.phone || 'No disponible');
        } else {
          console.log('No se encontró información del usuario');
        }
      }).catch((error) => {
        console.error('Error al obtener datos del usuario: ', error);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Bienvenido nuevamente, {userName || 'Usuario'}!</Text>
      <Text style={styles.instructions}>Estamos contentos por tenerte de regreso</Text>
      <Text style={styles.instructions}>Empecemos.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 18,
    color: '#555',
  },
});

export default HomeScreen;
