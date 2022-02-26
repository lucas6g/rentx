import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'



export const Container = styled.View`
background-color: ${({ theme }) => theme.colors.background_white};
width: 100%;


`

export const ImageIndexes = styled.View`
flex-direction: row;
align-items: center;
align-self: flex-end;
padding-right: 24px;
position: absolute;
top:-${getStatusBarHeight() - 8}px;





`
interface ImageIndexProps {
    active: boolean
}
export const ImageIndex = styled.View<ImageIndexProps>`
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({ theme, active }) => active ? theme.colors.shape_dark : theme.colors.shape};
  


`
export const ImageSliderContent = styled.View`


width: ${Dimensions.get('window').width}px;
justify-content: center;
align-items: center;
height: 132px;



`
export const CarImage = styled(FastImage)`
    width: 280px;
    height: 132px;


`
