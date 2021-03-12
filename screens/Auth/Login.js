import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Block, Text} from 'galio-framework';

import {Button, Icon, Input} from '../../components';
import {Images, argonTheme} from '../../constants';
import {useState} from 'react';

const {width, height} = Dimensions.get('screen');

const Login = ({handleSubmit}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('clicked ===>');
    const payload = {
      email: email.trim().toLowerCase(),
      password,
    };
    handleSubmit(payload);
  };
  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground source={Images.RegisterBackground} style={{width, height, zIndex: 1}}>
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.17} middle>
                <Text bold color="#8898AA" size={18}>
                  Login
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
                  <Block width={width * 0.8} style={{marginBottom: 15}}>
                    <Input
                      borderless
                      placeholder="Email"
                      value={email}
                      onChangeText={(e) => setEmail(e)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="ic_mail_24px"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block width={width * 0.8}>
                    <Input
                      password
                      borderless
                      placeholder="Password"
                      value={password}
                      onChangeText={(e) => setPassword(e)}
                      iconContent={
                        <Icon
                          size={16}
                          color={argonTheme.COLORS.ICON}
                          name="padlock-unlocked"
                          family="ArgonExtra"
                          style={styles.inputIcons}
                        />
                      }
                    />
                  </Block>
                  <Block row style={styles.passwordCheck}>
                    <Text bold size={14} color={argonTheme.COLORS.WARNING}>
                      Forgot password?
                    </Text>
                  </Block>
                  <Block middle>
                    {/* <TouchableOpacity onPress={() => handleLogin()}> */}
                    <Button
                      color="primary"
                      style={styles.createButton}
                      onPress={() => handleLogin()}>
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Login
                      </Text>
                    </Button>
                    {/* </TouchableOpacity> */}
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.4,
    backgroundColor: '#F4F5F7',
    borderRadius: 10,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 45,
  },
});

export default Login;
