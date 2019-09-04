import React from 'react';
import Gear from '../Gear/Gear';
import './Clock.css';

let ampm = [
    "AM",
    "PM"
]

let seconds = [
    "01","02","03","04","05","06","07","08","09",
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

const timezones = [
    {
        "name": "San Francisco",
        "timezone": "America/Los_Angeles"
    },
    {
        "name": "Houston",
        "timezone": "America/Denver"
    },
    {
        "name": "Mexico City",
        "timezone": "America/Mexico_City",
    },
    {
        "name": "Bogota",
        "timezone": "America/Bogota"
    },
    {
        "name": "Columbus",
        "timezone": "America/New_York"
    },
    {
        "name": "Lima",
        "timezone": "America/Lima"
    },
    {
        "name": "New York",
        "timezone": "America/New_York"
    },
    {
        "name":  "Panama City",
        "timezone":  "America/New_York"
    },
    {
        "name": "Buenos Aires",
        "timezone": "America/Santiago"
    },
    {
        "name": "Rio",
        "timezone": "America/Sao_Paulo"
    },
    {
        "name": "London",
        "timezone": "Europe/London"
    },
    {
        "name": "Frankfurt",
        "timezone": "Europe/Berlin"
    },
    {
        "name": "Madrid",
        "timezone": "Europe/Madrid"
    },
    {
        "name": "Milan",
        "timezone": "Europe/Berlin"
    },
    {
        "name": "Oslo",
        "timezone": "Europe/Oslo"
    },
    {
        "name": "Paris",
        "timezone": "Europe/Paris"
    },
    {
        "name": "Zurich",
        "timezone": "Europe/Zurich"
    },
    {
        "name": "Cairo",
        "timezone": "Africa/Cairo"
    },
    {
        "name": "Istanbul",
        "timezone": "Africa/Johannesburg"
    },
    {
        "name": "Moscow",
        "timezone": "Europe/Moscow"
    },
    {
        "name": "Riyadh",
        "timezone": "Asia/Riyadh"
    },
    {
        "name": "Dubai",
        "timezone": "Asia/Dubai"
    },
    {
        "name": "Bengaluru",
        "timezone": "Asia/Kolkata"
    },
    {
        "name": "Mumbai",
        "timezone": "Asia/Kolkata"
    },
    {
        "name": "Bangkok",
        "timezone": "Asia/Bangkok" 
    },
    {
        "name": "Jakarta",
        "timezone": "Asia/Jakarta"
    },
    {
        "name": "Kuala Lumpur",
        "timezone": "Asia/Kuala_Lumpur"
    },
    {
        "name": "Cebu",
        "timezone": "Asia/Manila"
    },
    {
        "name": "Shanghai",
        "timezone": "Asia/Shanghai"
    },
    {
        "name": "Singapore",
        "timezone": "Asia/Singapore"
    },
    {
        "name": "Seoul",
        "timezone": "Asia/Seoul"
    },
    {
        "name": "Tokyo",
        "timezone": "Asia/Tokyo"
    },
    {
        "name": "Sydney",
        "timezone": "Australia/Sydney"
    },
    {
        "name": "Wellington",
        "timezone": "Pacific/Auckland"
    }
]

class Clock extends React.Component {

    constructor() {
        super();
        this.state = {
            renderModeHorizonal: this.shouldRenderHorizontal(),
            cityRadius: 1842,
            currentTimezone: 2,
            lastUpdate: 0
        }
        //window.setInterval(this.nextTimezone.bind(this), 5000);
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
        requestAnimationFrame(this.update.bind(this));
    }

    nextTimezone() {
        let nextState = {...this.state};
        nextState.currentTimezone = (nextState.currentTimezone + 1) % timezones.length;
        this.setState(nextState);
        //console.log(`Setting timezone to ${nextState.currentTimezone}: ${timezones[nextState.currentTimezone]['timezone']}`);
    }

    update() {
        let nextState = {...this.state};
        let date = new Date();
        let currentSeconds = date.getSeconds();
        if ((currentSeconds % 5 === 0) && nextState.lastUpdate !== currentSeconds){
            nextState.lastUpdate = currentSeconds;
            this.setState(nextState);
            this.nextTimezone();
        }
        requestAnimationFrame(this.update.bind(this));
    }

    render() {
        
        return(

            <div className={this.state.renderModeHorizonal? "Clock": "Clock-Vertical"}>
                <Gear label="cities" 
                      texts={cities} 
                      timezones = {timezones}
                      currentTimezone = {this.state.currentTimezone}
                      color="#00aeef" 
                      width="1920" 
                      x="2060" 
                      xVertical="1345"
                      y="540" 
                      yVertical="760"
                      radius="1880"
                      radiusVertical="1300"
                      radiantX="50%"
                      radiantY = "0%"
                      transparencyMax = "0.83"
                      limit="0.25">
                </Gear>
                <Gear label="hours" 
                      texts={hours} 
                      timezones = {timezones}
                      currentTimezone = {this.state.currentTimezone}
                      color="#5ba222" 
                      width="1920" 
                      x="2060"
                      xVertical="1345"                      
                      y="540" 
                      yVertical="760"
                      radius="1285"
                      radiusVertical="780"
                      radiantX="100%"
                      radiantY = "0%"
                      transparencyMax = "0.75"
                      limit="0.16">
                </Gear>
                <Gear label="minutes" 
                      texts={minutes} 
                      timezones = {timezones}
                      currentTimezone = {this.state.currentTimezone}
                      color="#da8315" 
                      width="1920" 
                      x="2060"
                      xVertical="1345" 
                      y="540" 
                      yVertical="760"
                      radius="1042" 
                      radiusVertical="685"
                      radiantX="50%"
                      radiantY = "50%"
                      transparencyMax = "0.64"
                      limit="0.7">
                </Gear>
                <Gear label="seconds" 
                      texts={seconds} 
                      timezones = {timezones}
                      currentTimezone = {this.state.currentTimezone}
                      color="#c1000d" 
                      width="1920" 
                      x="2060"
                      xVertical="1345" 
                      y="540" 
                      yVertical="760"
                      radius="827" 
                      radiusVertical="550"
                      radiantX="50%"
                      radiantY = "50%"
                      transparencyMax = "0.55"
                      limit="0.75">
                </Gear>
                
                <Gear label="ampm" 
                      texts={ampm} 
                      timezones = {timezones}
                      currentTimezone = {this.state.currentTimezone}
                      color="#ec2543" 
                      width="1920" 
                      x="2060"
                      xVertical="1345" 
                      y="540"
                      yVertical="760" 
                      radius="642"
                      radiusVertical="435" 
                      radiantX="100%"
                      radiantY = "0%"
                      transparencyMax = "0.46"
                      limit="0.1">
                </Gear>    
            </div>
        ) 
    }
}

export default Clock;