import '@/styles/globals.css';
import { Layout } from '@/src/components';
import { store } from '@/src/store';
import type { AppProps } from 'next/app';
import i18n from '@/src/i18n';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
      <Layout>
        <Component {...pageProps}/>
        <ToastContainer
          pauseOnHover
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          theme="colored"
        />
      </Layout>
      </I18nextProvider>
    </Provider>
  );
}
