import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useApi, useAuth } from '../hooks';
import SendIcon from '../assets/send-icon.svg';
import '../index.css';

const MessageForm = () => {
  const api = useApi();
  const inputRef = useRef();
  const auth = useAuth();
  const { username } = auth.user;
  const { currentChannelId } = useSelector((state) => state.channels);

  useEffect(() => {
    inputRef.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const { message } = values;

      try {
        await api.addNewMessage({ message, channelId: currentChannelId, username });
        resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="mt-auto px-2 py-3">
      <form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2 bg-light">
        <div className="input-group has-validation">
          <input
            name="message"
            id="message"
            aria-label="none"
            placeholder="message"
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={formik.isSubmitting}
            autoComplete="off"
            ref={inputRef}
          />
          <button type="submit" disabled={formik.isSubmitting} className="btn btn-group-vertical border-0">
            <span className="visually-hidden">Send</span>
            <img src={SendIcon} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
