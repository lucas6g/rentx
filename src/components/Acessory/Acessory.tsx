import React from 'react';
import { SvgProps } from 'react-native-svg';



import { Container, Name } from './AcessoryStyles';


interface AcessoryProps {
    name: string
    icon: React.FC<SvgProps>
}

export function Acessory({ icon: Icon, name }: AcessoryProps) {
    return (
        <Container>
            <Icon width={32} height={32} />
            <Name>{name}</Name>

        </Container>
    );
}