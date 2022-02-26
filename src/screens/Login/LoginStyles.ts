import { getStatusBarHeight, } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";



export const Container = styled.View`
   
    background-color: ${({ theme }) => theme.colors.background_gray};
    
  
    padding: 0 32px;
    padding-top: ${getStatusBarHeight() + 116}px;
   

`

export const Title = styled.Text`
color: ${({ theme }) => theme.colors.title_two};
   font-family: ${({ theme }) => theme.fonts.archivo_semi};
   font-size: ${RFValue(40)}px;
   margin-bottom: 16px;



`
export const SubTitle = styled.Text`
color: ${({ theme }) => theme.colors.text};
   font-family: ${({ theme }) => theme.fonts.inter_regular};
   font-size: ${RFValue(15)}px;
   line-height:${RFValue(25)}px;
`

export const InputsContainer = styled.View`
    width: 100%;
    margin-top: 64px;
    
`
export const ForgotPasswordText = styled.Text`
    color: ${({ theme }) => theme.colors.text};
   font-family: ${({ theme }) => theme.fonts.inter_regular};
   font-size: ${RFValue(13)}px;
   margin: 24px 0px;
`