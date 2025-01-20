import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Navigation';
import { StackNavigationProp } from '@react-navigation/stack';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

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

  return (
    <ImageBackground
      source={{ uri: 'https://static.vecteezy.com/system/resources/previews/013/814/412/non_2x/abstract-hand-drawn-vertical-background-oil-texture-blobs-in-pastel-colors-trendy-wallpaper-design-for-print-cover-wallpaper-minimalistic-and-natural-wallpaper-illustration-vector.jpg' }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/user.png')}
          style={styles.userImage}
        />

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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  topImage: {
    width: '100%',
    height: 200, 
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', 
  },
  greeting: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 15,
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ffffff',
  },
  profileSection: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  updateSection: {
    paddingTop: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 30,
    textAlign: 'center',
    marginLeft: 130,
    marginTop: - 50
  }
});

export default ProfileScreen;
