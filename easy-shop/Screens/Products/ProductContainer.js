import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import { Box, HStack, VStack, Container, Icon, Input, Text, ScrollView } from 'native-base';
//import { HStack, VStack, Container, Icon, Input, Text, Center, Box, Divider, Item } from "native-base";
import { KeyboardAvoidingView } from 'react-native';

import ProductList from './ProductList';
import Header from '../../Shared/Header';

import { Ionicons } from "@expo/vector-icons";
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from "./CategoryFilter";

const {height} = Dimensions.get('window');

const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

const ProductContainer = () => {

    const SearchBar = () => {
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
                rightElement={<Text
                    onPress={onBlur}
                    marginRight={3}
                    outlineColor={"black"}
                    color={"gray.400"}>Back</Text>}
            />
        </VStack>
    }

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [productsCtg, setProductsCtg] = useState([]);
    const [initialState, setInitialState] = useState([]);

    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false);
        setCategories(productCategories);
        setProductsCtg(data);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
            setProductsCtg([]);
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

    const changeCtg = (ctg) => {
        {
            ctg === 'all'
                ? [setProductsCtg(initialState), setActive(true)]
                : [
                    setProductsCtg(
                        products.filter((i) => i.category.$oid === ctg),
                        setActive(true)
                    ),
                ];
        }
    }

    return (
        // <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <Box>

                {/*SearchBar*/}
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
                        rightElement={<Text
                            onPress={onBlur}
                            marginRight={3}
                            outlineColor={"black"}
                            color={"gray.400"}>Back</Text>}
                    />
                </VStack>


                {focus === true ? (
                    <SearchedProduct productsFiltered={productsFiltered} />
                ) : (
                    <ScrollView>
                        <View>
                            <View style={styles.bannerContainer}>
                                <Banner />
                            </View>
                            <View style={styles.categoryFilterContainer}>
                                <CategoryFilter
                                    categories={categories}
                                    categoriesFilter={changeCtg}
                                    productsCtg={productsCtg}
                                    active={active}
                                    setActive={setActive}
                                />
                            </View>
                            {productsCtg.length > 0 ? (
                                <View style={styles.listContainer}>
                                    {productsCtg.map((item) => {
                                        return (
                                            <ProductList
                                                key = {item._id.$oid}
                                                item = {item}
                                            />
                                        )
                                    })}
                                </View>
                            ) : (
                                <View>
                                    <Text>No products found</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                )}

            </Box>
        // </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gainsboro",
    },
    bannerContainer: {
        alignItems: "center",
        marginTop: 10,
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    categoryFilterContainer: {
        marginTop: 10,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
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



{/* <View style = {[styles.center, {height: '40%'}]}>
                <Text>No products found</Text>
              </View> */}


// rightElement={<Icon
//   onPress={onBlur}
//   marginRight={3}
//   outlineColor={"black"}
//   color={"gray.400"}
//   as={<Ionicons name="ios-close"/>} />
// }