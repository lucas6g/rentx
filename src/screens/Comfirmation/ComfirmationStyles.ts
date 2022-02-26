import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  align-items: center;
  padding-top: 96px;
  
  `

export const Content = styled.View`
align-items: center;
flex: 1;
padding-bottom: 80px;
justify-content: center;

`
export const Title = styled.Text`
   font-family: ${({ theme }) => theme.fonts.archivo_semi};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(30)}px;
margin-bottom: 16px;

`
export const Message = styled.Text`
   font-family: ${({ theme }) => theme.fonts.inter_regular};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(15)}px;
text-align: center;

line-height:${RFValue(25)}px;

`

export const DoneButton = styled(RectButton)`

  width: ${RFValue(80)}px;
  height:${RFValue(56)}px;
  align-items: center ;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.shape_dark};


`
export const DoneButtonText = styled.Text`

font-family: ${({ theme }) => theme.fonts.inter_medium};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(15)}px;


`

export const Footer = styled.View`
  padding: 80px 0;
  width: 100%;
  align-items: center;

`