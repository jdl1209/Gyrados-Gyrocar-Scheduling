import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import '../css/global.css'
import Head from 'next/head';
import ClientRootLayout from '@/components/RootLayoutClient';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Gyrogogo',
    default: 'Gyrogogo',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClientRootLayout
    children={props.children}
     />
  );
}
