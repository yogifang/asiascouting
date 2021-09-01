
// add bootstrap css 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

import { AppWrapper } from '../components/AppContext'; // import based on where you put it


function MyApp({ Component, pageProps }) {
  return (
    <>
     <AppWrapper>

      <Component {...pageProps} />

    </AppWrapper>
   
   </>
  )
  
}

export default MyApp
