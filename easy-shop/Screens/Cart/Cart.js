import React from "react";
import {Dimensions, StyleSheet, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import {Box, Container, Text, View} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";


import { connect } from "react-redux";
import * as actions from '../../Redux/Actions/cartActions'

import Icon from 'react-native-vector-icons/FontAwesome'

const { height, width} = Dimensions.get("window");
const Cart = (props) => {

    let total = 0;
    props.cartItems.forEach(cart => {
        return (total += cart.product.price)
    });

    return (
        // <View style={{ flex: 1 }}>
        //     {props.cartItems.map(x => {
        //         return (
        //             <Text>{x.product.name}</Text>
        //         )
        //     })}
        // </View>
        <ScrollView>
            {props.cartItems.length ? (
                <Container>
                    {/*<View style={{ alignItems: "center" }}>*/}
                    {/*    <Text style={{ fontSize: 24, fontWeight: "bold" }}>Cart</Text>*/}
                    {/*</View>*/}
                    <SwipeListView
                        data={props.cartItems}
                        renderItem={(data) => (
                            <CartItem item={data} />
                        )}
                        renderHiddenItem={(data) => (
                            <View style={styles.hiddenContainer}>
                                <TouchableOpacity
                                    style={styles.hiddenButton}
                                    onPress={() => props.removeFromCart(data.item)}
                                >
                                    <Icon name="trash" color={"white"} size={30} />
                                </TouchableOpacity>
                            </View>
                        )}
                        disableRightSwipe={true}
                        previewOpenDelay={3000}
                        friction={1000}
                        tension={40}
                        leftOpenValue={75}
                        stopLeftSwipe={75}
                        rightOpenValue={-75}
                    />

                    {/*total add checkout*/}
                    <View style={styles.bottomContainer}>
                        <View style={styles.leftContainer}>
                            <Text style={styles.price}>$ {total}</Text>
                        </View>
                        <View style={styles.rightContainer}>
                            <Button
                                title='Clear'
                                onPress={() => props.clearCart()}
                            />
                        </View>
                        <View style={styles.rightContainer}>
                            <Button
                                title='Checkout'
                                onPress={() => props.navigation.navigate('Checkout')}
                            />
                        </View>
                    </View>
                </Container>
            ) : (
                <Container style={styles.emptyContainer}>
                    <Text>Looks your cart is empty</Text>
                    <Text>Add products to your cart</Text>
                </Container>
            )}
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    const { cartItems } = state
    return {
        cartItems: cartItems
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart()),
        removeFromCart: (item) => dispatch(actions.removeFromCart(item))
    }
}

const styles = StyleSheet.create({
    leftContainer: {
        marginRight: 'auto',
    },
    rightContainer:{
        marginLeft: 'auto',
    },
    emptyContainer: {
        height: height,
        alignItems: "center",
        marginLeft:40,
        justifyContent: "center",
    },
    bottomContainer: {
        flexDirection: 'row',
        // position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        backgroundColor: 'white',
        elevation: 20
    },
    price: {
        fontSize: 18,
        margin: 20,
        color: 'red'
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    hiddenButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 25,
        height: 70,
        width: width / 1.2
    },
    ListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: "flex-start"
    },
    body: {
        // body 样式
        margin: 10,
        alignItems: "center",
        flexDirection: "row"
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);