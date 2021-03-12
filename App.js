import React, {useState} from 'react';
import AppLoading from 'expo-app-loading';
import {useFonts} from '@use-expo/font';
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';

import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';

// Before rendering any navigation stack
import {enableScreens} from 'react-native-screens';
enableScreens();

import Screens from './navigation/Screens';
import {argonTheme} from './constants';
import {BASE_URL, TOKEN} from './constants/variables';
import {utils} from './utils';

export default (props) => {
  const [isLoadingComplete, setLoading] = useState(false);
  let [fontsLoaded] = useFonts({
    ArgonExtra: require('./assets/font/argon.ttf'),
  });

  function _handleLoadingError(error) {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  }

  function _handleFinishLoading() {
    setLoading(true);
  }

  const authLink = setContext((_, {headers}) => {
    utils.loadFromStorage(TOKEN).then((res) => {
      return {
        headers: {
          ...headers,
          authorization: res ? `Bearer ${res}` : '',
        },
      };
    });
  });

  const httpLink = new HttpLink({
    uri: BASE_URL,
    onError: (e) => {
      console.log(e);
    },
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  if (!fontsLoaded && !isLoadingComplete) {
    return <AppLoading onError={_handleLoadingError} onFinish={_handleFinishLoading} />;
  } else if (fontsLoaded) {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <GalioProvider theme={argonTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      </ApolloProvider>
    );
  } else {
    return null;
  }
};
