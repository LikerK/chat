import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
  },
});
