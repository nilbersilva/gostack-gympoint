import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, ModalMain } from './styles';

export const Modal = ({ handleClose, show, children }) => {
  const [fadeType, setFateType] = useState(null);

  useEffect(() => {
    if (show) {
      setFateType('in');
    } else {
      setFateType('out');
    }
  }, [show]); //eslint-disable-line

  function handleModalMainClick(e) {
    e.stopPropagation();
  }
  // display={show ? 'block' : 'none'}
  return (
    <Wrapper fadeType={fadeType} onClick={handleClose}>
      <ModalMain onClick={handleModalMainClick}>{children}</ModalMain>
    </Wrapper>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

Modal.defaultProps = {
  show: false,
  handleClose: () => {},
};
