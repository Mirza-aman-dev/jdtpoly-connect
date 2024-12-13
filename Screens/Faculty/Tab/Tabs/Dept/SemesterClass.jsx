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
    Button,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    withTiming,
    FadeIn,
    FadeOut,
} from 'react-native-reanimated';

import { db } from '../../../../../Backend/Firebase/config'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import MoveSemesterModal from '../../../../../Components/Modals/MoveSemesterModal';

export default function SemesterClass({ route, navigation }) {

    const { dept, sem } = route.params;
    // const dept ='ComputerEngieering' ,sem = 'semester6'

    const [Data, setData] = useState([]);

    const fetchComputerEngineeringSemester6Data = async () => {
        try {
            const deptt = dept.replace(/\s+/g, '')
            let final_hook = `${deptt}_${sem}`
            // Reference to the 'ComputerEngineering_semester6' collection
            const querySnapshot = await getDocs(collection(db, final_hook));

            // Iterate through the documents and log the data
            // const data = querySnapshot.docs.map(doc => doc.data());
            const usersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(final_hook);
            setData(usersList);
            return usersList;  // Returns the data from the collection
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    // const { dept,semester } = route.params;
    // const dept = 'ComputerEngineering_semester6'
    // const dept = 'sdf';

    const quickServices = [
        { id: '1', name: 'Attendance', icon: 'check-circle', color: '#075eec' },
        { id: '2', name: 'Notify', icon: 'bell', color: '#12c7ed' },
        { id: '3', name: 'Exams', icon: 'clipboard', color: '#168fc2' },
        { id: '4', name: 'Assignment', icon: 'edit', color: '#f2a900' },
        { id: '5', name: 'Leaderboard', icon: 'trophy', color: '#ff5722' },
        { id: '6', name: 'Move', icon: 'caravan', color: '#ff5722', click: () => { setModalOpen(true) } },
    ];

    const sampleStData = [
        { id: 1, name: 'Mirza Aman', dp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s', regNo: '2201130781', contact: '8129004341', roll: 1 },
        { id: 2, name: 'Mirza Aman', dp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s', regNo: '2201130782', contact: '8129004342', roll: 2 },
        { id: 3, name: 'Mirza Aman', dp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s', regNo: '2201130783', contact: '8129004343', roll: 3 },
        { id: 4, name: 'Mirza Aman', dp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s', regNo: '2201130784', contact: '8129004344', roll: 4 },
        { id: 5, name: 'Mirza Aman', dp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s', regNo: '2201130785', contact: '8129004345', roll: 5 },
        { id: 6, name: 'Mirza Aman 6', dp: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s', regNo: '2201130786', contact: '8129004346', roll: 6 },
    ]

    // Shared Values
    const translateY = useSharedValue(50);
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Animate on mount
        translateY.value = withTiming(0, { duration: 800 });
        opacity.value = withTiming(1, { duration: 800 });
        fetchComputerEngineeringSemester6Data();
    }, []);

    const check = () => {
        console.log(sampleStData[sampleStData.length - 1].name)
    }

    const renderQuickService = ({ item, index }) => (
        <Animated.View
            entering={FadeIn.delay(index * 100)}
            exiting={FadeOut}
            style={[styles.newCard, { backgroundColor: item.color, marginRight: quickServices[quickServices.length - 1].name === item.name ? 15 : 0 }]}
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

    const renderStudents = ({ item, index }) => {
        return (
            <View key={index} style={styles.studentCard}>
                <View style={styles.studentCardPrimary} >
                    <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEk4Wfw-KQjsAwhQ-Z33e8_eqsTHPAc9cuFQ&s' }} style={styles.studentImage} />
                    <View style={styles.studentTextCard} >
                        <Text style={styles.studentText}>Name : {item.fullName}</Text>
                        <Text style={styles.studentText}>Roll No : {item.rollNumber}</Text>
                        <Text style={styles.studentText}>Reg No :{item.regNum}</Text>
                    </View>
                </View>
                <View style={styles.studentActionsCard}>
                    <TouchableOpacity style={styles.studentActionButton}>
                        <Text style={styles.studentActionText}>Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.studentActionButton}>
                        <Text style={styles.studentActionText}>Progress Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.studentActionButton}>
                        <Text style={[styles.studentActionText, { color: 'red' }]}>Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }

    const [ModalOpen, setModalOpen] = useState(false)

    const moveSem = async (toSem) => {
        console.log(`Moved to ${toSem}`);
        const deptt = dept.replace(/\s+/g, '')
        let final_hook = `${deptt}_${sem}`
        let final_dest_hook = `${deptt}_${toSem}`

        try {
            // Fetch all documents from the source collection
            const snapshot = await getDocs(collection(db, final_hook));

            if (snapshot.empty) {
                console.log('Source collection is empty.');
                return;
            }

            // Move documents to the destination collection
            const movePromises = snapshot.docs.map((document) => {
                const docData = document.data();
                return setDoc(doc(db, final_dest_hook, document.id), docData); // Copy document to destination
            });

            // Wait for all move operations to complete
            await Promise.all(movePromises);
            console.log('All documents moved to the destination collection.');

            // Delete documents from the source collection
            const deletePromises = snapshot.docs.map((document) =>
                deleteDoc(doc(db, final_hook, document.id))
            );

            // Wait for all delete operations to complete
            await Promise.all(deletePromises);
            setModalOpen(false)
            navigation.navigate('FacSc',{dept:dept,sem:final_dest_hook})
            console.log('All documents deleted from the source collection.');
        } catch (error) {
            console.error('Error moving and deleting documents:', error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <TouchableOpacity style={{ flexDirection: 'row', padding: 20 }} onPress={() => navigation.goBack()} >
                <FontAwesome5 name="arrow-left" size={20} color="#000" />
                <Text style={{ fontSize: 17, fontWeight: '600', marginLeft: 15 }} >Back</Text>
            </TouchableOpacity>
            <View style={{ height: 120 }} >
                <Animated.FlatList
                    horizontal
                    data={quickServices}
                    keyExtractor={(item) => item.id}
                    renderItem={renderQuickService}
                    // numColumns={3}
                    // columnWrapperStyle={styles.serviceRow}
                    contentContainerStyle={styles.container}
                />
            </View>
            {/* <Button title='check' onPress={() => check()} /> */}
            <Animated.FlatList
                data={Data}
                keyExtractor={(item) => item.id}
                renderItem={renderStudents}
                contentContainerStyle={styles.container2}
            />
            <MoveSemesterModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} isSem6={sem == 'semester6' ? true : false} onPress={moveSem} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        backgroundColor: '#e8ecf4',
        // flex: 1,
    },
    container2: {
        paddingTop: 10,
        paddingBottom: 10,
        // flex: 1,
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
        height: '10%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 8,
        margin: 4,
    },
    serviceText: {
        marginTop: 8,
        fontSize: 12,
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
    newCard: {
        height: 90,
        // width:90,
        padding: 5,
        flex: 1,
        marginLeft: 10,
        borderRadius: 10,
        aspectRatio: 1
    },
    studentCard: {
        height: 150,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 10,
        width: '80%',
        // flex: 1,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
        elevation: 5,
    },
    studentCardPrimary: {
        height: '60%',
        flexDirection: 'row'
    },
    studentImage: {
        width: 70,
        height: '100%',
        marginLeft: 5,
    },
    studentTextCard: {
        paddingLeft: 12,
        justifyContent: 'center',
    },
    studentText: {
        textAlign: 'left',
        fontSize: 15,
        fontWeight: '600',
    },
    studentActionsCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    studentActionButton: {
        padding: 5,
    },
    studentActionText: {
        fontSize: 13,
        fontWeight: '500',
    },
});

