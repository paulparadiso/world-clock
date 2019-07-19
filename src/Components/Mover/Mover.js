import React from 'react';
import './Mover.css';

class Mover extends React.Component {

    constructor() {
        super();
        //window.setInterval(this.move, 1000);
        window.requestAnimationFrame(this.update);
    }

    state = {
        animating: true,
        startTime: 0,
        startVal: 0,
        endVal: 300,
        runTime: 5.0,
        styles: {
            left: 100
        }
    }

    render () {

        const { styles } = this.state;

        return (
            <div className="mover" style={styles}>
                
            </div>
        )
    }

    update = timestamp => {
        console.log(`${timestamp}`)
        if(this.state.animating) {
            if(timestamp > (this.state.startTime + this.state.runTime)){
                //let nextState = {...this.state};
                let nextState = Object.assign({}, this.state);
                nextState.styles.left = nextState.endVal;
                nextState.animating = false;
                this.setState(nextState);
            } else {
                //let nextState = {...this.state};
                let nextState = Object.assign({}, this.state);
                let timePct = (timestamp - this.state.startTime) / this.state.runTime;
                nextState.styles.left = nextState.startVal + ((nextState.endVal - nextState.startVal) * timePct);
                this.setState(nextState);
            }
        }
        requestAnimationFrame(this.update);
    }

    move = () => {
        console.log('Setting position');
        let nextPosition = Math.random() * 200;
        this.setState((state, props) => {
            return {
                styles: {
                    left: nextPosition
                }
            }
        })
        console.log(`{}`, this.state.styles.left);
    }

}


export default Mover;