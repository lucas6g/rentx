import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    
      width : 100%;
    
    flex-direction:row ;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    margin-top: 2px;
    margin-bottom: 16px;
    background-color: ${({ theme }) => theme.colors.background_white}; 
 
`
export const Dates = styled.View`
    flex-direction: row;
  
  
    align-items: center;
`

export const Period = styled.Text`
    font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(10)}px;
text-transform: uppercase;

`
export const Date = styled.Text`
    font-family: ${({ theme }) => theme.fonts.inter_regular};
color: ${({ theme }) => theme.colors.title};
font-size: ${RFValue(13)}px;

`
