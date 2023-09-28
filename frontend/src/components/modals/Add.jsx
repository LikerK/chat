import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import {
  Modal, Form, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useApi } from '../../hooks';
import { selectors as channelsSelectors, actions } from '../../slices/channels';
import { closeModal } from '../../slices/modals';

const Add = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const inputElement = useRef();
  const setCloseModal = () => dispatch(closeModal());
  const channels = useSelector(channelsSelectors.selectAll);
  const channelNames = channels.map((channel) => channel.name);

  useEffect(() => {
    inputElement.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required('Не должно быть пустым')
      .min(3, 'Минимальная длинна 3 символа')
      .max(20, 'Максимальна длинна 20 символов')
      .notOneOf(channelNames, 'Такое имя уже есть'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async ({ name }) => {
      try {
        const data = await api.createChannel({ name, changeable: true });
        dispatch(actions.setCurrentChannel(data));
        setCloseModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Modal centered show onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              ref={inputElement}
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
              className="mb-2"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label className="visually-hidden" htmlFor="name">Введите название задачи</Form.Label>
            <div className="invalid-feedback">{formik.errors.name}</div>
            <div className="d-flex justify-content-end">
              <Button onClick={setCloseModal} variant="secondary" className="me-2">
                Закрыть
              </Button>
              <Button disabled={formik.isSubmitting} type="submit">Добавить</Button>
            </div>
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
