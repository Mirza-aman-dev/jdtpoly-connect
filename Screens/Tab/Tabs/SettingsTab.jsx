import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { Easing, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { getAuth } from 'firebase/auth';

export default function SettingsTab({ navigation }) {
  const [studentName, setStudentName] = useState('Mirza Aman');
  const [department, setDepartment] = useState('Computer Engineering');
  const [semester, setSemester] = useState('3rd');
  const [cgpa, setCgpa] = useState('8.7');
  const [profilePhoto, setProfilePhoto] = useState(
    'https://randomuser.me/api/portraits/men/1.jpg'
  );

  const handleProfilePhotoChange = () => {
    setProfilePhoto(
      profilePhoto === 'https://randomuser.me/api/portraits/men/1.jpg'
        ? 'https://randomuser.me/api/portraits/men/2.jpg'
        : 'https://randomuser.me/api/portraits/men/1.jpg'
    );
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          // Handle logout logic
          getAuth().signOut().then(()=>navigation('Splash'))
          console.log('Logged out');
        },
      },
    ]);
  };

  // Animations for each section
  const profileAnim = useSharedValue(0); // Profile image animation
  const sectionAnim = useSharedValue(0); // Sections fade-in animation
  const buttonAnim = useSharedValue(0); // Logout button animation

  // Apply animated styles
  const profileImageStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(profileAnim.value, { duration: 800, easing: Easing.ease }),
      transform: [
        {
          scale: withTiming(profileAnim.value ? 1 : 0.8, { duration: 800, easing: Easing.ease }),
        },
      ],
    };
  });

  const sectionStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(sectionAnim.value, { duration: 800, easing: Easing.ease }),
      transform: [
        {
          translateY: withTiming(sectionAnim.value ? 0 : 20, { duration: 800, easing: Easing.ease }),
        },
      ],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(buttonAnim.value, { duration: 800, easing: Easing.ease }),
      transform: [
        {
          translateY: withTiming(buttonAnim.value ? 0 : 20, { duration: 800, easing: Easing.ease }),
        },
      ],
    };
  });

  // Trigger the animations on mount
  React.useEffect(() => {
    profileAnim.value = 1;
    sectionAnim.value = 1;
    buttonAnim.value = 1;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Section */}
      <Animated.View style={[styles.profileSection, profileImageStyle]}>
        <TouchableOpacity onPress={handleProfilePhotoChange}>
          <Image
            source={{ uri: profilePhoto }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.studentName}>{studentName}</Text>
        <Text style={styles.departmentText}>Department: {department}</Text>
        <Text style={styles.semesterText}>Semester: {semester}</Text>
        <Text style={styles.cgpaText}>Current CGPA: {cgpa}</Text>
      </Animated.View>

      {/* My Rewards Section */}
      <Animated.View style={[styles.section, sectionStyle]}>
        <Text style={styles.sectionTitle}>My Rewards</Text>
        <TouchableOpacity style={styles.arrowSection}>
          <Text style={styles.arrowText}>View Rewards</Text>
          <Ionicons name="arrow-forward" size={20} color="#333" />
        </TouchableOpacity>
      </Animated.View>

      {/* Report Issue Section */}
      <Animated.View style={[styles.section, sectionStyle]}>
        <Text style={styles.sectionTitle}>Report an Issue</Text>
        <TouchableOpacity style={styles.arrowSection}>
          <Text style={styles.arrowText}>Report Issue</Text>
          <Ionicons name="arrow-forward" size={20} color="#333" />
        </TouchableOpacity>
      </Animated.View>

      {/* Logout Button */}
      <Animated.View style={[styles.section, buttonStyle]}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Subtle background color for a premium look
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    marginHorizontal: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e74c3c', // Premium red border color
  },
  studentName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  departmentText: {
    fontSize: 16,
    color: '#555',
  },
  semesterText: {
    fontSize: 16,
    color: '#555',
  },
  cgpaText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  arrowSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
});
