import WebFont from 'webfontloader'

exports.onClientEntry = () => {
  WebFont.load({
    google: {
      families: [
        'Source Sans Pro:300,400,600,700',
        'Roboto Mono:400'
      ]
    }
  })
}
