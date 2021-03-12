import {Alert, Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {USER_DETAILS} from '../constants/variables';

export const utils = {
  showAlert: function (message, title) {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        Alert.alert(`${title ? title : ''}`, `${message}`);
      }, 50);
    } else {
      Alert.alert(`${title ? title : ''}`, `${message}`);
    }
  },

  showConfirmationAlert: function (message, proceedFunction) {
    Alert.alert(
      '',
      `${message}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            proceedFunction();
          },
        },
      ],
      {cancelable: true},
    );
  },

  showErrorAlert: function (message, proceedFunction) {
    Alert.alert(
      '',
      `${message}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Try Again',
          onPress: () => {
            proceedFunction();
          },
        },
      ],
      {cancelable: true},
    );
  },

  async saveToStorage(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(valueToSave));
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadFromStorage(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      return JSON.parse(item);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async getUserDetails() {
    try {
      const details = await this.loadFromStorage(USER_DETAILS);
      return details;
    } catch (error) {
      console.log('AsyncStorage User Details Error: ' + error.message);
    }
  },
};
