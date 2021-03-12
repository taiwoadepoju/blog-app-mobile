import React from 'react';
import Login from '../../screens/Auth/Login';
import {useMutation} from '@apollo/client';
import LOGIN_USER from '../../mutations/loginUser';
import {Loader} from '../../components';
import {utils} from '../../utils';

const LoginContainer = ({route, navigation}) => {
  const [loginUser, {error, loading}] = useMutation(LOGIN_USER, {
    onError: (error) => {
      utils.showAlert(error);
      console.log('Error', error);
    },
    onCompleted: () => {
      if (error) {
        console.log({error});
        utils.showAlert(error.message);
        return;
      }
    },
  });

  const handleSubmit = (payload) => {
    loginUser(payload);
  };

  return (
    <>
      {loading && <Loader loading={true} />}
      <Login route={route} navigation={navigation} handleSubmit={handleSubmit} />
    </>
  );
};

export default LoginContainer;
