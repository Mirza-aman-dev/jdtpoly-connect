import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'; // Import ScrollView from react-native-gesture-handler
import { auth, db } from '../Backend/Firebase/config';  // Import Firebase config
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupScreen({ navigation }) {
  const [form, setForm] = useState({
    fullName: '',
    regNum: '',
    quota: '',
    password: '',
    rollNumber: '',
    admissionNumber: '',
    dob: '',
    dept: '',
    sem: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const quotaOptions = [
    { label: 'Management Seat', value: 'management' },
    { label: 'Orphanage Seat', value: 'orphanage' },
    { label: 'Merit Seat', value: 'merit' },
    { label: 'Other', value: 'Other' },
  ];

  const semOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
  ];

  const deptOptions = [
    { label: 'Computer Engineering', value: 'Computer Engineering' },
    { label: 'Computer Hardware Engineering', value: 'Computer Hardware Engineering' },
    { label: 'Civil Engineering', value: 'Civil Engineering' },
    { label: 'Architecture', value: 'Architecture' },
    { label: 'Electrical & Electronics Engineering', value: 'Electrical & Electronics Engineering' },
    { label: 'Electronics Engineering', value: 'Electronics Engineering' },
    { label: 'Automobile Engineering', value: 'Automobile Engineering' },
    { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
  ];

  const handleQuotaSelect = (quota) => {
    setForm({ ...form, quota });
    setModalVisible(false);
  };

  const handleSemSelect = (sem) => {
    setForm({ ...form, sem });
    setModalVisible2(false);
  };

  const handleDeptSelect = (dept) => {
    setForm({ ...form, dept });
    setModalVisible3(false);
  };

  const validateForm = () => {
    if (
      !form.fullName ||
      !form.dob ||
      !form.rollNumber ||
      !form.regNum ||
      !form.admissionNumber ||
      !form.quota ||
      !form.dept ||
      !form.sem ||
      !form.password
    ) {
      Alert.alert('Validation Error', 'Please fill in all the fields');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    // Append @jdtpoly.com to the registration number
    const email = form.regNum + '@jdtpoly.com';

    let _feePerYear;

    if (form.quota === 'management') {
      _feePerYear = 75000;
    } else if (form.quota === 'merit') {
      _feePerYear = 28000;
    } else if (form.quota === 'orphanage') {
      _feePerYear = 0;
    } else if (form.quota === 'Other') {
      _feePerYear = 'other';
    }

    const returnDept = () => {
      switch (form.dept) {
        case 'Computer Engineering':
          return 'ComputerEngineering';
        case 'Computer Hardware Engineering':
          return 'ComputerHardwareEngineering';
        case 'Civil Engineering':
          return 'CivilEngineering';
        case 'Architecture':
          return 'Architecture';
        case 'Electrical & Electronics Engineering':
          return 'ElectricalAndElectronicsEngineering';
        case 'Electronics Engineering':
          return 'ElectronicsEngineering';
        case 'Automobile Engineering':
          return 'AutomobileEngineering';
        case 'Mechanical Engineering':
          return 'MechanicalEngineering';
        default:
          return ''; // Return an empty string for unmatched cases
      }
    };

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
      const user = userCredential.user;

      let _dept = returnDept();
      let _sem = `semester${form.sem}`;

      // Store user details in Firestore
      await setDoc(doc(db, 'students', user.uid), {
        fullName: form.fullName,
        dob: form.dob,
        dept: form.dept,
        sem: form.sem,
        rollNumber: form.rollNumber,
        regNum: form.regNum,
        admissionNumber: form.admissionNumber,
        admissionType: form.quota,
        role: 'inactive',
        feeStruct: _feePerYear
      });

      const docRef = doc(db, `${_dept}_${_sem}`, user.uid);
      const data = {
        fullName: form.fullName,
        dob: form.dob,
        dept: form.dept,
        sem: form.sem,
        rollNumber: form.rollNumber,
        regNum: form.regNum,
        admissionNumber: form.admissionNumber,
        admissionType: form.quota,
        uid: user.uid,
        feeStruct: _feePerYear,
      };

      // Save the data to Firestore
      await setDoc(docRef, data);

      // On successful signup, navigate to the home or login screen
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Wait'); // or 'Home'
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <ScrollView style={styles.container}> {/* Replace KeyboardAwareScrollView with ScrollView */}
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }}
          />
          <Text style={styles.title}>
            Sign Up to <Text style={{ color: '#075eec' }}>JDT Connect</Text>
          </Text>
          <Text style={styles.subtitle}>
            Connect with JDT Polytechnic resources
          </Text>
        </View>

        <View style={styles.form}>
                    <View style={styles.input}>
                      <Text style={styles.inputLabel}>Student Registration Number</Text>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="while-editing"
                        keyboardType="numeric"
                        onChangeText={regNo => setForm({ ...form, regNo })}
                        placeholder="Enter Registration Number"
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

        
                    <View style={styles.formAction}>
                      <TouchableOpacity>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Sign in</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
        
                    <TouchableOpacity onPress={() => { navigation.navigate('FacLogin') }}>
                      <Text style={styles.formLink}>Faculty Portal</Text>
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
  /** Header */
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
  /** Form */
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
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  inputField: {
    fontSize: 15,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    paddingLeft: 16,
    color: '#222',
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: '#0a66c2',
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});