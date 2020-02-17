import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client'
import { Alert, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage, Platform } from 'react-native';

import SpotList from '../components/SpotList.js'

import logo from '../assets/logo.png'


export default function List() {

    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.1.6:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Your booking on ${booking.spot.company} at ${booking.date} was  ${booking.approved ? 'ACCEPTED' : 'REJECTED'}`)
            })
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map(tech => tech.trim())
            setTechs(techsArray)
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 30 : 0
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    }
})
