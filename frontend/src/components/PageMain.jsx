import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../routes.js';
import Channels from './Channels.jsx';
import useAuth from '../hooks/index.jsx';
import { actions } from '../slices/channels.js';

const PageMain = () => {
  const dispatch = useDispatch();
  const { addChannels } = actions;
  const auth = useAuth();
  const headers = auth.getAuthHeader();
  console.log(headers);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(routes.dataPath(), { headers });
        const { channels } = data || {};
        console.log(localStorage);
        console.log(data);
        dispatch(addChannels(channels));
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
  }, [dispatch, addChannels, headers]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
      </div>
    </div>
  );
};

export default PageMain;
