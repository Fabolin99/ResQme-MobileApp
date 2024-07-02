import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AppFooter from "../../components/AppFooter";
import { useNavigation } from "@react-navigation/native";

const PrivacyTermsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your personal information.
        </Text>
        <Text style={styles.paragraph}>
          When you use our app, we may collect information that you provide to us, such as your name, email address, and any other information you choose to provide.
        </Text>
        <Text style={styles.paragraph}>
          We use this information to provide and improve our services, communicate with you, and comply with our legal obligations.
        </Text>
        <Text style={styles.paragraph}>
          We implement a variety of security measures to maintain the safety of your personal information.
        </Text>
        <Text style={styles.paragraph}>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.
        </Text>
        <Text style={styles.paragraph}>
          By using our app, you consent to our Privacy Policy. If we decide to change our Privacy Policy, we will post those changes on this page.
        </Text>
      </ScrollView>
      <AppFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PrivacyTermsScreen;