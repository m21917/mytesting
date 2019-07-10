import React from 'react';
import './App.css';
import anime from 'animejs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    fetch("https://webcdn.17app.co/campaign/pretest/data.json")
      .then(res => res.json())
      .then(
        (result) => {
          let list = [];
          let rank = 1;
          result.forEach((element) => {
            element.rank = rank;
            element.positionY = 0;
            rank += 1;
            list.push(element);
          });
          this.setState({ list }, () => { this.randomAddScore(); });
        },
        (error) => {
          console.log('fail to get data')
        }
      )
  }

  randomAddScore = () => {
    setInterval(() => {
      const rank = this.getRandom(1,10);
      const score = this.getRandom(500,1000);
      this.setScore(rank, score);
    }, 500);
  }

  getRandom = (min, max) => {
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  switchAtoB = (rankA, rankB) => {
    const moveHeigth = 50;
    let currentState = this.state.list;
    let obj1, obj2;
    let index1, index2;
    currentState.forEach((element, index) => {
      if (element.rank === rankA) {
        obj1 = element;
        index1 = index;
      }
      if (element.rank === rankB) {
        obj2 = element;
        index2 = index;
      }
    });
    anime({
      targets: `#id_${obj1.userID}`,
      translateY: [obj1.positionY, obj1.positionY + moveHeigth],
      duration: 500,
      easing: "easeOutSine"
    });
    anime({
      targets: `#id_${obj2.userID}`,
      translateY: [obj2.positionY, obj2.positionY - moveHeigth],
      duration: 500,
      easing: "easeOutSine"
    });
    obj1.positionY += moveHeigth;
    obj1.rank = rankB;
    obj2.positionY -= moveHeigth;
    obj2.rank = rankA;
    currentState[index1] = obj1;
    currentState[index2] = obj2;

    this.setState({
      list: currentState,
    });
  }

  setScore = (rank, score) => {
    let currentState = this.state.list;
    let obj1, index1;
    currentState.forEach((element, index) => {
      if (element.rank === rank) {
        obj1 = element;
        index1 = index;
      }
    }); 
    anime({
      targets: `#point_${obj1.userID}`,
      innerHTML: [obj1.score, obj1.score + score],
      easing: 'linear',
      round: 1,
      duration: 300,
    });
    obj1.score += score;
    currentState[index1] = obj1;
    this.setState({
      list: currentState,
    }, () => {
      this.compare(obj1.rank);
    });

  }

  compare = (rank) => {
    if(rank === 1) return;
    const compareRank = rank - 1;
    let currentState = this.state.list;
    let obj1, obj2;
    currentState.forEach((element) => {
      if (element.rank === rank) {
        obj1 = element;
      }
      if (element.rank === compareRank) {
        obj2 = element;
      }
    });
    if(obj1.score > obj2.score) this.switchAtoB(compareRank, rank);
  }

  render() {
    return (
      <div className="container">
        {this.state.list.length ? this.state.list.map((item,index) => {
          return (
            <div key={index} id={`id_${item.userID}`} className="column">
              <div className="rank">{item.rank}</div>
              <div className="picture"><img src={item.picture} alt={item.displayName} /></div>
              <div className="display_name">{item.displayName}</div>
              <div className="score" id={`point_${item.userID}`}>{`${item.score}pt`}</div>
            </div>);
        }): '取得資料失敗！'}
      </div>
    );
  }
}
export default App;
