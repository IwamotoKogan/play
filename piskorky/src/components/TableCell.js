
import React from 'react';
import propTypes from 'prop-types';
import './app';
import './TableRow';


class TableCell extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.props.id);
  }

  render() {
    const { positions, id } = this.props;

    const position = positions.filter(pos => pos[0] === id[0] && pos[1] === id[1]);
    const sign = position.join().slice(-1);


    return (
      <td>
        <div
          onKeyDown={this.onClick}
          onClick={this.onClick}
          role="presentation"
          className="TableCell"
          key={this.props.id}
        >
          {sign}
        </div>
      </td>
    );
  }
}

TableCell.propTypes = {
  onClick: propTypes.func.isRequired,
  positions: propTypes.array.isRequired,
  id: propTypes.array.isRequired,

};

export default TableCell;
