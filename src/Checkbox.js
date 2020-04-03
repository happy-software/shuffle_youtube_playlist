import React from 'react';

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    this.props.handleCheckboxChange(this.props.value);
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input 
            type="checkbox"
            value={this.props.value}
            checked={this.props.checked}
            onChange={this.toggleCheckboxChange}
          />
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default Checkbox;