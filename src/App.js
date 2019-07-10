import React from 'react';
import './App.css';
import anime from 'animejs';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.myRef3 = React.createRef();
    this.myRef4 = React.createRef();
    this.myRef5 = React.createRef();
  }

  componentDidMount() {
    console.log(this.myRef);
  }

  switchAtoB = (obj1, obj2) => {
    const moveHeigth = 50;
    anime({
      targets: obj1.current,
      translateY: [0, 50],
      duration: 500,
      easing: "easeOutSine"
    });
    anime({
      targets: obj2.current,
      translateY: [0, -50],
      duration: 500,
      easing: "easeOutSine"
    });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={(a) => this.switchAtoB(this.myRef,this.myRef2)}>switch</button>
        <div ref={this.myRef} className="box1">1</div>
        <div ref={this.myRef2} className="box2">2</div>
        <div ref={this.myRef3} className="box3">3</div>
        <div ref={this.myRef4} className="box4">4</div>
        <div ref={this.myRef5} className="box5">5</div>
      </div>
    );
  }
}
export default App;
