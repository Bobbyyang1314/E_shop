import React, { useState } from "react";
import { Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Container, View, Icon, Box, Radio, Select } from "native-base";

const methods = [
  { name: 'Cash on Delivery', value: 1 },
  { name: 'Bank Transfer', value: 2 },
  { name: 'Card Payment', value: 3 }
];

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'Visa', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 }
];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <Box style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose your payment method</Text>
      </View>

      <Radio.Group
        name="paymentMethod"
        value={selected}
        onChange={setSelected}
      >
        {methods.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() => setSelected(item.value)}
              style={styles.paymentContainer}
            >
              <View style={styles.leftContainer}>
                <Text style={{ padding: 8 }}>{item.name}</Text>
              </View>
              <View style={styles.rightContainer}>
                <Radio value={item.value} />
              </View>
            </TouchableOpacity>
          );
        })}
      </Radio.Group>

      {selected === 3 ? (
        <Select
          mode="dropdown"
          iosIcon={<Icon name={"arrow-down"} />}
          headerStyle={{ backgroundColor: "orange" }}
          headerBackButtonTextStyle={{ color: "#fff" }}
          headerTitleStyle={{ color: "#fff" }}
          selectedValue={card}
          onValueChange={(x) => setCard(x)}
          style={styles.selectContainer}
        >
          {paymentCards.map((c, index) => {
            return <Select.Item key={c.name} label={c.name} value={c.name} />;
          })}
        </Select>
      ) : null}

      <View style={styles.confirmButtonContainer}>
        <Button
          title={"Confirm"}
          onPress={() => props.navigation.navigate("Confirm", { order })}
        />
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 16, // Add horizontal padding to space the content
    width: "100%", // Make each option occupy the entire screen width
  },
  leftContainer: {
    flex: 1, // Expand to fill available space
  },
  rightContainer: {
    marginLeft: "auto",
  },
  selectContainer: {
    marginTop: 8,
  },
  confirmButtonContainer: {
    marginTop: 60,
    alignSelf: "center",
  },
});

export default Payment;