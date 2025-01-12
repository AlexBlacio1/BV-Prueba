import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          setUser(snapshot.val());
        } else {
          console.log('No se encontró información del usuario');
        }
      }).catch((error) => {
        console.error('Error al obtener datos del usuario: ', error);
      });
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Text style={styles.title}>Información del Perfil</Text>
        <Text style={styles.greeting}>¡Hola, {user?.name || 'Usuario'}!</Text>
        <Text style={styles.text}>Correo: {user?.email || 'Sin correo'}</Text>
      </View>

      <View style={styles.updateSection}>
        <Text style={styles.title}>Mantén actualizada tu información</Text>
        <Text style={styles.text}>Nombre: {user?.name || 'Sin nombre'}</Text>
        <Text style={styles.text}>Número celular: {user?.phone || 'No disponible'}</Text>
        <Text style={styles.text}>Correo electrónico: {user?.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#333',
  },
  
  greeting: { 
    fontSize: 18, 
    fontStyle: 'italic', 
    marginBottom: 15, 
    color: '#555',
  },
  
  text: { 
    fontSize: 16, 
    marginBottom: 10,
    color: '#555',
  },

  profileSection: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  updateSection: {
    paddingTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },

  signOutSection: {
    marginTop: 30,
    alignItems: 'center',
  },
});

export default ProfileScreen;
