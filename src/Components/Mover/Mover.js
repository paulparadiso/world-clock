import React from 'react';
import './Mover.css';

class Mover extends React.Component {

    constructor() {
        super();
        //window.setInterval(this.move, 1000);
        window.requestAnimationFrame(this.update);
        window.setTimeout(this.setEndVal, 1000);
    }

    state =  {
        animating: true,
        accel: 0.1,
        maxAccel: 0.01,
        vel: 0.0,
        startTime: 0,
        startVal: 0,
        endVal: 0,
        runTime: 5000.0,
        position: 0,
        displayPosition: 200,
        overShoot: 200
    }

    createMovement = () => {
        let nextState = {...this.state};
        nextState.endVal = Math.random() * 500.0;
        nextState.accel = 0.01;
        nextState.vel = 0.0;
        nextState.startVal = nextState.position;
        this.setState(nextState);
    }

    render () {

        const styles = {'left': this.state.displayPosition };

        return (
            <div className="mover" style={ styles }>
                
            </div>
        )
    }

    update = timestamp => {
        let nextState = {...this.state};
        if(Math.abs(nextState.position - nextState.endVal) < 0.01){
            nextState.displayPosition = nextState.position + (Math.sin(timestamp % 360.0 / 1000.0) * nextState.overShoot)
            console.log(`DisplayPosition = ${nextState.displayPosition}`);
            this.setState(nextState);
            requestAnimationFrame(this.update);
            return;
        }
        let dist = Math.abs(nextState.position - this.state.endVal);
        let travel = Math.abs(nextState.endVal - nextState.startVal);
        let damp = dist / travel;
        nextState.vel = this.state.vel + this.state.accel;
        nextState.position = this.state.position + (nextState.vel * damp);
        nextState.displayPosition = nextState.position;
        this.setState(nextState);
        requestAnimationFrame(this.update);
    }

    setEndVal = () => {
        let nextState = {...this.state};
        nextState.endVal = Math.random() * 1000.0;
        var diff = nextState.position - nextState.endVal;
        if(diff > 0.0) {
            nextState.accel = -0.02;
        } else {
            nextState.accel = 0.02;
        }
        nextState.vel = 0.0;
        console.log(`Setting accel to ${nextState.accel}.`);
        console.log(`Setting endVal to ${nextState.endVal}`)
        this.setState(nextState);
        requestAnimationFrame(this.update);
        window.setTimeout(this.setEndVal, 15000);
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