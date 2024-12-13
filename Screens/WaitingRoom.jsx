import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, { withTiming, useSharedValue, useAnimatedStyle, withRepeat, Easing } from 'react-native-reanimated';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth and signOut

const { width, height } = Dimensions.get('window');

const WaitingRoom = ({ navigation }) => {
  const auth = getAuth();
  // Shared values for animation
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  // Spinner rotation shared value
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Animate on mount
    translateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });

    // Rotate spinner continuously
    rotation.value = withRepeat(
      withTiming(360, { duration: 1500, easing: Easing.linear }),
      Infinity,
      false
    );
    console.log(auth.currentUser?.uid);
    
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Sign out function
  const handleSignOut = async () => {
    try {
      // const auth = getAuth();
      await signOut(auth); // Firebase sign-out
      navigation.replace('Login'); // Navigate to Login screen after sign-out
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        {/* Header Section */}
        <View style={styles.header}>
          <FontAwesome5 name="user-clock" size={60} color="#f2a900" style={styles.icon} />
          <Text style={styles.title}>Waiting for Approval</Text>
          </View>

        {/* Message Section */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            Your account is pending approval by your teacher. Please be patient while we verify your details.
          </Text>
          <Text style={styles.subText}>
            You will be notified once your account is approved.
          </Text>
        </View>

        {/* Waiting Spinner or Animation */}
        <View style={styles.spinnerContainer}>
          <Animated.View style={spinnerStyle}>
            <FontAwesome5 name="spinner" size={50} color="#075eec" style={styles.spinner} />
          </Animated.View>
          <Text style={styles.waitingText}>We are processing your request...</Text>
        </View>

        {/* Sign-out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8ecf4',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: '100%',
    maxWidth: 400, // Max width to keep the design premium
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#075eec',
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    maxWidth: '90%', // Ensures message box is responsive
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  spinnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginBottom: 10,
  },
  waitingText: {
    fontSize: 16,
    color: '#333',
  },
  signOutButton: {
    marginTop: 30,
    backgroundColor: '#f44336', // Red color for sign-out button
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  signOutButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WaitingRoom;
