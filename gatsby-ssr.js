import React from 'react'

exports.onRenderBody = ({setPostBodyComponents}, pluginOptions) => {
  if (process.env.NODE_ENV === `production`) {
    return setPostBodyComponents([
      <script
        type='text/javascript'
        key='vk-pixel'
        dangerouslySetInnerHTML={{__html: `(window.Image ? (new Image()) : document.createElement('img')).src = 'https://vk.com/rtrg?p=VK-RTRG-140553-fXIvj';`}} />
    ])
  }
}
