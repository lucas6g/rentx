import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert, Platform, View } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton/BackButton';
import { SelectImageButton } from '../../components/SelectImageButton/SelectImageButton'
import * as ImagePicker from 'expo-image-picker';

import * as Yup from 'yup';
import {


    Container,
    Header,
    HeaderBar,
    HeaderBarTitle,
    SignOutButton,
    AvatarContainer,
    Avatar,
    Icon,
    Content,
    Options,
    Option,
    OptionLabel,
    Section

} from './ProfileStyles';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { useNetInfo } from '@react-native-community/netinfo';


export function Profile() {
    const { user, signOut, updateUser } = useContext(AuthContext)



    const [activeOption, setActiveOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

    const [name, setName] = useState(user.name)
    const [cnh, setCnh] = useState(user.driver_license)

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [passwordConfirmation, setPasswordConfirmation] = useState('')


    const theme = useTheme()

    const netInfo = useNetInfo()

    function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
        if (netInfo.isConnected === false && option === 'passwordEdit') {
            return Alert.alert('Voce esta off ', 'Conecte na internet para alterar a senha')
        }
        setActiveOption(option)
    }


    async function handleSignOut() {

        try {
            Alert.alert('Tem Certeza', 'Se voce sair ira precisar de internet para se conectar novamente',
                [
                    {
                        text: 'Cancelar',
                        onPress() {

                        },
                        style: 'cancel',



                    },
                    {
                        text: 'Sair',
                        async onPress() {
                            await signOut()
                        },




                    },


                ])

        } catch (error) {
            Alert.alert('Erro', 'error ao tentar sair')
        }
    }

    const [image, setImage] = useState(user.avatar);

    async function handleSelectImage() {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });



        if (result.cancelled) {
            return
        }

        const { uri } = result as undefined as ImageInfo


        setImage(uri)



    };


    const { navigate, goBack } = useNavigation()

    const profileSchema = Yup.object().shape({
        name: Yup.string()
            .required('O Campo nome é obrigatorio')
        ,


        cnh: Yup.string()
            .required('O Campo cnh é obrigatorio')
            .min(3, 'Digite uma cnh valida'),


    });
    const passwordSchema = Yup.object().shape({

        password: Yup.string()
            .min(6, 'No minimo 6 digitos')
            .required('O Campo senha é obrigatorio'),
        newPassword: Yup.string()
            .min(6, 'No minimo 6 digitos')
            .required('O Campo senha é obrigatorio'),
        passwordConfirmation: Yup.string()
            .required('O campo Nova senha é obrigatorio')
            .oneOf([Yup.ref('newPassword'), undefined], 'Confirmação incorreta'),

    });





    async function handleEditProfile() {

        try {

            await profileSchema.validate({

                name,
                cnh
            })


            await updateUser({
                id: user.id,
                name,
                driver_license: cnh,
                avatar: image,
                email: user.email,
                user_id: user.user_id,
                token: user.token

            })


            navigate('Comfirmation' as never, {
                title: 'Feito!',
                message: `Agora suas infomações`,
                nextScreenName: 'Profile',
            } as never)

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message)
            }

            Alert.alert('Não foi possivel atualiza o perfil')
        }
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

            enabled

        >

            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                    <Container >
                        <Header>
                            <HeaderBar>
                                <View />
                                <HeaderBarTitle>Editar Perfil</HeaderBarTitle>
                                <SignOutButton onPress={handleSignOut}>
                                    <Icon

                                        name={'power'}
                                        size={24}
                                        color={theme.colors.text}
                                    />

                                </SignOutButton>

                            </HeaderBar>

                            <AvatarContainer>

                                {!!image && (
                                    <Avatar
                                        source={{
                                            uri: image
                                        }}
                                    />

                                )}

                                <SelectImageButton onPress={handleSelectImage} />



                            </AvatarContainer>
                        </Header>


                        <Content>
                            <Options>
                                <Option onPress={() => { handleOptionChange('dataEdit') }} active={activeOption === 'dataEdit'} >
                                    <OptionLabel active={activeOption === 'dataEdit'}>Dados</OptionLabel>
                                </Option>
                                <Option onPress={() => { handleOptionChange('passwordEdit') }} active={activeOption === 'passwordEdit'} >

                                    <OptionLabel active={activeOption === 'passwordEdit'}>Trocar Senha</OptionLabel>
                                </Option>

                            </Options>

                            {activeOption === 'dataEdit' ? (
                                <Section>
                                    <Input
                                        iconName='user'
                                        placeholder='Nome'
                                        defaultValue={user.name}
                                        autoCorrect={false}

                                        onChangeText={(text) => {
                                            setName(text)
                                        }}
                                    />

                                    <Input
                                        iconName='mail'
                                        defaultValue={user.email}
                                        placeholder='Email'
                                        editable={false}

                                        keyboardType='email-address'
                                        autoCorrect={false}
                                        autoCapitalize='none'

                                    />
                                    <Input
                                        iconName='credit-card'
                                        placeholder='CNH'
                                        defaultValue={user.driver_license}

                                        keyboardType='numeric'
                                        onChangeText={(text) => {
                                            setCnh(text)
                                        }}
                                        maxLength={9}

                                    />
                                    <Button style={{ marginTop: 8 }} enabled={!!name && !!cnh} onPress={handleEditProfile}>
                                        Proximo

                                    </Button>

                                </Section>

                            ) : (
                                <Section>
                                    <Input
                                        iconName='lock'
                                        isPassword={true}
                                        placeholder='Senha Atual'
                                        value={password}
                                        onChangeText={(text) => {
                                            setPassword(text)
                                        }}
                                        autoCorrect={false}
                                        autoCapitalize='none'

                                    />
                                    <Input
                                        iconName='lock'
                                        isPassword={true}
                                        placeholder='Nova Senha'
                                        value={newPassword}
                                        onChangeText={(text) => {
                                            setNewPassword(text)
                                        }}
                                        autoCorrect={false}
                                        autoCapitalize='none'

                                    />

                                    <Input
                                        iconName='lock'
                                        isPassword={true}
                                        placeholder='Repitir Senha'
                                        value={passwordConfirmation}
                                        onChangeText={(text) => {
                                            setPasswordConfirmation(text)
                                        }}


                                        autoCorrect={false}
                                        autoCapitalize='none'

                                    />


                                    <Button style={{ marginTop: 8 }} enabled={!!password && !!passwordConfirmation && !!newPassword} onPress={handleEditProfile}>
                                        Proximo

                                    </Button>

                                </Section>
                            )


                            }

                        </Content>

                    </Container>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView >
    );
}