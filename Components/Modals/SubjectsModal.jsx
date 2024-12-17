import { Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SubjectsModal = (props) => {

    const {visible,setVisible,data} = props;

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        >
            <View style={styles.container}>
                <Text>Subjects</Text>
            </View>
        </Modal>
    )
}

export default SubjectsModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
})