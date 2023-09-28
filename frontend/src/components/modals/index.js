import Add from './Add.jsx';

const modals = {
  adding: Add,
};

const getModal = (modalName) => modals[modalName];
export default getModal;
