import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";

const AdoptionInfoScreen = () => {
    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Adoption Process Information</Text>
                <Text style={styles.text}>
                    Welcome to our adoption process information page. Here we explain how you can adopt a pet from us.
                </Text>
                <Text style={styles.text}>
                    Step 1: Fill out the adoption form with your details and why you want to adopt.
                </Text>
                <Text style={styles.text}>
                    Step 2: Our team will review your application and contact you if you are a good match.
                </Text>
                <Text style={styles.text}>
                    Step 3: If approved, you will have a meet and greet with the pet to ensure compatibility.
                </Text>
                <Text style={styles.text}>
                    Step 4: Complete the adoption paperwork and take your new friend home!
                </Text>
            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default AdoptionInfoScreen;