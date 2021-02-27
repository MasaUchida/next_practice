import React from 'react';
import '../styles/global.css'

type Props = {
    Component: any,
    pageProps: React.ReactNode,
}

const App: React.FC<Props> = ({ Component,pageProps }) => {
    return <Component {...pageProps} />
}

export default App;

