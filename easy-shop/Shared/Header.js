import React from "react"
import { StyleSheet, Image, SafeAreaView } from "react-native"
import { HStack, View, Text, StatusBar, Icon, Input } from "native-base"

import { Ionicons } from "@expo/vector-icons";

const Header = () => {
    return (
        <SafeAreaView style={styles.header}>
            <HStack alignItems="center" justifyContent="center" p={4} mt={8}>
            <Image
                source={require('../assets/e-shop-logo-temp.png')}
                alt="Logo"
                resizeMode="contain"
                h={12}
                style={{ height: 50 }}
            />
        </HStack>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    header: {
        width: "100%",
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "center",
        padding: -20,
        marginTop: 100 // Todo: Delete
    },
})

export default Header;


// const Header = () => {
//     return(
//         // Set on the area cannot touch.
//         <SafeAreaView style={styles.header}>
//             <Image
//                 // Changed to E-shop_Application\easy-shop\assets\e-shop-logo-temp.png
//                 source={require("../assets/e-shop-logo-temp.png")}
//                 resizeMode="contain"
//                 style={{ height: 50 }}
//             />
//         </SafeAreaView>
//     )
// }

function SearchBar() {
    return <VStack my="4" space={5} w="100%" maxW="300px" divider={<Box px="2">
            <Divider />
          </Box>}>
        <VStack w="100%" space={5} alignSelf="center">
          <Heading fontSize="lg">Cupertino</Heading>
          <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
        </VStack>
  
        <VStack w="100%" space={5} alignSelf="center">
          <Heading fontSize="lg">Material</Heading>
          <Input placeholder="Search People & Places" width="100%" borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} InputRightElement={<Icon m="2" mr="3" size="6" color="gray.400" as={<MaterialIcons name="mic" />} />} />
        </VStack>
      </VStack>;
  }
  
  function Example() {
    return <Center flex={1} px="2">
        <SearchBar />
      </Center>;
  }