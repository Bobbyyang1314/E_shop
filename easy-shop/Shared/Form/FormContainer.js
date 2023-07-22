import React from 'react';
import { ScrollView, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.title}</Text>
        {props.children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;