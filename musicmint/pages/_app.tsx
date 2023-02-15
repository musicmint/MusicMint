import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { AppWrapper } from '../src/context/state'
import { AuthProvider } from '../src/context/auth'


export default function App({ Component, pageProps }: AppProps) {
  return <>
      <AuthProvider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </AuthProvider>
  </>;
}
