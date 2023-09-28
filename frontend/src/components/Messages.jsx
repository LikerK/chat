import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import { selectors as channelsSelector } from '../slices/channels.js';
import { selectors as messagesSelector } from '../slices/messages.js';
import { useAuth } from '../hooks/index.jsx';

const Messages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const messagesBox = useRef();
  const auth = useAuth();
  const { username } = auth.user;
  const channels = useSelector(channelsSelector.selectAll);
  const messages = useSelector(messagesSelector.selectAll);
  const currentChannel = channels.find((channel) => channel.id === currentChannelId);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    messagesBox.current.lastChild?.scrollIntoView();
  }, [messages, currentChannelId]);

  const createMessage = (message) => (
    <div className="bg-light p-2 d-inline-block mb-1 rounded">
      <b>{message.username}</b>
      :
      {' '}
      {message.message}
    </div>
  );

  return (
    <>
      <div className="bg-light mb-4 p-3 small">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <b>{currentChannel?.name}</b>
            <br />
            <span className="text-muted">Count</span>
          </div>
          <b>{username}</b>
        </div>
      </div>
      <div ref={messagesBox} className="chat-messages overflow-auto px-5">
        {currentMessages.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            {createMessage(message)}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messages;
