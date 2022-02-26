
import React from 'react';


import AppLoading from "expo-app-loading";

import 'intl'
import 'intl/locale-data/jsonp/pt-BR'


import { ThemeProvider } from 'styled-components'

import { Inter_400Regular, Inter_500Medium, } from "@expo-google-fonts/inter"
import { useFonts, Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from "@expo-google-fonts/archivo"
import theme from './src/styles/theme'
import { Routes } from './src/routes';
import { AuthProvider } from './src/context/AuthContext';


export default function App() {

  const [fonstsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })


  if (!fonstsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider >
        <Routes />
      </AuthProvider>
    </ThemeProvider>



  );
}

