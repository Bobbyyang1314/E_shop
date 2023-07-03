import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';

import ProductList from './ProductList';

const data = require('../../assets/data/products.json');

const ProductContainer = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(data);
        return () => {
            setProducts([])
        }
    }, [])

    return (
        //Added style={{ backgroundColor: 'gainsboro' }}
        <View style={{ backgroundColor: 'gainsboro' }}>
            <Text>Product Container</Text>
            <View style={{marginTop: 100}}>
                <FlatList
                    data={products}
                    numColumns={2}
                    renderItem={({item}) => <ProductList
                        key={item.id}
                        item={item}/>}
                    keyExtractor={item => item.name}
                />
            </View>

        </View>
    )
}

export default ProductContainer
