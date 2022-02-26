import React, { useState } from 'react';

import { TextInputProps } from 'react-native'

import { useTheme } from 'styled-components';


import {
    Container,
    IconContainer,
    Icon,
    TextInput,
    SeePasswordButton

} from './inputStyles';

interface InputProps extends TextInputProps {
    iconName: string
    isPassword?: boolean



}

export function Input({ iconName, isPassword, value, ...rest }: InputProps) {
    const theme = useTheme()

    const [showPassword, setShowPassword] = useState(true)

    const [isFocused, setIsFocused] = useState(false);
    const [isFiled, setIsFiled] = useState(false);


    function handleShowPassword() {
        if (showPassword) {
            setShowPassword(false)
        } else {
            setShowPassword(true)

        }
    }

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);

        if (value) {
            setIsFiled(true);
        } else {
            setIsFiled(false);

        }

    }

    return (
        <Container isFocused={isFocused} >
            <IconContainer>
                <Icon

                    name={iconName}
                    size={24}
                    color={isFocused || isFiled ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>

            <TextInput
                secureTextEntry={showPassword && isPassword}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}

            />

            {
                isPassword && (

                    <SeePasswordButton onPress={handleShowPassword}>
                        <Icon

                            name={!showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={theme.colors.text_detail}
                        />

                    </SeePasswordButton>
                )}

        </Container>
    );
}