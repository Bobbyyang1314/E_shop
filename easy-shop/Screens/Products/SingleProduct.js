import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, Text, ScrollView, Button } from "react-native";
import {Box, Container, Heading} from "native-base";

const SingleProduct = (props) => {

    const [item, setItem] = useState(props.route.params.item);
    const [availability, setAvailability] = useState(null);

    return (
        <Box style={styles.container}>
            <ScrollView style={{ marginBottom: 80, padding: 5 }}>
                <View>
                    <Image
                        source={{
                            uri: item.image ? item.image
                                : 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png'
                        }}
                        resizeMode="contain"
                        style={styles.image}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <Heading style={styles.contentHeader}>{item.name}</Heading>
                    <Text style={styles.contentText}>{item.brand}</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.price}>$ {item.price}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button title='Add' />
                </View>
            </View>
        </Box>
    )
}

const styles = StyleSheet.create({
    leftContainer: {
        flex: 1,
        justifyContent: 'center', // Vertically center the content
        alignItems: 'flex-start', // Align items to the start (left)
        marginLeft: 20, // Add some left margin for the price text
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center', // Vertically center the content
        alignItems: 'flex-end', // Align items to the end (right)
        marginRight: 20, // Add some right margin for the "Add" button
    },
    container: {
        position: 'relative',
        height: '100%',
    },
    imageContainer: {
        backgroundColor: 'white',
        padding: 0,
        margin: 0
    },
    image: {
        width: '100%',
        height: 250
    },
    contentContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentHeader: {
        fontWeight: 'bold',
        marginBottom: 20
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Horizontally center the content
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        width: '100%',
    },
    price: {
        fontSize: 24,
        margin: 20,
        color: 'red'
    },
    availabilityContainer: {
        marginBottom: 20,
        alignItems: "center"
    },
    availability: {
        flexDirection: 'row',
        marginBottom: 10,
    }
})

export default SingleProduct;