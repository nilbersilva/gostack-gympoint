import React from 'react';
import PropTypes from 'prop-types';
import Colors from '~/styles/colors';
import { PageControl } from './styles';

export default function PaginationControl({
  objectLength,
  page,
  handleChangePage,
}) {
  return (
    <PageControl
      grayStart={page === 1 ? Colors.Gray : Colors.Red}
      grayEnd={
        objectLength === page || objectLength === 0 ? Colors.Gray : Colors.Red
      }
    >
      <button
        type="button"
        className="start"
        onClick={() => page > 1 && handleChangePage(page - 1)}
      >{`<`}</button>
      <p>{page}</p>
      <button
        type="button"
        className="end"
        onClick={() => objectLength !== page && handleChangePage(page + 1)}
      >{`>`}</button>
    </PageControl>
  );
}

PaginationControl.propTypes = {
  objectLength: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
};
