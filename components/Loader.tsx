import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../styles/Colors';

const Loader = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
