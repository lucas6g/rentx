import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

import FastImage from 'react-native-fast-image'

export const Button = styled(RectButton)`
    width: 100%;
    height: ${RFValue(126)}px;
    background-color: ${({ theme }) => theme.colors.background_white};
    
   

    flex-direction: row;
    align-items: center;
    
    padding:  24px;
    justify-content: space-between;
    margin-bottom: 16px;
    
    
`

export const Container = styled.View`
    width: 100%;
    height: ${RFValue(126)}px;
    background-color: ${({ theme }) => theme.colors.background_white};
    
   

    flex-direction: row;
    align-items: center;
    
    padding:  24px;
    justify-content: space-between;
  
    
    
`




export const CardInfo = styled.View`
`
export const CarBrand = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(10)}px;
text-transform: uppercase;


`
export const CarName = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.title};
font-size: ${RFValue(15)}px;


`
export const RentPrice = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.main};
font-size: ${RFValue(15)}px;




`
export const About = styled.View`

flex-direction: row;
align-items: center;
margin-top: 16px;
`
export const Rent = styled.View`

margin-right: 24px;

`
export const Period = styled.Text`

font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(10)}px;
text-transform: uppercase;

`
export const CarFuelType = styled.View`


`
export const CarImage = styled(FastImage)`
    width: ${RFValue(167)}px;
    height:${RFValue(85)}px;

`
