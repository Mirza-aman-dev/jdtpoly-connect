import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { auth } from '../../../../Backend/Firebase/config'; // Ensure correct path
import { signOut } from 'firebase/auth';

const FacDashboard = ({ navigation }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully!');
      // Navigate the user to the Splash screen
      navigation.navigate('Splash');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faculty Dashboard</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default FacDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Optional background color
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
