import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'


export const Container = styled.View`
    
    width :${RFValue(109)}px;
    height: ${RFValue(92)}px;
    background-color: ${({ theme }) => theme.colors.background_gray};
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
  
    
   
`
export const Name = styled.Text`

font-family: ${({ theme }) => theme.fonts.inter_medium};
color: ${({ theme }) => theme.colors.text};
font-size: ${RFValue(13)}px;

    
`

