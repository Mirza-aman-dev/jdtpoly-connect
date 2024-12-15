import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Backend/Firebase/config'; // Update path if needed
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const auth1 = getAuth();
  const [form, setForm] = useState({
    regNo: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateInput = () => {
    if (!form.regNo || !form.password) {
      setErrorMessage('Please fill in both fields');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const email = `${form.regNo}@jdtpoly.com`;
      console.log(`email id is ${email}`);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, form.password);
      setIsLoading(false);
      console.log('User logged in', userCredential.user);
      navigation.replace('pr');
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('No user found with this email');
      } else {
        setErrorMessage('Login failed, please try again');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red',
  }
});
