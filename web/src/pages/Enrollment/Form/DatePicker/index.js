import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import pt from 'date-fns/locale/pt';

import { useField } from '@rocketseat/unform';

export default function DatePicker({
  name,
  placeholder,
  onChange,
  selected,
  disabled,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  function handleChange(date) {
    onChange(date);
  }

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        placeholderText={placeholder}
        selected={selected}
        minDate={new Date()}
        locale={pt}
        dateFormat="dd/MM/yyyy"
        onChange={handleChange}
        disabled={disabled}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
  onChange: PropTypes.func,
  disabled: false,
  selected: '',
};
