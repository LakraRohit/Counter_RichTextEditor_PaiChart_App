import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store'; // Import persistor

import Counter from './components/Counter';
import UserForm from './components/UserForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 space-y-4">
          <h1 className="text-2xl font-bold mb-4">React App with Redux Persist</h1>
          <div className="flex space-x-4">
            <Counter />
            <UserForm />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;