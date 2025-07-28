"use client"
import './global.css'
import { Navbar } from '@/Components/Navbar';
import { appStore, persistor } from '@/redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SwiftCart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name='theme-color' content='#06c1db'/>
        <link rel="icon" href="/images/SwiftCart1.svg"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap" rel="stylesheet"/>

      </head>
      <body>
        <Provider store={appStore}>
          <PersistGate loading={null} persistor={persistor}>
            <Toaster toastOptions={{  style: { background: '#333', color: '#fff', fontSize: '1rem',},success: {style: {background: '#198754',color: '#fff',},},error: {style: {background: '#dc3545',color: '#fff',},},}}/>
            <Navbar />
            {children}
          </PersistGate>
        </Provider>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
