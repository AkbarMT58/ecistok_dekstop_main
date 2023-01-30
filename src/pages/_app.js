import 'styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from 'redux/store';
import Head from 'next/head';
import Whatsapp from 'components/Global/Whatsapp';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import { useEffect, useState } from 'react';
import getBrowserFingerprint from 'get-browser-fingerprint';
import Cookies from 'js-cookie';

NProgress.configure({ showSpinner: false }); //showSpinner: false
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (!Cookies.get('Session_id')) {
      const fingerprint = getBrowserFingerprint();
      Cookies.set('Session_id', fingerprint);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <Head>
            <meta name='viewport' />
            <link rel='shortcut icon' href='/favicon.ico' />
          </Head>
          <ToastContainer theme='colored' />
          <Component {...pageProps} />
          <Whatsapp />
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
export default MyApp;
