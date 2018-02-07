
import React from 'react';
import propTypes from 'prop-types';
import './app';
import TableCell from './TableCell';


function TableRow(props) {
  const {
    id, onClick, positions, width,
  } = props;


  return (
    <tr>
      {Array(...{ length: width })
        .map((v, i) => (<TableCell
          id={[id, i]}
          onClick={onClick}
          positions={positions}
        />))}
    </tr>
  );
}

TableRow.propTypes = {
  onClick: propTypes.func.isRequired,
  positions: propTypes.array.isRequired,
  width: propTypes.number.isRequired,
  id: propTypes.number.isRequired,
};


export default TableRow;

