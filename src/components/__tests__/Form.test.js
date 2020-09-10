import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from 'components/Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form
        interviewers={interviewers}
      />,
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Miller-Jones"
      />,
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('can successfully save after trying to submit an empty student name', () => {
    const validate = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={validate}
        interviewer={interviewers[0].name}
      />,
    );

    fireEvent.click(getByText('Save'));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(validate).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Save'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(validate).toHaveBeenCalledTimes(1);
    expect(validate).toHaveBeenCalledWith('Lydia Miller-Jones', 'Sylvia Palmer');
  });

  it('calls onCancel and resets the input field', () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Miller-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />,
    );

    fireEvent.click(getByText('Save'));

    fireEvent.change(getByPlaceholderText('Enter Student Name'), {
      targe: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByText('Cancel'));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
