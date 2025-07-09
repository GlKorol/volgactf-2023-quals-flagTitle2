import '../styles/globals.css'
import {AppProps} from "next/dist/shared/lib/router/router";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// class MyCrypto{
//   constructor(crypto_key) {
//     this.crypto_key = "By87Y3J8J7Lrgha7V8z2AzUddnvmgXZF"
//   }
//
// }

var Crypto_key = "By87Y3J8J7Lrgha7V8z2AzUddnvmgXZF";
export default MyApp
//module.exports = Crypto_key