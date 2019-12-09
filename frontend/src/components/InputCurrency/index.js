import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
// import InputCurrencyControl from 'react-currency-input';
import { InputCurControl } from './styles';

export default function InputCurrency({
  name,
  onValueChange,
  textAlign,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
    console.tron.log(defaultValue);
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <InputCurControl
        name={fieldName}
        textAlign={textAlign}
        onChangeEvent={(event, maskedValue, value) => {
          setSelected(value);
          if (onValueChange) onValueChange(event, maskedValue, value);
        }}
        decimalSeparator=","
        thousandSeparator="."
        ref={ref}
        autocomplete="off"
        {...rest}
        value={selected}
      />
      {error && <span>{error}</span>}
    </>
  );
}

InputCurrency.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  onValueChange: PropTypes.func,
  textAlign: PropTypes.string,
};

InputCurrency.defaultProps = {
  name: '',
  disabled: false,
  onValueChange: null,
  textAlign: 'right',
};
