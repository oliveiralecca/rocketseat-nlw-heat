import React from 'react';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import { Home }  from './src/screens/Home';
import { AuthProvider } from './src/hooks/auth';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  }) //utilizando as fontes importadas do google fonts com o Expo

  if (!fontsLoaded) {
    return <AppLoading />
  } //para garantir que as fontes personalizadas serão carregadas antes da renderização do app. esse componente importado do Expo segura a tela de splash enquanto as fontes não são totalmente carregadas

  return (
    <AuthProvider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Home />
    </AuthProvider>
  );
}
