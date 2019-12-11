import React, { useRef, useEffect } from 'react';

import { useField } from '@rocketseat/unform';

import { Select } from './styles';

export default function ReactSelect({ name, value, loadOptions, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;
    return selectValue ? selectValue.id : '';
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        name={fieldName}
        loadOptions={loadOptions}
        defaultValue={defaultValue}
        value={value}
        ref={ref}
        cacheOptions
        defaultOptions
        getOptionValue={option => option.id}
        getOptionLabel={option => option.title}
        {...rest}
      />

      {error && <span>{error}</span>}
    </>
  );
}
