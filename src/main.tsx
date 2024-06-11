import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/index';
import './i18n.js';
const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement,
);
root.render(
   <Provider store={store}>
      {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
      <App />
      {/* </PersistGate> */}
   </Provider>,
);
