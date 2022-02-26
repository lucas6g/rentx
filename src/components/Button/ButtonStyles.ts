import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
    color?: string
}


export const Container = styled(RectButton) <ContainerProps>` 
    width: 100%;
    height: ${RFValue(56)}px;
    background-color: ${({ theme, color }) => color ? color : theme.colors.main};
    
    opacity: ${({ enabled }) => enabled ? 1 : 0.5};

    justify-content: center;
    align-items: center;
   

`

interface ButtonTextProps {
    color?: string
}


export const ButtonText = styled.Text<ButtonTextProps>`
     color: ${({ theme, color }) => color ? color : theme.colors.background_white};
     font-size: ${RFValue(15)}px;
    font-family:${({ theme }) => theme.fonts.inter_medium} ;


`