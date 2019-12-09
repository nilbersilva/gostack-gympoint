import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper, Container} from './styles';
import Header from '~/components/Header';

export default function Layout({children}) {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
