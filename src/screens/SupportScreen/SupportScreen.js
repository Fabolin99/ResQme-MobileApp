import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import AppFooter from "../../components/AppFooter";

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.paragraph}>
          We're here to help! If you're experiencing issues or have any questions, please check our FAQ section in the app.
        </Text>
        <Text style={styles.paragraph}>
          If you can't find the answer you're looking for, feel free to contact our support team. We're available 24/7 and we'll get back to you as soon as possible.
        </Text>
        <Text style={styles.paragraph}>
          You can reach us at ResQmeContact@ResQme.org.
        </Text>
        <Text style={styles.paragraph}>
          Thank you for using our app!
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

export default SupportScreen;