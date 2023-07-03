import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import React from 'react';
// Added for debug
import { NativeBaseProvider, Box } from "native-base";
// import { Ionicons } from "@expo/vector-icons";

// Screens
import ProductContainer from './Screens/Products/ProductContainer';
import Header from "./Shared/Header";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Header/>
        <ProductContainer/>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

