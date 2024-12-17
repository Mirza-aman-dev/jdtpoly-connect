import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../Backend/Firebase/config'; // Assuming Firebase is initialized
import { collection, addDoc, getDocs, doc } from 'firebase/firestore';

const SubjectsModal = (props) => {
  const { visible, setVisible, data } = props;
  const [newSubject, setNewSubject] = useState('');
  const [subjectPoint, setSubjectPoint] = useState('');
  const [subjects, setSubjects] = useState([]);

  // Fetch subjects from Firestore when modal is visible
  useEffect(() => {
    if (visible) {
      fetchSubjects();
    }
  }, [visible]);

  const fetchSubjects = async () => {
    try {
      const semesterRef = doc(db, 'ComputerEngineering_semester4', 'Subject');
      const subjectRef = collection(semesterRef, 'Subjects');
      const querySnapshot = await getDocs(subjectRef);

      const fetchedSubjects = [];
      querySnapshot.forEach((doc) => {
        fetchedSubjects.push({ id: doc.id, ...doc.data() });
      });
      setSubjects(fetchedSubjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  // Add new subject to Firestore
  const handleAddSubject = async () => {
    if (newSubject && subjectPoint) {
      const newSubjectObj = {
        name: newSubject,
        points: subjectPoint,
      };

      try {
        // Reference to the Subjects subcollection
        const semesterRef = doc(db, 'ComputerEngineering_semester4', 'Subject');
        const subjectRef = collection(semesterRef, 'Subjects');

        // Add the new subject to Firestore
        await addDoc(subjectRef, newSubjectObj);

        // Update the state with the new subject
        setSubjects([...subjects, newSubjectObj]);
        setNewSubject('');
        setSubjectPoint('');

        Alert.alert('Success', 'Subject added successfully!');
      } catch (error) {
        console.error('Error adding subject:', error);
        Alert.alert('Error', 'Could not add the subject. Please try again later.');
      }
    } else {
      Alert.alert('Please enter both subject name and points');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Subjects</Text>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
              <Icon name="times" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.subjectList}>
            {subjects.length === 0 ? (
              <Text style={styles.noSubjectsText}>No subjects available</Text>
            ) : (
              subjects.map((subject, index) => (
                <View key={index} style={styles.subjectItem}>
                  <Text style={styles.subjectText}>{subject.name}</Text>
                  <Text style={styles.subjectPoints}>Points: {subject.points}</Text>
                </View>
              ))
            )}
          </ScrollView>

          <View style={styles.addSubjectContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter subject name"
              value={newSubject}
              onChangeText={setNewSubject}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter subject points"
              value={subjectPoint}
              onChangeText={setSubjectPoint}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddSubject}>
              <Icon name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SubjectsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#ff4d4d',
    padding: 8,
    borderRadius: 15,
  },
  subjectList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  subjectItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  subjectText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subjectPoints: {
    fontSize: 14,
    color: '#777',
  },
  noSubjectsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
  addSubjectContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#168fc2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
