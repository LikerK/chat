import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ReactComponent as PlusIcon } from '../assets/plus-icon.svg';
import { selectors } from '../slices/channels.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const channels = useSelector(selectors.selectAll);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          variant="primary"
          type="button"
          className="p-0 bg-light border-0"
        >
          <PlusIcon className="bg-light m-1" />
        </Button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            currentChannelId={channel.currentChannelId}
          />
        ))}
      </ul>
    </div>
  );
};

export default Channels;
