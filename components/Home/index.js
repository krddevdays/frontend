import React from 'react'
import { StyleSheet, Image, View } from 'react-primitives'
import { createContainer } from '@phenomic/preset-react-app/lib/client'

import Head from '../Head'

const Home = () => (
  <View style={styles.page}>
    <Head />
    <Image
      source={{
        uri: require('file-loader!./text.svg'),
        width: 300,
        height: 133
      }}
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