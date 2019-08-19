import React from 'react';
import Gear from '../Gear/Gear';
import './Clock.css';

let ampm = [
    "am",
    "pm"
]

let seconds = [
    "00","01","02","03","04","05","06","07","08","09",
    "10","11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29",
    "30","31","32","33","34","35","36","37","38","39",
    "40","41","42","43","44","45","46","47","48","49",
    "50","51","52","53","54","55","56","57","58","59"
];

let minutes = [
    "00","01","02","03","04","05","06","07","08","09",
    "10","11","12","13","14","15","16","17","18","19",
    "20","21","22","23","24","25","26","27","28","29",
    "30","31","32","33","34","35","36","37","38","39",
    "40","41","42","43","44","45","46","47","48","49",
    "50","51","52","53","54","55","56","57","58","59"
];

let hours = [
    "01","02","03","04","05","06","07","08","09","10","11","12"
];

let cities = [
    "San Francisco",
    "Houston",
    "Mexico City",
    "Bogota",
    "Columbus",
    "Lima",
    "New York",
    "Panama City",
    "Buenos Aires",
    "Santiago",
    "Rio",
    "London",
    "Frankfurt",
    "Madrid",
    "Milan",
    "Oslo",
    "Paris",
    "Zurich",
    "Cairo",
    "Istanbul",
    "Johannesburg",
    "Moscow",
    "Riyadh",
    "Dubai",
    "Bengaluru",
    "Mumbai",
    "Bangkok",
    "Jakarta",
    "Kuala Lumpur",
    "Cebu",
    "Shanghai",
    "Singapore",
    "Seoul",
    "Tokyo",
    "Sydney",
    "Wellington"
];

class Clock extends React.Component {

    constructor() {
        super();
        console.log(`Rendering screen for a resolution of ${window.screen.width}x${window.screen.height}`)
        this.state = {
            renderModeHorizonal: this.shouldRenderHorizontal(),
            cityRadius: 1842
        }
    }

    dimensionsChanged() {
        let nextState = {...this.state};
        nextState.renderModeHorizonal = this.shouldRenderHorizontal();
        this.setState(nextState);
    }

    shouldRenderHorizontal() {
        let bHorizontal = window.innerWidth > window.innerHeight ? true: false;
        return bHorizontal;
    }

    componentDidMount() {
        window.addEventListener("resize", this.dimensionsChanged.bind(this));
    }


    render() {

        const renderModeHorizontal = this.shouldRenderHorizontal();

        console.log(`renderModeHorizantal = ${renderModeHorizontal}`);
        
        return(

            <div className={this.state.renderModeHorizonal? "Clock": "Clock-Vertical"}>

                <Gear label="cities" 
                      texts={cities} 
                      color="#00aeef" 
                      width="1920" 
                      x="2060" 
                      xVertical="1345"
                      y="540" 
                      yVertical="760"
                      radius="1880"
                      radiusVertical="1300"
                      limit="0.25">
                </Gear>

                <Gear label="hours" 
                      texts={hours} 
                      color="#5ba222" 
                      width="1920" 
                      x="2060"
                      xVertical="1345"                      
                      y="540" 
                      yVertical="760"
                      radius="1285"
                      radiusVertical="780" 
                      limit="0.16">
                </Gear>
                
                <Gear label="minutes" 
                      texts={minutes} 
                      color="#da8315" 
                      width="1920" 
                      x="2060"
                      xVertical="1345" 
                      y="540" 
                      yVertical="760"
                      radius="1042" 
                      radiusVertical="685"
                      limit="0.7">
                </Gear>
                
                <Gear label="seconds" 
                      texts={seconds} 
                      color="#c1000d" 
                      width="1920" 
                      x="2060"
                      xVertical="1345" 
                      y="540" 
                      yVertical="760"
                      radius="827" 
                      radiusVertical="550"
                      limit="0.75">
                </Gear>

                <Gear label="ampm" 
                      texts={ampm} 
                      color="#ec2543" 
                      width="1920" 
                      x="2060"
                      xVertical="1345" 
                      y="540"
                      yVertical="760" 
                      radius="642"
                      radiusVertical="435" 
                      limit="0.1">
                </Gear>
            </div>
        ) 
    }
}

export default Clock;