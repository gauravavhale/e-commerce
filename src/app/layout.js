"use client"
import './global.css'
import { Navbar } from '@/Components/Navbar';
import { appStore, persistor } from '@/redux/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>SwiftCart</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css"></link>
      </head>
      <body>
        <Provider store={appStore}>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
