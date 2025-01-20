import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/Colors';
import WelcomeScreen from 'screens/WelcomeScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Operations: undefined;
  History: undefined;
  Profile: undefined;
  Home: undefined;
  HomeTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Operations') {
              iconName = focused ? 'calculator' : 'calculator-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'time' : 'time-outline';
            }
  
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
