import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
    color?: string
}


export const Container = styled(RectButton) <ContainerProps>` 
  
    height: ${RFValue(40)}px;
    width: ${RFValue(40)}px;
   

    background-color: ${({ theme }) => theme.colors.main};
    justify-content: center;
    align-items: center;

    position: absolute;

    right: 0px;
    bottom: 0px;
   
    

`
