import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../../Backend/Firebase/config';
import { getAuth } from 'firebase/auth';

export default function FacClassManagement({navigation}) {

  const auth = getAuth();

  const [MyDetails, setMyDetails] = useState([])
  const [load, setLoad] = useState(false);

  const fetchMyDetails = async () => {
    try {
      setLoad(true);
      const querySnapshot = await getDoc(doc(db, 'users', auth.currentUser?.uid));
      setMyDetails(querySnapshot.data());
      setLoad(false);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoad(false);
    }
  };

  // useEffect to call fetchMyDetails on mount
  useEffect(() => {
    fetchMyDetails(); // Calling the fetch function
  }, []);

  const quickServices = [
    { id: '1', name: 'Computer Engineering', icon: 'laptop', color: '#075eec', click : ()=>{navigation.navigate('FacSS',{dept:'Computer Engineering'})} },
    { id: '2', name: 'Computer Hardware Engineering', icon: 'microchip', color: '#12c7ed', click : ()=>{navigation.navigate('FacSS',{dept:'Computer Hardware Engineering'})} },
    { id: '3', name: 'Civil Engineering', icon: 'building', color: '#168fc2', click : ()=>{navigation.navigate('FacSS',{dept:'Civil Engineering'})}  },
    { id: '4', name: 'Architecture', icon: 'drafting-compass', color: '#f2a900', click : ()=>{navigation.navigate('FacSS',{dept:'Architecture'})}  },
    { id: '5', name: 'Electrical & Electronics Engineering', icon: 'bolt', color: '#ff5722', click : ()=>{navigation.navigate('FacSS',{dept:'Electrical & Electronics Engineering'})}  },
    { id: '6', name: 'Electronics Engineering', icon: 'satellite', color: '#9c27b0', click : ()=>{navigation.navigate('FacSS',{dept:'Electronics Engineering'})} },
    { id: '7', name: 'Automobile Engineering', icon: 'car', color: '#2196f3', click : ()=>{navigation.navigate('FacSS',{dept:'Automobile Engineering'})} },
    { id: '8', name: 'Mechanical Engineering', icon: 'cogs', color: '#ff9800', click : ()=>{navigation.navigate('FacSS',{dept:'Mechanical Engineering'})} },
  ];

  const priorityUpdates = [
    {
      id: '1',
      title: 'Fee Payment Reminder',
      details: 'The last date for fee payment is Nov 20, 2024.',
    },
    {
      id: '2',
      title: 'Exam Registration',
      details: 'Exam registration is open until Dec 5, 2024.',
    },
  ];

  // Shared Values
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Animate on mount
    translateY.value = withTiming(0, { duration: 800 });
    opacity.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const renderQuickService = ({ item, index }) => (
    <Animated.View
      entering={FadeIn.delay(index * 100)}
      exiting={FadeOut}
      style={[styles.serviceCard, { backgroundColor: item.color }]}
    >
      <TouchableOpacity
        style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
        onPress={item.click}
      >
        <FontAwesome5 name={item.icon} size={24} color="#fff" />
        <Text style={styles.serviceText}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );


  const ListHeader = () => (
    <Animated.View style={[styles.profileHeader, animatedStyle]}>
      {/* Welcome Section */}
      <View style={styles.premiumProfileHeader}>
        <View style={styles.profileRow}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/150', // Replace with actual profile picture URL
            }}
            style={styles.premiumAvatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.premiumWelcomeText}>Welcome, {MyDetails.name}!</Text>
            <Text style={styles.premiumTagline}>
              Empowering your learning journey at JDT Polytechnic.
            </Text>
          </View>
        </View>
      </View>

      {/* Priority Updates */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Priority Updates</Text>
        {priorityUpdates.map((update, index) => (
          <Animated.View
            key={update.id}
            entering={FadeIn.delay(index * 150)}
            exiting={FadeOut}
            style={styles.richUpdateCard}
          >
            <FontAwesome5
              name="bell"
              size={20}
              color="#f2a900"
              style={styles.notificationIcon}
            />
            <View style={styles.updateContent}>
              <Text style={styles.updateTitle}>{update.title}</Text>
              <Text style={styles.updateDetails}>{update.details}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Quick Services Title */}
      <Text style={styles.sectionTitle}>Quick Services</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      {
        load ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
          :
          <Animated.FlatList
            data={quickServices}
            keyExtractor={(item) => item.id}
            renderItem={renderQuickService}
            numColumns={3}
            columnWrapperStyle={styles.serviceRow}
            // ListHeaderComponent={ListHeader} // Add non-list content here
            contentContainerStyle={styles.container}
          />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#e8ecf4',
  },
  welcomeSection: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  subText: {
    fontSize: 14,
    color: '#6b7280',
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    marginBottom: 4,
  },
  updateDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  serviceRow: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceCard: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 8,
    margin: 4,
  },
  serviceText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  profileHeader: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    // elevation: 2,
    flexDirection: 'column',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#168fc2',
  },
  profileInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#075eec',
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#6b7280',
    marginTop: 4,
  },
  updateCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c9d3db',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 16,
  },
  richUpdateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#1A2A38', // Dark background
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  notificationIcon: {
    marginRight: 12,
  },
  updateContent: {
    flex: 1,
  },
  updateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff', // White text for premium look
  },
  updateDetails: {
    fontSize: 14,
    color: '#c9d3db', // Subtle grey for details
    marginTop: 4,
  },
  premiumProfileHeader: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#0D1E30', // Rich dark background
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#fff', // Vibrant border matching app theme
  },
  profileInfo: {
    flex: 1,
  },
  premiumWelcomeText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff', // White text for premium feel
  },
  premiumTagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#c9d3db', // Subtle grey for tagline
    marginTop: 4,
  },
});

