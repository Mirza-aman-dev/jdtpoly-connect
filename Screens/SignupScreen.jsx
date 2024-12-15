// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   FlatList,
//   KeyboardAwareScrollView,
//   Alert,
// } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler'; // Import ScrollView from react-native-gesture-handler
// import { auth, db } from '../Backend/Firebase/config';  // Import Firebase config
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { Picker } from '@react-native-picker/picker';

// export default function SignupScreen({ navigation }){
// const [form, setForm] = useState({
//   fullName: '',
//   regNum: '',
//   quota: '',
//   password: '',
//   rollNumber: '',
//   admissionNumber: '',
//   dob: '',
//   dept: '',
//   sem: '',
// });

// const [modalVisible, setModalVisible] = useState(false);
// const [modalVisible2, setModalVisible2] = useState(false);
// const [modalVisible3, setModalVisible3] = useState(false);
// const quotaOptions = [
//   { label: 'Management Seat', value: 'management' },
//   { label: 'Orphanage Seat', value: 'orphanage' },
//   { label: 'Merit Seat', value: 'merit' },
//   { label: 'Other', value: 'Other' },
// ];
// const semOptions = [
//   { label: '1', value: '1' },
//   { label: '2', value: '2' },
//   { label: '3', value: '3' },
//   { label: '4', value: '4' },
//   { label: '5', value: '5' },
//   { label: '6', value: '6' },
// ];

// const deptOptions = [
//   { label: 'Computer Engineering', value: 'Computer Engineering' },
//   { label: 'Computer Hardware Engineering', value: 'Computer Hardware Engineering' },
//   { label: 'Civil Engineering', value: 'Civil Engineering' },
//   { label: 'Architecture', value: 'Architecture' },
//   { label: 'Electrical & Electronics Engineering', value: 'Electrical & Electronics Engineering' },
//   { label: 'Electronics Engineering', value: 'Electronics Engineering' },
//   { label: 'Automobile Engineering', value: 'Automobile Engineering' },
//   { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
// ];

// const handleQuotaSelect = (quota) => {
//   setForm({ ...form, quota });
//   setModalVisible(false);
// };

// const handleSemSelect = (sem) => {
//   setForm({ ...form, sem });
//   setModalVisible2(false);
// };

// const handleDeptSelect = (dept) => {
//   setForm({ ...form, dept });
//   setModalVisible3(false);
// };

// const validateForm = () => {
//   if (
//     !form.fullName ||
//     !form.dob ||
//     !form.rollNumber ||
//     !form.regNum ||
//     !form.admissionNumber ||
//     !form.quota ||
//     !form.dept ||
//     !form.sem ||
//     !form.password
//   ) {
//     Alert.alert('Validation Error', 'Please fill in all the fields');
//     return false;
//   }
//   return true;
// };

// const handleSignup = async () => {
//   if (!validateForm()) return;

//   // Append @jdtpoly.com to the registration number
//   const email = form.regNum + '@jdtpoly.com';

//   let _feePerYear;

//   if (form.quota === 'management') {
//     _feePerYear = 75000;
//   } else if (form.quota === 'merit') {
//     _feePerYear = 28000;
//   } else if (form.quota === 'orphanage') {
//     _feePerYear = 0;
//   } else if (form.quota === 'Other') {
//     _feePerYear = 'other';
//   }

//   const returnDept = () => {
//     switch (form.dept) {
//       case 'Computer Engineering':
//         return 'ComputerEngineering';
//       case 'Computer Hardware Engineering':
//         return 'ComputerHardwareEngineering';
//       case 'Civil Engineering':
//         return 'CivilEngineering';
//       case 'Architecture':
//         return 'Architecture';
//       case 'Electrical & Electronics Engineering':
//         return 'ElectricalAndElectronicsEngineering';
//       case 'Electronics Engineering':
//         return 'ElectronicsEngineering';
//       case 'Automobile Engineering':
//         return 'AutomobileEngineering';
//       case 'Mechanical Engineering':
//         return 'MechanicalEngineering';
//       default:
//         return ''; // Return an empty string for unmatched cases
//     }
//   };

//   try {
//     // Create user with email and password
//     const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
//     const user = userCredential.user;

//     let _dept = returnDept();
//     let _sem = `semester${form.sem}`;

//     // Store user details in Firestore
//     await setDoc(doc(db, 'students', user.uid), {
//       fullName: form.fullName,
//       dob: form.dob,
//       dept: form.dept,
//       sem: form.sem,
//       rollNumber: form.rollNumber,
//       regNum: form.regNum,
//       admissionNumber: form.admissionNumber,
//       admissionType: form.quota,
//       role: 'inactive',
//       feeStruct: _feePerYear
//     });

//     const docRef = doc(db, `${_dept}_${_sem}`, user.uid);
//     const data = {
//       fullName: form.fullName,
//       dob: form.dob,
//       dept: form.dept,
//       sem: form.sem,
//       rollNumber: form.rollNumber,
//       regNum: form.regNum,
//       admissionNumber: form.admissionNumber,
//       admissionType: form.quota,
//       uid: user.uid,
//       feeStruct: _feePerYear,
//     };

//     // Save the data to Firestore
//     await setDoc(docRef, data);

//     // On successful signup, navigate to the home or login screen
//     Alert.alert('Success', 'Account created successfully');
//     navigation.navigate('Wait'); // or 'Home'
//   } catch (error) {
//     console.error('Error signing up:', error);
//     Alert.alert('Signup Error', error.message);
//   }
// };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
//       <KeyboardAwareScrollView style={styles.container}>
//         <View style={styles.header}>
//           <Image
//             alt="App Logo"
//             resizeMode="contain"
//             style={styles.headerImg}
//             source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }}
//           />

//           <Text style={styles.title}>
//             Sign Up to <Text style={{ color: '#075eec' }}>JDT Connect</Text>
//           </Text>

//           <Text style={styles.subtitle}>
//             Connect with JDT Polytechnic resources
//           </Text>
//         </View>

// <View style={styles.form}>
//   {/* Full Name */}
//   <View style={styles.input}>
//     <Text style={styles.inputLabel}>Full Name</Text>
//     <TextInput
//       autoCapitalize="words"
//       autoCorrect={false}
//       clearButtonMode="while-editing"
//       keyboardType="default"
//       onChangeText={(fullName) => setForm({ ...form, fullName })}
//       placeholder="Enter Your Full Name"
//       placeholderTextColor="#6b7280"
//       style={styles.inputControl}
//       value={form.fullName}
//     />
//   </View>

//   {/* Registration Number */}
//   <View style={styles.input}>
//     <Text style={styles.inputLabel}>Student Registration Number</Text>
//     <TextInput
//       autoCapitalize="none"
//       autoCorrect={false}
//       clearButtonMode="while-editing"
//       keyboardType="numeric"
//       onChangeText={(regNum) => setForm({ ...form, regNum })}
//       placeholder="Enter Registration Number"
//       placeholderTextColor="#6b7280"
//       style={styles.inputControl}
//       value={form.regNum}
//     />
//   </View>

//   {/* Admission Type (Previously Quota) */}
//   <View style={styles.input}>
//     <Text style={styles.inputLabel}>Admission Type</Text>
//     <View style={styles.pickerContainer}>
//       <Picker
//         selectedValue={form.admissionType}
//         onValueChange={(admissionType) => setForm({ ...form, admissionType })}
//         style={styles.picker}
//       >
//         <Picker.Item label="Select Admission Type" value="" />
//         <Picker.Item label="Management Seat" value="management" />
//         <Picker.Item label="Orphanage Seat" value="orphanage" />
//         <Picker.Item label="Merit Seat" value="merit" />
//       </Picker>
//     </View>
//   </View>

//   {/* Password */}
//   <View style={styles.input}>
//     <Text style={styles.inputLabel}>Password</Text>
//     <TextInput
//       autoCorrect={false}
//       clearButtonMode="while-editing"
//       onChangeText={(password) => setForm({ ...form, password })}
//       placeholder="********"
//       placeholderTextColor="#6b7280"
//       style={styles.inputControl}
//       secureTextEntry={true}
//       value={form.password}
//     />
//   </View>

//   {/* Submit Button */}
//   <View style={styles.formAction}>
//     <TouchableOpacity
//       onPress={() => {
//         console.log(form); // Handle the signup logic here
//       }}
//     >
//       <View style={styles.btn}>
//         <Text style={styles.btnText}>Sign up</Text>
//       </View>
//     </TouchableOpacity>
//   </View>

//           <TouchableOpacity
//             onPress={() => {
//               // Handle forgot password logic
//             }}
//           >
//             <Text style={styles.formLink}>Forgot password?</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAwareScrollView>

//       <TouchableOpacity
//         onPress={() => {
//           // Handle navigation to sign-in screen
//         }}
//       >
//         <Text style={styles.formFooter}>
//           Already have an account?{' '}
//           <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
//         </Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   title: {
//     fontSize: 31,
//     fontWeight: '700',
//     color: '#1D2A32',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#929292',
//   },
//   /** Header */
//   header: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 36,
//   },
//   headerImg: {
//     width: 80,
//     height: 80,
//     alignSelf: 'center',
//     marginBottom: 36,
//   },
//   /** Form */
//   form: {
//     marginBottom: 24,
//     paddingHorizontal: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   formAction: {
//     marginTop: 4,
//     marginBottom: 16,
//   },
//   formLink: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#075eec',
//     textAlign: 'center',
//   },
//   formFooter: {
//     paddingVertical: 24,
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#222',
//     textAlign: 'center',
//     letterSpacing: 0.15,
//   },
//   /** Input */
//   input: {
//     marginBottom: 16,
//   },
//   inputLabel: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 8,
//   },
//   inputControl: {
//     height: 50,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#222',
//     borderWidth: 1,
//     borderColor: '#C9D3DB',
//     borderStyle: 'solid',
//   },
//   dropdownButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: 50,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 24,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 16,
//   },
//   modalItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   modalItemText: {
//     fontSize: 16,
//     color: '#222',
//   },
//   modalCloseButton: {
//     padding: 10,
//     marginTop: 12,
//     backgroundColor: '#075eec',
//     borderRadius: 8,
//   },
//   modalCloseButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   btn: {
//     backgroundColor: '#075eec',
//     height: 48,
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   btnText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
//   Modal,
// } from 'react-native';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../Backend/Firebase/config'; // Update path if needed
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Picker } from '@react-native-picker/picker';
// import SelectDeptModal from '../Components/Modals/SelectDeptModal';

// export default function SignupScreen({ navigation }) {

//   const [form, setForm] = useState({
//     fullName: '',
//     regNum: '',
//     quota: '',
//     password: '',
//     rollNumber: '',
//     admissionNumber: '',
//     dob: '',
//     dept: '',
//     sem: '',
//   });

//   const [modalVisible, setModalVisible] = useState(false); // For controlling modal visibility
//   const [modalVisible2, setModalVisible2] = useState(false);
//   const [modalVisible3, setModalVisible3] = useState(false);
//   const quotaOptions = [
//     { label: 'Management Seat', value: 'management' },
//     { label: 'Orphanage Seat', value: 'orphanage' },
//     { label: 'Merit Seat', value: 'merit' },
//     { label: 'Other', value: 'Other' },
//   ];
// const semOptions = [
//   { label: '1', value: '1' },
//   { label: '2', value: '2' },
//   { label: '3', value: '3' },
//   { label: '4', value: '4' },
//   { label: '5', value: '5' },
//   { label: '6', value: '6' },
// ];

//   const deptOptions = [
//     { label: 'Computer Engineering', value: 'Computer Engineering' },
//     { label: 'Computer Hardware Engineering', value: 'Computer Hardware Engineering' },
//     { label: 'Civil Engineering', value: 'Civil Engineering' },
//     { label: 'Architecture', value: 'Architecture' },
//     { label: 'Electrical & Electronics Engineering', value: 'Electrical & Electronics Engineering' },
//     { label: 'Electronics Engineering', value: 'Electronics Engineering' },
//     { label: 'Automobile Engineering', value: 'Automobile Engineering' },
//     { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
//   ];

//   const handleQuotaSelect = (quota) => {
//     setForm({ ...form, quota });
//     setModalVisible(false);
//   };

// const handleSemSelect = (sem) => {
//   setForm({ ...form, sem });
//   setModalVisible2(false);
// };

//   const handleDeptSelect = (dept) => {
//     setForm({ ...form, dept });
//     setModalVisible3(false);
//   };

//   const validateForm = () => {
//     if (
//       !form.fullName ||
//       !form.dob ||
//       !form.rollNumber ||
//       !form.regNum ||
//       !form.admissionNumber ||
//       !form.quota ||
//       !form.dept ||
//       !form.sem ||
//       !form.password
//     ) {
//       Alert.alert('Validation Error', 'Please fill in all the fields');
//       return false;
//     }
//     return true;
//   };

//   const handleSignup = async () => {
//     if (!validateForm()) return;

//     // Append @jdtpoly.com to the registration number
//     const email = form.regNum + '@jdtpoly.com';

//     let _feePerYear;

//     if (form.quota === 'management') {
//       _feePerYear = 75000;
//     } else if (form.quota === 'merit') {
//       _feePerYear = 28000;
//     } else if (form.quota === 'orphanage') {
//       _feePerYear = 0;
//     } else if (form.quota === 'Other') {
//       _feePerYear = 'other';
//     }

//     const returnDept = () => {
//       switch (form.dept) {
//         case 'Computer Engineering':
//           return 'ComputerEngineering';
//         case 'Computer Hardware Engineering':
//           return 'ComputerHardwareEngineering';
//         case 'Civil Engineering':
//           return 'CivilEngineering';
//         case 'Architecture':
//           return 'Architecture';
//         case 'Electrical & Electronics Engineering':
//           return 'ElectricalAndElectronicsEngineering';
//         case 'Electronics Engineering':
//           return 'ElectronicsEngineering';
//         case 'Automobile Engineering':
//           return 'AutomobileEngineering';
//         case 'Mechanical Engineering':
//           return 'MechanicalEngineering';
//         default:
//           return ''; // Return an empty string for unmatched cases
//       }
//     };

//     try {
//       // Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
//       const user = userCredential.user;

//       let _dept = returnDept();
//       let _sem = `semester${form.sem}`;

//       // Store user details in Firestore
//       await setDoc(doc(db, 'students', user.uid), {
//         fullName: form.fullName,
//         dob: form.dob,
//         dept: form.dept,
//         sem: form.sem,
//         rollNumber: form.rollNumber,
//         regNum: form.regNum,
//         admissionNumber: form.admissionNumber,
//         admissionType: form.quota,
//         role: 'inactive',
//         feeStruct: _feePerYear
//       });

//       const docRef = doc(db, `${_dept}_${_sem}`, user.uid);
//       const data = {
//         fullName: form.fullName,
//         dob: form.dob,
//         dept: form.dept,
//         sem: form.sem,
//         rollNumber: form.rollNumber,
//         regNum: form.regNum,
//         admissionNumber: form.admissionNumber,
//         admissionType: form.quota,
//         uid: user.uid,
//         feeStruct: _feePerYear,
//       };

//       // Save the data to Firestore
//       await setDoc(docRef, data);

//       // On successful signup, navigate to the home or login screen
//       Alert.alert('Success', 'Account created successfully');
//       navigation.navigate('Wait'); // or 'Home'
//     } catch (error) {
//       console.error('Error signing up:', error);
//       Alert.alert('Signup Error', error.message);
//     }
//   };


//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
//         <ScrollView contentContainerStyle={styles.container}>
//           <View style={styles.header}>
//             <Image
//               alt="App Logo"
//               resizeMode="contain"
//               style={styles.headerImg}
//               source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }} />

//             <Text style={styles.title}>
//               Sign up to <Text style={{ color: '#075eec' }}>JDT Connect </Text>
//             </Text>

//             <Text style={styles.subtitle}>
//               Connect with JDT Polytechnic resources
//             </Text>
//           </View>

//           <View style={styles.form}>
//             {/* Full Name */}
//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Full Name</Text>
//               <TextInput
//                 autoCapitalize="words"
//                 autoCorrect={false}
//                 clearButtonMode="while-editing"
//                 keyboardType="default"
//                 onChangeText={(fullName) => setForm({ ...form, fullName })}
//                 placeholder="Enter Your Full Name"
//                 placeholderTextColor="#6b7280"
//                 style={styles.inputControl}
//                 value={form.fullName}
//               />
//             </View>

//             {/* Registration Number */}
//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Student Registration Number</Text>
//               <TextInput
//                 autoCapitalize="none"
//                 autoCorrect={false}
//                 clearButtonMode="while-editing"
//                 keyboardType="numeric"
//                 onChangeText={(regNum) => setForm({ ...form, regNum })}
//                 placeholder="Enter Registration Number"
//                 placeholderTextColor="#6b7280"
//                 style={styles.inputControl}
//                 value={form.regNum}
//               />
//             </View>

//             {/* Admission Type (Previously Quota) */}
//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Admission Type</Text>
//               <TouchableOpacity
//                 style={styles.inputControl}
//                 onPress={() => setModalVisible(true)} // Open the modal when clicked
//               >
//                 <Text style={[styles.inputText, { color: form.quota ? '#222' : '#6b7280' }]}>
//                   {form.quota || "Select Admission Type"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Dept */}
//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Department</Text>
//               <TouchableOpacity
//                 style={styles.inputControl}
//                 onPress={() => setModalVisible2(true)} // Open the modal when clicked
//               >
//                 <Text style={[styles.inputText, { color: form.dept ? '#222' : '#6b7280' }]}>
//                   {form.dept || "Select Department"}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Password */}
//             <View style={styles.input}>
//               <Text style={styles.inputLabel}>Password</Text>
//               <TextInput
//                 autoCorrect={false}
//                 clearButtonMode="while-editing"
//                 onChangeText={(password) => setForm({ ...form, password })}
//                 placeholder="********"
//                 placeholderTextColor="#6b7280"
//                 style={styles.inputControl}
//                 secureTextEntry={true}
//                 value={form.password}
//               />
//             </View>

//             {/* Submit Button */}
//             <View style={styles.formAction}>
//               <TouchableOpacity
//                 onPress={() => {
//                   console.log(form); // Handle the signup logic here
//                 }}
//               >
//                 <View style={styles.btn}>
//                   <Text style={styles.btnText}>Sign up</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>

//       <TouchableOpacity onPress={() => { navigation.navigate('Login'); }}>
//         <Text style={styles.formFooter}>
//           Already have an account?{' '}
//           <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
//         </Text>
//       </TouchableOpacity>
//       {/* Modal for Admission Type Selection */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Select Admission Type</Text>
//             {quotaOptions.map((item) => (
//               <TouchableOpacity
//                 key={item.value} // Use value as a unique key
//                 style={styles.modalOption}
//                 onPress={() => handleQuotaSelect(item.value)}
//               >
//                 <Text style={styles.modalText}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity
//               style={styles.modalCloseButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.modalCloseText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//       <SelectDeptModal
//         data={deptOptions}
//         visible={modalVisible2}
//         setVisible={setModalVisible2}
//         onHandle={handleDeptSelect}
//       />
//     </SafeAreaView >
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   title: {
//     fontSize: 31,
//     fontWeight: '700',
//     color: '#1D2A32',
//     marginBottom: 6,
//   },
//   subtitle: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#929292',
//   },
//   header: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 36,
//   },
//   headerImg: {
//     width: 80,
//     height: 80,
//     alignSelf: 'center',
//     marginBottom: 36,
//   },
//   form: {
//     marginBottom: 24,
//     paddingHorizontal: 24,
//     flexGrow: 1,
//     flexShrink: 1,
//     flexBasis: 0,
//   },
//   formAction: {
//     marginTop: 4,
//     marginBottom: 16,
//   },
//   formLink: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#075eec',
//     textAlign: 'center',
//   },
//   formFooter: {
//     paddingVertical: 24,
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#222',
//     textAlign: 'center',
//     letterSpacing: 0.15,
//   },
//   input: {
//     marginBottom: 16,
//     width: '100%',
//   },
//   inputLabel: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: 8,
//   },
//   inputControl: {
//     height: 50,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#222',
//     borderWidth: 1,
//     borderColor: '#C9D3DB',
//     borderStyle: 'solid',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%', // ensures it takes full width
//     minWidth: 250,  // to ensure minimum width on small screens
//   },
//   inputText: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#222',
//   },
//   btn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     backgroundColor: '#075eec',
//     borderColor: '#075eec',
//   },
//   btnText: {
//     fontSize: 18,
//     lineHeight: 26,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   errorText: {
//     fontSize: 14,
//     color: '#ff3b30',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 20,
//     color: '#222',
//   },
//   modalOption: {
//     paddingVertical: 15,
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   modalText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#222',
//   },
//   modalCloseButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     backgroundColor: '#075eec',
//     borderRadius: 12,
//   },
//   modalCloseText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });
import React, { useState } from 'react';
import {
  StyleSheet,
  // SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  Button,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db,storage } from '../Backend/Firebase/config'; 
import { doc, setDoc } from 'firebase/firestore';
import SelectDeptModal from '../Components/Modals/SelectDeptModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectSemesterModal from '../Components/Modals/SelectSemesterModal';

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

  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setForm({ ...form, dob:currentDate.toLocaleDateString()});  
  };


  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const showDatepicker = () => {
    setShow(true);
  };
  const quotaOptions = [
    { label: 'Management Seat', value: 'management' },
    { label: 'Orphanage Seat', value: 'orphanage' },
    { label: 'Merit Seat', value: 'merit' },
    { label: 'Other', value: 'Other' },
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

  const semOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
  ];

  const handleQuotaSelect = (quota) => {
    setForm({ ...form, quota });
    setModalVisible(false);
  };

  const handleDeptSelect = (dept) => {
    setForm({ ...form, dept });
    setModalVisible2(false);
  };

  const handleSemSelect = (sem) => {
    setForm({ ...form, sem });
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

  const testHandleButton = () => {
    console.log(
      form
    );
  }

  const handleSignup = async () => {
    if (!validateForm()) return;

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

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, form.password);
      const user = userCredential.user;

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
        feeStruct: _feePerYear,
      });

      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Wait'); // or 'Home'
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Image
              alt="App Logo"
              resizeMode="contain"
              style={styles.headerImg}
              source={{ uri: 'https://assets.withfra.me/SignIn.2.png' }}
            />
            <Text style={styles.title}>
              Sign up to <Text style={{ color: '#075eec' }}>JDT Connect </Text>
            </Text>
            <Text style={styles.subtitle}>
              Connect with JDT Polytechnic resources
            </Text>
          </View>

          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="default"
                onChangeText={(fullName) => setForm({ ...form, fullName })}
                placeholder="Enter Your Full Name"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.fullName}
              />
            </View>

            {/* Registration Number */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Student Registration Number</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                onChangeText={(regNum) => setForm({ ...form, regNum })}
                placeholder="Enter Registration Number"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.regNum}
              />
            </View>

            {/* Roll Number */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Student Roll Number</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                onChangeText={(rollNumber) => setForm({ ...form, rollNumber })}
                placeholder="Enter Registration Number"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.rollNumber}
              />
            </View>

            {/* Admission Number */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Student Admission Number</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="numeric"
                onChangeText={(admissionNumber) => setForm({ ...form, admissionNumber })}
                placeholder="Enter Registration Number"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.admissionNumber}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>DOB {date.toLocaleDateString()}   </Text>
              <Button onPress={showDatepicker} title="Select Date" />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )}
            </View>

            {/* Admission Type */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Admission Type</Text>
              <TouchableOpacity
                style={styles.inputControl}
                onPress={() => setModalVisible(true)}
              >
                <Text style={[styles.inputText, { color: form.quota ? '#222' : '#6b7280' }]}>
                  {form.quota || "Select Admission Type"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Department */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Department</Text> 
              <TouchableOpacity
                style={styles.inputControl}
                onPress={() => setModalVisible2(true)}
              >
                <Text style={[styles.inputText, { color: form.dept ? '#222' : '#6b7280' }]}>
                  {form.dept || "Select Department"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Department */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Semester</Text>
              <TouchableOpacity
                style={styles.inputControl}
                onPress={() => setModalVisible3(true)}
              >
                <Text style={[styles.inputText, { color: form.sem ? '#222' : '#6b7280' }]}>
                  {form.sem || "Select Department"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Password */}
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            {/* Submit Button */}
            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleSignup}>   
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity onPress={() => { navigation.navigate('Login'); }}>
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
          </Text>
        </TouchableOpacity>

        {/* Modal for Admission Type Selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Admission Type</Text>
              {quotaOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.modalOption}
                  onPress={() => handleQuotaSelect(item.value)}
                >
                  <Text style={styles.modalText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <SelectDeptModal
          data={deptOptions}
          visible={modalVisible2}
          setVisible={setModalVisible2}
          onHandle={handleDeptSelect}
        />
        <SelectSemesterModal
          data={semOptions}
          visible={modalVisible3}
          setVisible={setModalVisible3}
          onHandle={handleSemSelect}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
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
    width: '100%',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: 250,
  },
  inputText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#222',
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  modalCloseButton: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#075eec',
    borderRadius: 12,
  },
  modalCloseText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});