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
    withTiming,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';
export default function SelectSemester({ route,navigation }) {

    const { dept } = route.params;
    // const dept = 'sdf';

    const quickServices = [
        { id: '1', name: 'Semester 1', icon: 'book-open', color: '#075eec', click : ()=>{navigation.navigate('FacSc',{dept:dept,sem:'semester1'})} },
        { id: '2', name: 'Semester 2', icon: 'clipboard-list', color: '#12c7ed', click : ()=>{navigation.navigate('FacSc',{dept:dept,sem:'semester2'})} },
        { id: '3', name: 'Semester 3', icon: 'calendar-alt', color: '#168fc2', click : ()=>{navigation.navigate('FacSc',{dept:dept,sem:'semester3'})} },
        { id: '4', name: 'Semester 4', icon: 'tasks', color: '#f2a900', click : ()=>{navigation.navigate('FacSc',{dept:dept,sem:'semester4'})} },
        { id: '5', name: 'Semester 5', icon: 'project-diagram', color: '#ff5722', click : ()=>{navigation.navigate('FacSc',{dept:dept,sem:'semester5'})} },
        { id: '6', name: 'Semester 6', icon: 'graduation-cap', color: '#9c27b0', click : ()=>{navigation.navigate('FacSc',{dept:dept,sem:'semester6'})} },
    ];

    // Shared Values
    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Animate on mount
        translateY.value = withTiming(0, { duration: 800 });
        opacity.value = withTiming(1, { duration: 800 });
    }, []);

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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <TouchableOpacity style={{flexDirection:'row',padding:20}} onPress={() => navigation.goBack()} >
                <FontAwesome5 name="arrow-left" size={20} color="#000" />
                <Text style={{fontSize:17,fontWeight:'600',marginLeft:15}} >{dept}</Text>
            </TouchableOpacity>
            <Animated.FlatList
                data={quickServices}
                keyExtractor={(item) => item.id}
                renderItem={renderQuickService}
                numColumns={3}
                columnWrapperStyle={styles.serviceRow}
                contentContainerStyle={styles.container}
            />
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

