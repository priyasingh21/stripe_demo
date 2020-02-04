import React, {PureComponent} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import stripe from 'tipsi-stripe';
import Button from './components/Button';

stripe.setOptions({
  publishableKey: 'pk_test_J2hgQJO22UgKOUbuexp1An1V00eTV8RS21',
});

export default class CardFormScreen extends PureComponent {
  static title = 'Card Form';

  state = {
    loading: false,
    token: null,
  };

  handleCardPayPress = async () => {
    try {
      this.setState({loading: true, token: null});
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        smsAutofillDisabled: true,
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            name: 'Priya Singh',
            line1: '1234',
            line2: 'aaaa',
            city: 'Surat',
            state: 'Gujarat',
            country: 'India',
            postalCode: '123456',
            email: 'priyaas786@gmail.com',
          },
        },
      });

      this.setState({loading: false, token});
    } catch (error) {
      this.setState({loading: false});
    }
  };

  render() {
    const {loading, token} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Card Form Example</Text>
        <Text style={styles.instruction}>
          Click button to show Card Form dialog.
        </Text>
        <Button
          text="Enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        />
        <View style={styles.token}>
          {token && (
            <Text style={styles.instruction}>Token: {token.tokenId}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
});
