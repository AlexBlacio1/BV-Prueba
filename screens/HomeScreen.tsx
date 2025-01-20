import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
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

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setUserName(userData.name || currentUser.displayName);
            setUserEmail(userData.email || currentUser.email);
            setUserPhone(userData.phone || 'No disponible');
          } else {
            console.log('No se encontró información del usuario');
          }
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario: ', error);
        });
    }
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/user.png')}
          style={styles.userImage}
        />
        <Text style={styles.greeting}>¡Hola, {userName || 'Usuario'}!</Text>
        <Text style={styles.subText}>
          Estamos felices de verte nuevamente.
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Correo:</Text>
          <Text style={styles.infoValue}>{userEmail || 'No disponible'}</Text>
          <Text style={styles.infoLabel}>Teléfono:</Text>
          <Text style={styles.infoValue}>{userPhone || 'No disponible'}</Text>
        </View>
        <Text style={styles.footerText}>¡Explora y disfruta de la aplicación!</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;

