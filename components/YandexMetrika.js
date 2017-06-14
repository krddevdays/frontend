import React from 'react'
import { YMInitializer } from 'react-yandex-metrika'

export default () =>
  <YMInitializer accounts={[44994376]} options={{
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true
  }} />
