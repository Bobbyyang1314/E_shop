import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Box, HStack, VStack, Container, Icon, Input, Text } from 'native-base';
//import { HStack, VStack, Container, Icon, Input, Text, Center, Box, Divider, Item } from "native-base";
import { KeyboardAvoidingView } from 'react-native';

import ProductList from './ProductList';
// import Header from '../../Shared/Header';

import { Ionicons } from "@expo/vector-icons";
import SearchedProduct from './SearchedProducts';

const data = require('../../assets/data/products.json');

const ProductContainer = () => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        return () => {
            setProducts([])
            setProductsFiltered([])
            setFocus()
        }
    }, [])

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }

    const openList = () => {
        setFocus(true);
    }

    const onBlur = () => {
        setFocus(false);
    }
    
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <Box>
        <VStack space={2} alignItems="center" mt={4}>
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
            variant="filled"
            width="100%"
            borderRadius="10"
            py="1"
            px="2"
            InputLeftElement={
              <Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />
            }
          />
        </VStack>
        {focus == true ? (
          <SearchedProduct productsFiltered={productsFiltered} />
        ) : (
          <View style={styles.container}>
            <Text>Product Container</Text>
            <View style={styles.listContainer}>
              <FlatList
                data={products}
                numColumns={2}
                renderItem={({ item }) => <ProductList key={item.brand} item={item} />}
                keyExtractor={(item) => item.name}
              />
            </View>
          </View>
        )}
      </Box>
    </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    }
});

export default ProductContainer


// <Header searchBar rounded>
// <Item>
//     <Icon name="ios-search"/>
//     <Input
//         placeholder="Search"
//         // onFocus={}
//         // onChangeText={(text) => }
//     />
// </Item>
// </Header>
