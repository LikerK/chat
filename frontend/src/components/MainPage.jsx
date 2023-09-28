import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import MessageForm from './MessageForm.jsx';
import { useAuth } from '../hooks/index.jsx';
import { actions as channelsActions } from '../slices/channels';
import { actions as messagesAction } from '../slices/messages';

const PageMain = () => {
  const dispatch = useDispatch();
  const { addChannels, setCurrentChannel } = channelsActions;
  const { addMessages } = messagesAction;
  const auth = useAuth();
  const headers = auth.getAuthHeader();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { channels, messages, currentChannelId } = data || {};
        console.log(currentChannelId);
        dispatch(setCurrentChannel(currentChannelId));
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
      } catch (error) {
        if (!error.isAxiosError) {
          console.log(error);
        }
        if (error.response?.status === 401) {
          console.log(error);
        } else {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [dispatch, addChannels, addMessages, headers, setCurrentChannel]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div id="messages-box" className="d-flex flex-column h-100">
            <Messages />
            <MessageForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMain;
