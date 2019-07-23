import React from 'react';
import './Mover.css';

class Mover extends React.Component {

    constructor() {
        super();
        //window.setInterval(this.move, 1000);
        window.requestAnimationFrame(this.update);
        let nextState = {...this.state};
        nextState.startTime = window.performance.now();
        this.setState(nextState);
    }

    state = {
        animating: true,
        accel: 0.1,
        maxAccel: 0.01,
        vel: 0.0,
        startTime: 0,
        startVal: 0,
        endVal: 300,
        runTime: 5000.0,
        position: 0
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

        const styles = {'left': this.state.position };

        return (
            <div className="mover" style={ styles }>
                
            </div>
        )
    }

    update = timestamp => {
        //console.log(`${timestamp}`)
        //if(this.state.accel > 0.0) {
        let nextState = {...this.state};
        let dist = Math.abs(nextState.position - this.state.endVal);
        let travel = Math.abs(nextState.endVal - nextState.startVal);
        let damp = dist / travel;
        
        nextState.vel = this.state.vel + this.state.accel;
        nextState.position = this.state.position + (nextState.vel * damp);
        //console.log(`${nextState.position} ${dist} ${travel} ${damp} ${nextState.accel}`)
        //console.log(dist);
        this.setState(nextState);
        //}
        /*
        if(this.state.animating) {
            if(timestamp > (this.state.startTime + this.state.runTime)){
                let nextState = {...this.state};
                nextState.animating = false;
                nextState.position = nextState.endVal
                this.setState(nextState);
            } else {
                let nextState = {...this.state};
                let timePct = (timestamp - this.state.startTime) / this.state.runTime;
                nextState.position = nextState.startVal + ((nextState.endVal - nextState.startVal) * timePct);
                this.setState(nextState);
            }
        }
        */
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