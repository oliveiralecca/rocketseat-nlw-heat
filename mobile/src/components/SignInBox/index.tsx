import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../theme';
import { Button } from '../Button';
import { styles } from './styles';
import { useAuth } from '../../hooks/auth'

export function SignInBox() {
  const { signIn, isSignIn } = useAuth()

  return (
    <View style={styles.container}>
      <Button icon="github" title='ENTRAR COM O GITHUB' color={COLORS.BLACK_PRIMARY} backgroundColor={COLORS.YELLOW} onPress={signIn} isLoading={isSignIn} />
    </View>
  );
}
