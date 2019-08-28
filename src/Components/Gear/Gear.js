import React from 'react';
import './Gear.css';
import moment from 'moment-timezone';
import Easer from './easing';
import { thisTypeAnnotation } from '@babel/types';

class Gear extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            label: props.label,
            texts: props.texts,
            color: props.color,
            width: 1920,
            height: 1080,
            spacing: 2, 
            limit: props.limit,
            textPaths: [],
            x: parseInt(props.x),
            xVertical: parseInt(props.xVertical),
            y: parseInt(props.y),
            yVertical: parseInt(props.yVertical),
            rotation: 0,
            nextRotation: 0,
            radius: parseInt(props.radius),
            radiusVertical: parseInt(props.radiusVertical),
            renderModeHorizonal: this.shouldRenderHorizontal(),
            currentText: 0,
            lastChange: 0,
            timezones: props.timezones,
            currentTimezone: parseInt(props.currentTimezone),
            vel: 0,
            accel: 0.5,
            dir: 1,
            inMotion: false,
            rotationStartTime: 0.0,
            dist: 0.0,
            startRotation: 0.0,
            rotationTime: 500.0
        };
        this.easer = new Easer();
        //console.log(this.state);
        //window.setInterval(() => this.setRotation(), 100);
        requestAnimationFrame((timestamp) => this.setRotation(timestamp));
    }

    dimensionsChanged() {
        let nextState = {...this.state};
        nextState.renderModeHorizonal = this.shouldRenderHorizontal();
        this.setState(nextState);
        this.generate();
    }

    shouldRenderHorizontal() {
        let bHorizontal = window.innerWidth > window.innerHeight ? true: false;
        return bHorizontal;
    }

    componentDidMount() {
        window.addEventListener("resize", this.dimensionsChanged.bind(this));
        this.generate();
    }

    generate() {
        let cx = this.state.renderModeHorizonal? this.state.x: this.state.xVertical;
        let cy = this.state.renderModeHorizonal? this.state.y: this.state.yVertical;
        let radius = this.state.renderModeHorizonal? this.state.radius: this.state.radiusVertical;
        let circlePath = `M${cx} ${cy}`;
        let segments = [];
        let steps = this.state.texts.length + 1;
        //let max = steps * this.state.spacing;
        let max = steps * 4;
        for(let i = 0; i < this.state.texts.length + 2; i++) {
            //console.log(radius);
            //let currentPosition = ((i * this.state.spacing) / max) * this.state.limit; 
            let mult = 14;
            if (this.state.label === "seconds"){
                mult = 4.2;
            }
            if (this.state.label === "minutes"){
                mult = 3.3;
            }
            if (this.state.label === "hours"){
                mult = 6;
            }
            if (this.state.label === "cities"){
                mult = 4;
            }
            let currentPosition = ((i * mult) / 360.0); 
            let angle = 2 * Math.PI * (0.5 - currentPosition);
            let angle2 = 2 * Math.PI * (0.5 - currentPosition);
            //let angle = (2 * Math.PI) / 360.0 * 4 * i
            let x = cx + (radius * Math.cos(angle));
            let y = cy + (radius * Math.sin(angle));
            let tx = cx + ((radius * 0.98) * Math.cos(angle2));
            let ty = cy + ((radius * 0.98) * Math.sin(angle2));
            if(i === 0){
                circlePath += `L${Math.floor(x)} ${Math.floor(y)}`;
            }
            circlePath += `A${radius} ${radius} 0 0 0 ${Math.floor(x)} ${Math.floor(y)}`;
            if(i > 0 && i < this.state.texts.length + 1) {
                let segmentPath = `M${Math.floor(tx)} ${Math.floor(ty)} L${cx} ${cy}`
                //console.log(segmentPath);
                segments.push({'index': i -1, 
                               'text': this.state.texts[i -1], 
                               path: segmentPath,
                               angle: currentPosition * 360})
            }
        }
        circlePath += `L${cx} ${cy} Z`;
        let nextState = {...this.state};
        nextState.circlePath = circlePath;
        nextState.textPaths = [...segments];
        this.setState(nextState);
    }

    generateRotation() {
        let x = this.state.renderModeHorizonal? this.state.x: this.state.xVertical;
        let y  = this.state.renderModeHorizonal? this.state.y: this.state.yVertical;
        // r = this.easer.getValue;
        return `rotate(${(this.state.rotation)}, ${x}, ${y})`;
    }

    setRotation(timestamp) {
        let nextState = {...this.state};
        let nextIndex = 0;
        let easeType = 'easeOutBounce';
        let easeTime = 2500.0;
        let currentMoment = moment().tz(this.props.timezones[this.props.currentTimezone]['timezone'])
                                    .format("h:m:s:a")
                                    .split(":");
        if(this.state.label === 'seconds'){
            nextIndex = parseInt(currentMoment[2])
            if(nextIndex < 1){
                nextIndex = 1;
                easeTime = 1000.0;
            } else {
                easeType = 'easeInQuint';
                easeTime = 500.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.state.label === 'minutes'){
            nextIndex = parseInt(currentMoment[1]);
            if(nextIndex == 0){
                easeType = 'easeOutBounce';
                easeTime = 2500.0;
            } else {
                easeType = 'easeInQuint';
                easeTime = 500.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.state.label === 'hours'){
            nextIndex = parseInt(currentMoment[0]) - 1;
            if(Math.abs(nextState.index - nextIndex) > 2){
                easeType = 'easeOutBounce';
                easeTime = 2500.0;
            } else {
                easeType = 'easeInQuint';
                easeTime = 1500.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.state.label === 'cities') {
            //nextState.currentText = this.props.currentTimezone;
            nextIndex = this.props.currentTimezone;
            if(nextIndex == 0){
                easeType = 'easeOutBounce';
                easeTime = 2300.0;
            } else {
                easeType = 'easeInQuint';
                easeTime = 1200.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.state.label === 'ampm') {
            if(currentMoment[3] === 'am'){
                nextIndex = 0;
            } else {
                nextIndex = 1;
            }
            nextState.currentText = nextIndex;
        }
        if(nextState.index !== nextIndex) {
            nextState.index = nextIndex;
            if(this.state.textPaths.length > 0) {
                nextState.nextRotation = this.state.textPaths[nextIndex].angle;   
                this.easer.setup(timestamp, easeTime, nextState.rotation, nextState.nextRotation, easeType);
            }
        }
        let verbose = false;
        //if(this.state.label == 'cities') {
        //    verbose = true;
        //}
        nextState.rotation = this.easer.getValue(timestamp, verbose);
        this.setState(nextState);
        window.requestAnimationFrame((timestamp) => this.setRotation(timestamp));
    }

    rotationNearIndex(index) {
        if(Math.abs(this.state.rotation - this.state.textPaths[index].angle) < 2.5){
            return true;
        } else {
            return false;
        }
    }

    render() {

        return (
            <div className="Gear">
                <svg width={this.state.renderModeHorizonal?"1920": "1080"} height={this.state.renderModeHorizonal?"1080": "1920"} fill="white" stroke="black">
                    <defs>
                        <radialGradient id={`${this.state.label}-gradient`} cx="100%" cy="0%" r="200%">
                            <stop offset="0%" style={{stopColor:`${this.state.color}`, stopOpacity:"0"}}/>
                            <stop offset="100%" style={{stopColor:`${this.state.color}`, stopOpacity:"1.0"}}/>
                        </radialGradient>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="2 2" result="shadow"/>
                            <feOffset dx="6" dy="6"/>
                        </filter>
                        <filter id="sofGlow" height="100%" width="100%" x="-75%" y="-75%">
		
		                    <feMorphology operator="dilate" radius="4" in="SourceAlpha" result="thicken" />

		                    <feGaussianBlur in="thicken" stdDeviation="10" result="blurred" />          

		                    <feFlood flood-color="#2d292a" result="glowColor" />

		
		                    <feComposite in="glowColor" in2="blurred" operator="in" result="softGlow_colored" />    

		                    <feMerge>
			                    <feMergeNode in="softGlow_colored"/>
			                    <feMergeNode in="SourceGraphic"/>
		                    </feMerge>
                        </filter>
                        <filter id="soft-glow" height="130%">
                            <feGaussianBlur in="sourceAlpha" stdDeviation="3"/>
                            <feOffset dx="2" dy="2" result="offsetBlur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.5"/>
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="sourceGraphic"/>
                            </feMerge>
                        </filter>
                        <filter id="glow" x="-5%" y="-5%" width="300%" height="200%">
                            <feGaussianBlur stdDeviation="4" in="sourceGraphic" result="blurOut"/>
                            <feOffset result="offput" in="blurOut" dx="3" dy="3" />
                            <feFlood flood-color="#2d292a" result="offsetColor" />
                            <feBlend in="offsetColor" in2="offput" mode="normal" />
                        </filter>
                    </defs>
                    <g transform={this.generateRotation()}>
                        {/*
                        <path d={this.state.circlePath} filter="url(#sofGlow)" fill={`url(#${this.state.label}-gradient)`} fill-opacity="0.01" stroke="#011328"/>
                        */}
                        {/*<path d={this.state.circlePath} fill="#2d292a" filter="url(#glow)"/>*/}
                        <path class="main-shape" d={this.state.circlePath} fill={`url(#${this.state.label}-gradient)`} stroke="rgba(255,255,255,0.0)"/>

                        {/*<path d={this.state.circlePath} stroke="#011328"/>*/}
                        
                        {
                            this.state.textPaths.map((item, index) => (
                                <React.Fragment key={`${this.state.label}-${index}`}>
                                <defs>
                                    <path id={`${this.state.label}-textpath-${item['index']}`} d={item['path']} stroke="blue"/>
                                </defs>
                                {/*
                                <text filter="url(#shadow)" className={`Clock-Text-Shadow ${this.rotationNearIndex(index) ? 'Clock-Text-Big': ''}`} fill="black">
                                    <textPath href={`#${this.state.label}-textpath-${item['index']}`}>
                                       {`${item['text']}`}
                                    </textPath>
                                </text>
                                */}
                                <text className={`Clock-Text${this.state.renderModeHorizonal? '': '-Vertical'} 
                                                ${(this.rotationNearIndex(index) /*&& !this.state.inMotion*/) ? `Clock-Text-Big${this.state.renderModeHorizonal? '': '-Vertical'}`: ''}`} fill="black">
                                    <textPath href={`#${this.state.label}-textpath-${item['index']}`}>
                                       {`${item['text']}`}
                                    </textPath>
                                </text>
                                </React.Fragment>
                            ))
                        }
                        {/*<circle cx="107%" cy="50%" r="200" fill="#fff"/>*/}
                    </g>
                </svg>
            </div>
        )
    }

}

export default Gear;