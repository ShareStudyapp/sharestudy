import React, { useEffect, useRef, useState } from 'react';
import NotifyCon from '../../components/Noti/NotifyCon';
import NotifyHeader from '../../components/Noti/NotifyHeader';
import SockJsClient from 'react-stomp';

const Noti = () => {
  let clientRef = useRef(null);
  useEffect(() => {
    console.log(clientRef);
  }, [clientRef]);

  return (
    <>
      <NotifyHeader />
      <NotifyCon />
      <SockJsClient
        url="http://172.16.101.149:9090/stompNoti"
        topics={[`/alert/feedlike/1`]}
        onMessage={(msg) => {
          console.log(msg);
        }}
        ref={(client) => {
          clientRef = client;
        }}
        onConnect={() => {
          console.log('connect!');
        }}
        onDisconnect={() => {
          console.log('disconnect!');
        }}
        debug={true}
      />
    </>
  );
};

export default Noti;
