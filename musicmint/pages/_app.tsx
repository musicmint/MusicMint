import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { AppWrapper } from '../src/context/state'
import { AuthProvider } from '../src/context/auth'
import MarketplaceProvider from '../src/context/contracts' // import the MarketplaceProvider


export default function App({ Component, pageProps }: AppProps) {
  return <>
      <AuthProvider>
          <MarketplaceProvider>
              <AppWrapper>
                  <Component {...pageProps} />
              </AppWrapper>
          </MarketplaceProvider>
      </AuthProvider>
  </>;
}
