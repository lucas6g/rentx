import { Alert, StatusBar } from 'react-native';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useTheme } from 'styled-components';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import * as Yup from 'yup';



import {
    Container,
    Title,
    SubTitle,
    InputsContainer,
    ForgotPasswordText
} from './LoginStyles';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

export function Login() {

    const [email, setEmail] = useState('testando@g.com')
    const [password, setPassword] = useState('lucas123')

    const { signIn } = useContext(AuthContext)

    const singInSchema = Yup.object().shape({
        email: Yup.string()
            .required('O Campo email é obrigatorio')
            .email('Digite um email valido'),
        password: Yup.string()
            .required('O Campo senha é obrigatorio'),
    });

    const { navigate } = useNavigation()


    const theme = useTheme()

    async function handleSignIn() {

        try {

            await singInSchema.validate({
                email,
                password
            })

            await signIn({ email, password })




        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message)
            }
            console.log(error)
            Alert.alert('Erro na Api', 'verifique as crendenciais ')

        }


    }


    return (

        <KeyboardAvoidingView

            behavior='position'
            enabled


        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container >
                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent

                    />




                    <Title>
                        Estamos {'\n'}
                        quase lá.
                    </Title>



                    <SubTitle>
                        Faça seu login para começar{'\n'}
                        uma experiência incrível.
                    </SubTitle>





                    <InputsContainer>
                        <Input
                            defaultValue='testando@g.com'
                            iconName='mail'
                            placeholder='Email'
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'
                            value={email}

                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                        />

                        <Input
                            defaultValue='lucas123'
                            iconName='lock'
                            isPassword={true}
                            placeholder='Senha'
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            autoCorrect={false}
                            autoCapitalize='none'

                        />


                    </InputsContainer>
                    <ForgotPasswordText>
                        Esqueci minha senha
                    </ForgotPasswordText>


                    <Button enabled={true} style={{ marginBottom: 8 }} onPress={handleSignIn}>
                        Login

                    </Button>


                    <Button textColor={theme.colors.title} color={theme.colors.background_white} onPress={() => {
                        navigate('SignUp' as never)

                    }}>
                        Criar conta gratuita
                    </Button>




                </Container >
            </TouchableWithoutFeedback>



        </KeyboardAvoidingView>


    );
}