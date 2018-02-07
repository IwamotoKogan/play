import React from 'react';
import { message } from 'antd';
import axios from 'axios';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import TableRow from './TableRow';
import InputForm from './InputForm';
import { mapStateToProps, mapDispatchToProps } from '../store/store';


// ////////////////////////REdUX//////////////////


// //////////React/////////////////////////////////////


class App extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleInputField = this.handleInputField.bind(this);
  }

  componentDidUpdate() {
    // alert(this.props.Rheight)
    //  alert(this.props.Rhits)
    // console.log(this.props.Rpositions)
    const Xs = this.props.Rpositions.filter(X => X[2] === 'X').map(e => e.slice(0, 2));

    const Os = this.props.Rpositions.filter(X => X[2] === 'O').map(e => e.slice(0, 2));

    const sortedVerticalXs = this.sort(Xs, 'vertical');
    const sortedHorizontalXs = this.sort(Xs, 'horizontal');
    const sortedVerticalOs = this.sort(Os, 'vertical');
    const sortedHorizontalOs = this.sort(Os, 'horizontal');


    this.evaluateStraight(sortedHorizontalXs).then((evaluation) => {
      console.log('eval :', evaluation);
      if (evaluation >= this.props.Rhits) {
        message.success('X winns', 4);
        this.props.onPositionChange([]);
        return 0;
      }
      return this.evaluateStraight(sortedVerticalXs);
    })

      .then((evaluation) => {
        if (evaluation >= this.props.Rhits) {
          message.success('X winns', 4);

          this.props.onPositionChange([]);
          return 0;
        }
        return this.evaluateStraight(sortedVerticalOs);
      })

      .then((evaluation) => {
        if (evaluation >= this.props.Rhits) {
          message.success('O winns', 4);
          this.props.onPositionChange([]);
          return 0;
        }
        return this.evaluateStraight(sortedHorizontalOs);
      })

      .then((evaluation) => {
        if (evaluation >= this.props.Rhits) {
          message.success('O winns', 4);
          this.props.onPositionChange([]);
          return 0;
        }
        return this.evaluateSlope(sortedVerticalXs);
      })

      .then((evaluation) => {
        if (evaluation >= this.props.Rhits) {
          message.success('X winns', 4);
          this.props.onPositionChange([]);
          return 0;
        }
        return this.evaluateSlope(sortedVerticalOs);
      })

      .then((evaluation) => {
        if (evaluation >= this.props.Rhits) {
          message.success('O winns', 4);
          this.props.onPositionChange([]);
          return 0;
        }

        if (this.props.Rheight * this.props.Rwidth === this.props.Rpositions.length) {
          message.success('Draw', 4);
          this.props.onPositionChange([]);
        }
        return 0;
      });


    // console.log(sortedVerticalXs);
  }

  onClick(e) {
    // console.log(e);

    //  console.log(e.concat("X"))


    if (!this.props.Rpositions.map((c) => {
      if (c[0] === e[0] && c[1] === e[1]) {
        return true;
      }
    }).filter(item => item === true)[0]
    ) { this.updateStateField(e); }


    // console.log(this.state.turnary);
    //  console.log(this.props.Rpositions)
  }
  updateStateField(e) {
    // console.log(this.props.Rpositions);
    // console.log(this.props.Rpositions);
    const currentState = this.props.Rpositions.slice();

    const nextState = currentState.concat([e.concat([this.props.Rturnary ? 'X' : 'O'])]);
    this.props.onTurnaryChange();
    this.props.onPositionChange(nextState);
  }


  sort(b, v) {
    // console.log("input",b);
    let vector;
    let selector1;
    let selector2;
    let i;
    console.log('b:', b);
    const sorted = [];
    const height = this.props.Rheight;
    const width = this.props.Rwidth;

    if (v === 'vertical') {
      vector = height;
      selector1 = 0;
      selector2 = 1;
    } else {
      vector = width;
      selector1 = 1;
      selector2 = 0;
    }

    const evaluateIntermediaryArray = (b, i) => b.filter(x => x[selector1] === i);
    for (i = 0; i < vector; i += 1) {
      const intermediaryArray = evaluateIntermediaryArray(b, i);
      const intermediaryArray2 = intermediaryArray.map(e => e[selector2]);
      const intermediaryArray3 = intermediaryArray2.sort((a, b) => b - a);


      sorted.push(intermediaryArray3);
    }
    // console.log("sorted",sorted)

    return sorted;
  }

  evaluateStraight(arr) {
    this.arr = arr;
    this.winner = 1;


    return axios
      .post(
        'http://localhost:3001/straight',
        {
          counter: 1,
          arrLength: 0,
          longestArr: 0,
          // winner:1,
          arr: this.arr,
        },
      )

      .then((resp) => {
        // console.log("resp",resp);
        this.winner = resp.data;
        // console.log("resp data :",resp.data);
        // console.log(winner,"hey hey")
        return this.winner;
      }).catch(console.log('server not working'));
  }

  evaluateSlope(arr) {
    // console.log(arr)
    const height = this.props.Rheight;
    const width = this.props.Rwidth;
    const hits = this.props.Rhits;
    return axios
      .post(
        'http://localhost:3001/slope',
        {
          height,
          width,
          hits,
          // winner:1,
          arr,
        },
      )

      .then((resp) => {
        // console.log("resp",resp);
        const winner = resp.data;
        // console.log("resp data :",resp.data);
        // console.log(winner,"hey hey")
        return winner;
      }).catch(console.log('server not working'));


    // console.log("winner",winner);
  }


  handleInputField(e) {
    if (this.props.Rpositions.length === 0) {
      if (Number.isInteger(parseInt(e.target.value, 10))) {
        switch (parseInt(e.target.id, 10)) {
          case 1:
            this.props.onChangeHeight(e);
            break;
          case 2:
            this.props.onChangeWidth(e);
            break;
          case 3:
            this.props.onChangeHits(e);
            break;
          default:
        }
      } else { message.success('input a number', 4); }
    } else { message.success('game is running ', 4); }
  }

  render() {
    // alert(this.props.Rwidth)
    const onClick = this.onClick;
    const width = this.props.Rwidth;
    const positions = this.props.Rpositions;
    let i = -1;
    const rows = Array(...{ length: this.props.Rheight }).map(() => {
      i += 1;

      return <TableRow width={width} id={i} onClick={onClick} positions={positions} />;
    });

    return (
      <div>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>

        <InputForm
          handleInputField={this.handleInputField}
          value={this.props.Rheight}
          name="height"
          id={1}
        />
        <InputForm
          handleInputField={this.handleInputField}
          value={this.props.Rwidth}
          name="width"
          id={2}
        />
        <InputForm
          handleInputField={this.handleInputField}
          value={this.props.Rhits}
          name="hits"
          id={3}
        />

      </div>
    );
  }
}

App.propTypes = {
  Rheight: propTypes.number.isRequired,
  Rwidth: propTypes.number.isRequired,
  Rhits: propTypes.number.isRequired,
  Rturnary: propTypes.bool.isRequired,
  Rpositions: propTypes.array.isRequired,
  onChangeHeight: propTypes.func.isRequired,
  onTurnaryChange: propTypes.func.isRequired,
  onChangeWidth: propTypes.func.isRequired,
  onChangeHits: propTypes.func.isRequired,
  onPositionChange: propTypes.func.isRequired,
};

const AppR = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);


export default AppR;
