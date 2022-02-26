import React, { useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';


import {


    Container,
    ImageIndexes,
    ImageIndex,
    ImageSliderContent,
    CarImage


} from './ImageSliderStyles';

interface ImageSliderProps {
    photos: {
        id: string
        photo: string
    }[]
}

interface ChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ photos }: ImageSliderProps) {

    const [imageIndex, setImageIndex] = useState(0)

    const indexChange = useRef((info: ChangeImageProps) => {
        const index = info.viewableItems[0].index
        setImageIndex(index)
    })
    return (
        <Container>

            <ImageIndexes>

                {photos.map((url, index) => {
                    return (

                        <ImageIndex key={index} active={index === imageIndex} />

                    )
                })}



            </ImageIndexes>


            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={({ item }) => {
                    return (
                        <ImageSliderContent>
                            <CarImage
                                source={{ uri: item.photo }}
                                resizeMode='contain'
                            />
                        </ImageSliderContent>

                    )

                }}
                onViewableItemsChanged={indexChange.current}

            />

        </Container>
    );
}