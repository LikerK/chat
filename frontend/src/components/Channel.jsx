import {
  Button, ButtonGroup, Dropdown,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../slices/channels.js';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const { setCurrentChannel } = actions;
  const { currentChannelId } = useSelector((state) => state.channels);
  const { name, id, removable } = channel;
  const btnVariant = id === currentChannelId ? 'secondary' : 'light';

  const renderDropdown = () => (removable
    ? (
      <>
        <Dropdown.Toggle variant={btnVariant} className="flex-grow-0 dropdown-toggle-split">
          <span className="visually-hidden">Test</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
          <Dropdown.Item eventKey="2">Rename</Dropdown.Item>
        </Dropdown.Menu>
      </>

    )
    : null);
  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="w-100">
        <Button variant={btnVariant} onClick={() => dispatch(setCurrentChannel(channel.id))} type="button" className="w-100 rounded-0 text-start text-truncate btn">
          <span className="me-1">#</span>
          { name }
        </Button>
        {renderDropdown()}
      </Dropdown>
    </li>
  );
};

export default Channel;
