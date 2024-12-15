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
  ScrollView, // Default ScrollView
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Backend/Firebase/config'; // Update path if needed
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FacLoginScreen({ navigation }) {
  const auth1 = getAuth();
  const [form, setForm] = useState({
    regNo: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Input validation function
  const validateInput = () => {
    if (!form.regNo || !form.password) {
      setErrorMessage('Please fill in both fields');
      return false;
    }
    return true;
  };

  // Login function
  const handleLogin = async () => {
    if (!validateInput()) return; // If input is invalid, return early
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      const email = `${form.regNo}@gmail.com`;
      console.log(`email id is ${email}`);
  
      const userCredential = await signInWithEmailAndPassword(auth, email, form.password);
      setIsLoading(false);  // Stop loading once login is successful
      console.log('User logged in', userCredential.user);
      navigation.replace('FacPr');
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('No user found with this email');
      } else {
        // Use error.message to get the error as a string
        setErrorMessage(error.message);
      }
    }
  };
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView style={styles.container}> {/* Replaced KeyboardAwareScrollView with ScrollView */}
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }} />

          <Text style={styles.title}>
            Sign in to <Text style={{ color: '#075eec' }}>JDT Connect </Text>
          </Text>

          <Text style={styles.subtitle}>
            Faculty Portal
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>FID</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="default"  // Use numeric keyboard for registration number
              onChangeText={regNo => setForm({ ...form, regNo })}
              placeholder="Enter Your FID"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.regNo}
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>

          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.btn}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Sign in</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
            <Text style={styles.formLink}>Student Portal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  errorText: {
    fontSize: 14,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
  },
});
