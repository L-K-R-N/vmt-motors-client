import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App';
import { persistor, store } from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader } from './components/UI/Loader/Loader';

const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
         <App />
      </PersistGate>
   </Provider>,
);
