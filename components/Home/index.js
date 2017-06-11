import React from 'react'
import { StyleSheet, Image, View } from 'react-primitives'
import { createContainer } from '@phenomic/preset-react-app/lib/client'

const Home = () => (
  <View style={styles.page}>
    <Image style={styles.logo}
           source={{
             uri: require('file-loader!./logo@2x.png'),
             width: 189,
             height: 205
           }}
           accessible
           accessibilityLabel='Krasnodar Dev Days logo'
    />
  </View>
)

const styles = StyleSheet.create({
  page: {
    flexShrink: 0,
    flexBasis: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    backgroundImage: `url(${require('file-loader!./bg.jpg')})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }
})

export default createContainer(Home)