import * as React from 'react';
import { NextContext, NextFunctionComponent } from 'next';

type EventLocation = {
  description: string,
  lat: number,
  lng: number,
};

type EventLocationProps = EventLocation;

const EventLocationWidget: NextFunctionComponent<EventLocationProps,
  NextContext & {
  query: {
    id: number;
  };
}> = () => {
  return null;
};

// EventLocationWidget.getInitialProps = async ctx => {
// //   return await api.event();
// // };

export default EventLocationWidget;
