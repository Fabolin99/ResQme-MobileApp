import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AppFooter from "../../components/AppFooter";

const TermsOfServiceScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Welcome to Our App!</Text>
        <Text style={styles.paragraph}>
          We're delighted to have you on board. By using our services, you're agreeing to our terms. We've made them easy to understand, but please read them carefully.
        </Text>
        <Text style={styles.paragraph}>
          We're committed to providing a great service, but we may have to suspend or stop our services if you don't comply with our terms or policies, or if we're investigating any potential misconduct.
        </Text>
        <Text style={styles.paragraph}>
          While you're using our services, you'll come across lots of information and content. Please be aware that the ownership of this content remains with the original owner; you'll need their permission (or legal permission) to use it.
        </Text>
        <Text style={styles.paragraph}>
          We're proud of the community we've built, and we expect all our users to respect each other. That means not posting anything that belongs to someone else, and not posting anything inappropriate or offensive.
        </Text>
        <Text style={styles.paragraph}>
          We'll occasionally send you service announcements, administrative messages, and other important information. You can opt out of some of these communications in your account settings.
        </Text>
        <Text style={styles.paragraph}>
          Lastly, please remember to always use our services responsibly. For example, don't use our app while driving or in any situation where it could distract you and cause harm.
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

export default TermsOfServiceScreen;
