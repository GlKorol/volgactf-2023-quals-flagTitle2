import Head from 'next/head'
import React from "react";
import { useCallback, useEffect, useState } from 'react'
import {decode, encode} from 'base-64';
import CryptoJS from "crypto-js";
import _app from "./_app";


export async function getStaticProps() {
  let a1 = "4oCcQmV3YXJlIHRoZSBpcnJhdGlvbmFsLCBob3dldmVyIHNlZHVjdGl2ZS4gU2h1biB0aGUgJ3RyYW5zY2VuZGVudCcg";
  let a2 = "YW5kIGFsbCB3aG8gaW52aXRlIHlvdSB0byBzdWJvcmRpbmF0ZSBvciBhbm5paGlsYXRlIHlvdXJzZWxmLg==";
  let a3 = "RGlzdHJ1c3QgY29tcGFzc2lvbjsgcHJlZmVyIGRpZ25pdHkgZm9yIHlvdXJzZWxmIGFuZCBvdGhlcnMu";
  let a4 = "RG9uJ3QgYmUgYWZyYWlkIHRvIGJlIHRob3VnaHQgYXJyb2dhbnQgb3Igc2VsZmlzaC4gUGljdHVyZQ==";
  let a5 =  "YWxsIGV4cGVydHMgYXMgaWYgdGhleSB3ZXJlIG1hbW1hbHMuIE5ldmVyIGJlIGEgc3BlY3RhdG9yIG9m";
  let a6 = "dW5mYWlybmVzcyBvciBzdHVwaWRpdHkuIFNlZWsgb3V0IGFyZ3VtZW50IGFuZCBkaXNwdXRhdGlvbiBmb3I=";
  let a7 = "dGhlaXIgb3duIHNha2U7IHRoZSBncmF2ZSB3aWxsIHN1cHBseSBwbGVudHkgb2YgdGltZSBmb3Igc2lsZW5jZS4=";
  let a8 = "U3VzcGVjdCB5b3VyIG93biBtb3RpdmVzLCBhbmQgYWxsIGV4Y3VzZXMu";
  let a9 = "RG8gbm90IGxpdmUgZm9yIG90aGVycyBhbnkgbW9yZSB0aGFuIHlvdSB3b3VsZCBleHBlY3Qgb3RoZXJzIHRvIGxpdmUgZm9yIHlvdS7igJ0=";
  let a10 = "4oCVIENocmlzdG9waGVyIEhpdGNoZW5zLCBMZXR0ZXJzIHRvIGEgWW91bmcgQ29udHJhcmlhbiA=";
  var CryptoJS = require("crypto-js");

  let appkey = "By87Y3J8J7Lrgha7V8z2AzUddnvmgXZF"
  let iv_key = "SDBsmwKxBS5V63zn"
  const target = CryptoJS.enc.Utf8.parse(decode(a1)+decode(a2)+decode(a3)+decode(a4)+decode(a5)+decode(a6)+decode(a7)+decode(a8)+decode(a9)+decode(a10))
  const target2 = CryptoJS.enc.Utf8.parse("VolgaCTF{F1ND_F149_2_918212}")
  // let secSpec = [-53, -96, -53, -96, -53, -92, -52, -95, -54, -92, -54, -91, -54, -88, -54, -89]
  // let ivSpec = [-53, -96, -53, -96, -53, -92, -52, -95, -54, -92, -54, -91, -54, -88, -54, -89]
  let ivSpec = CryptoJS.enc.Utf8.parse(iv_key)
  let secSpec = CryptoJS.enc.Utf8.parse(appkey)

  var encrypted = CryptoJS.AES.encrypt(target, secSpec, {
    iv: ivSpec, //yes I used password as iv too. Dont mind.
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

    const flag: string = CryptoJS.AES.encrypt(target2, secSpec, {
      iv: ivSpec, //yes I used password as iv too. Dont mind.
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  let data = encrypted.toString();

  return {
    props: {
      data,
    flag
    },
  }
}

var alias_method2 = CryptoJS["AES"]
var alias_method = CryptoJS.enc.Utf8;
var crypto_key = "By87Y3J8J7Lrgha7V8z2AzUddnvmgXZF"
//let {s} = require("./_app")



const MovingObject = () => {
  //---------------- add graphic------------------
  const getRandomPosition = () => {
    return Math.floor(Math.random() * 400) + 50;
  }
  const [positionGL, setPosition] = useState({x:0, y:0})
  const [isAnimating, setIsAnimating] = useState(false);
  const targetPosition = {x: getRandomPosition(), y: getRandomPosition()};
  const duration = 2000;
  const updateInterval = 10;
  useEffect(() => {
    startAnimation();
  }, []);
  const startAnimation = () => {
    setIsAnimating(true);
    const startTime=performance.now();
    const distanceX = targetPosition.x - positionGL.x;
    const distanceY = targetPosition.y - positionGL.y;
    const speedX = distanceX / duration * updateInterval;
    const speedY = distanceY / duration * updateInterval;
    const animate = () => {
      const elapsedTime = performance.now() - startTime;

      if (elapsedTime >= duration){
        setPosition(targetPosition);
        setIsAnimating(false);
        startNewAnimation();
        return;
      }

      setPosition(prevPosition => ({
        x: prevPosition.x + speedX ,
        y: prevPosition.y + speedY
      }));
      requestAnimationFrame(animate);
    };
    animate();
  };

  const startNewAnimation = () => {
    const newPosition = { x: getRandomPosition(), y: getRandomPosition() };
    const  newDuration = Math.floor(Math.random() * 3000) + 1000;


    targetPosition.x = newPosition.x;
    targetPosition.y = newPosition.y;
    startAnimation()
    // setTimeout(() => {
    //   setIsAnimating(true);
    //   targetPosition.x = newPosition.x;
    //   targetPosition.y = newPosition.y;
    //   startAnimation();
    // }, 2000)
  }

  const objectStyle = {
    width: "100px",
    height: '100px',
    backgroundColor: 'red',
    top: `${positionGL.y}px`,
    left: `${positionGL.y}px`,
    position: 'absolute' as 'absolute',
    transform: 'translate(-50%, -50%)',
    transition: isAnimating  ? 'transform 0.3s ease-in-out' : 'none'
  };

  //------------------ end graphic ------------------
  return <div style={objectStyle}></div>;
}

// @ts-ignore
export default function Home({data}): JSX.Element {


  //var alias_methodname = "dec"+"rypt"
  var IIV = "SDBsmwKxBS5V63zn";

  let ivSpec = alias_method.parse(IIV)
  let secSpec = alias_method.parse(crypto_key)
  let decrypt = alias_method2.decrypt(data, secSpec,{
    iv: ivSpec,
  })
  //console.log('decrypted', decrypt.toString())

  const myData:string[] = CryptoJS.enc.Utf8.stringify(decrypt).split('');
  //const myData:string[] = 'my_flag_is_alive'.split('');
  const [count, setCount] = useState(0)
  const get_char_code = useCallback(() => {
    setCount((v) => v+1);



  }, [setCount])


  useEffect(() => {
    const r = setInterval(() => {
      get_char_code()
    }, 1000)
    return () => {
      clearInterval(r)
    }
  }, [get_char_code])

  const char: string = String.fromCharCode(myData[(count) % myData.length].charCodeAt(0))
  return (
      <>
        <Head>
          <title>{char}</title>
        </Head>

      <MovingObject />
      </>
  );

}
