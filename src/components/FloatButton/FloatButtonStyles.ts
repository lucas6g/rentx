import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";

interface ContainerProps {
    color?: string
}


export const Container = styled(RectButton) <ContainerProps>` 
  
    height: ${RFValue(60)}px;
    width: ${RFValue(60)}px;
    border-radius: ${RFValue(30)}px;

    background-color: ${({ theme }) => theme.colors.main};
    justify-content: center;
    align-items: center;

    position: absolute;

    right: 22px;
    bottom: 13px;
   
    

`
