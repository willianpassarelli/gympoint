import { AsyncStorage } from 'react-native';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'template',
      storage: AsyncStorage,
      whitelist: [],
    },
    reducers
  );
  return persistedReducer;
};
