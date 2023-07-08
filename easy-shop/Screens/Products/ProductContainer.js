import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ActivityIndicator, FlatList, Dimensions, Platform} from 'react-native';
import {Container, Icon, Input, Text, Box, HStack, Heading, VStack, Divider} from 'native-base';

import ProductList from './ProductList';
import SearchedProduct from './SearchedProduct';
import Banner from "../../Shared/Banner";
import Header from "../../Shared/Header";
import CategoryFilter from "./CategoryFilter";


const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');

const height = Dimensions.get("window");


const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [active, setActive] = useState();
    const [productsCtg, setProductsCtg] = useState([]);
    const [initialState, setInitialState] = useState([]);

    function SearchBar() {
        // https://docs.nativebase.io/next/building-search-bar#page-title
        return <VStack w="100%" space={5} alignSelf="center">
            {focus === true ? (
                <Input
                    placeholder="Search"
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                    variant="filled"
                    width="100%"
                    borderRadius="md"
                    py="2"
                    px="2"
                    rightElement={<Text
                        onPress={onBlur}
                        marginRight={3}
                        outlineColor={"black"}
                        color={"gray.400"}>Back</Text>}
                />
            ) : (
                <Input
                    placeholder="Search"
                    onFocus={openList}
                    onChangeText={(text) => searchProduct(text)}
                    variant="filled"
                    width="100%"
                    borderRadius="md"
                    py="2"
                    px="2"
                />
            )}
            {/*{focus === true ? (*/}
            {/*    <Text onPress={onBlur}>Back</Text>*/}
            {/*) : null}*/}
        </VStack>
    }



    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(null);
        setCategories(productCategories);
        setActive(-1);
        setInitialState(data);

        return () => {
            setProducts([]);
            setProductsFiltered([]);
            setFocus();
            setCategories([]);
            setActive();
            setInitialState();
        }
    }, [])

// Product Methods
    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().startsWith(text.toLowerCase()))
        );
    };

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
                        products.filter((i) => i.category._id.$oid === ctg),
                        setActive(true)
                    ),
                ];
        }
    }

    return (
        <Box alignItems="center">
            <Header/>
            <SearchBar/>
            <Banner/>
            {/*focus mode or blur mode*/}
            {focus === true ? (
                <View style={{marginTop: 10}}>
                    {/*<Banner/>*/}
                    <Box style={{marginTop: -10}}>
                        <SearchedProduct
                            productsFiltered={productsFiltered}
                        />
                    </Box>

                </View>
            ) : (
                <View style={styles.container}>
                    {/*<Text>Product Container</Text>*/}
                    <View style={{marginTop: 3}}>
                        <Banner/>
                        <CategoryFilter
                            categories={categories}
                            categoriesFilter={changeCtg}
                            productsCtg={productsCtg}
                            active={active}
                            setActive={setActive}
                        />
                        <FlatList
                            data={products}
                            numColumns={2}
                            renderItem={({item}) => <ProductList
                                key={item.brand}
                                item={item}/>}
                            keyExtractor={item => item.brand}
                        />
                    </View>
                </View>
            )}
        </Box>
    )
}

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
        marginTop: 3
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductContainer
