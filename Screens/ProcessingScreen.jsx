import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ProcessingScreen = ({ navigation }) => {
  const [role, setRole] = useState(null); // To store the user's role
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkUserRole = async () => {
      const user = auth.currentUser;

      if (user) {

        const userDocRef = doc(db, 'students', user.uid); // Reference to the user's document
        const docSnap = await getDoc(userDocRef);

        // Faculty
        // const userDocRef1 = doc(db, 'users', user.uid); // Reference to the user's document
        // const docSnap1 = await getDoc(userDocRef1);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setRole(userData.role); // Set the role from Firestore document

          // Navigate based on role
          if (userData.role === 'active') {
            navigation.replace('MainApp');
          } else if (userData.role === 'inactive') {
            navigation.replace('Wait');
          }
        } else {
          navigation.replace('FacPr');
          // console.log('No such document!');
        }
      }
    };

    checkUserRole(); // Call the function to check user role

  }, [auth, db, navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default ProcessingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
