import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import initChat from './init.jsx';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const socket = io();
  root.render(await initChat(socket));
};

app();
