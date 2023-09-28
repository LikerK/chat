import { Provider } from 'react-redux';
import App from './components/App';
import store from './slices/index.js';
import { actions as channelsActions } from './slices/channels';
import { actions as messagesActions } from './slices/messages.js';
import { ApiContext } from './contexts/index';

const promosifySocket = (socket, type, data) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit(type, data, (err, response) => {
    if (err) {
      reject(err);
    }
    resolve(response);
  });
});

const initChat = async (socket) => {
  socket.on('newMessage', (payload) => {
    const { addMessage } = messagesActions;
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsActions.renameChannel(payload));
  });

  const addNewMessage = (message) => promosifySocket(socket, 'newMessage', message);
  const createChannel = (channel) => promosifySocket(socket, 'newChannel', channel);
  const removeChannel = (channelId) => promosifySocket(socket, 'removeChannel', channelId);
  const renameChannel = (channel) => promosifySocket(socket, 'renameChannel', channel);

  const api = {
    addNewMessage,
    createChannel,
    removeChannel,
    renameChannel,
  };
  return (
    <Provider store={store}>
      <ApiContext.Provider value={api}>
        <App />
      </ApiContext.Provider>
    </Provider>
  );
};

export default initChat;
