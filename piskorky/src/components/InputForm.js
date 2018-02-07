
import React from 'react';
import propTypes from 'prop-types';
import '../index';
import './TableRow';


class InputForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.props.handleInputField(event);
  }

  render() {
    return (
      <div> {this.props.name}
        <input
          type="text"
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          id={this.props.id}
        />
      </div>
    );
  }
}

InputForm.propTypes = {

  name: propTypes.string.isRequired,
  value: propTypes.number.isRequired,
  handleInputField: propTypes.func.isRequired,
  id: propTypes.number.isRequired,

};

export default InputForm;
