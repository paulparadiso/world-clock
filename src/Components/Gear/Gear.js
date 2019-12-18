import React from 'react';
import './Gear.css';
import moment from 'moment-timezone';
import Easer from './easing';

class Gear extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //label: props.label,
            //texts: props.texts,
            //color: props.color,
            width: 1920,
            height: 1080,
            //spacing: 2, 
            //limit: props.limit,
            textPaths: [],
            //x: parseInt(props.x),
            //xVertical: parseInt(props.xVertical),
            //y: parseInt(props.y),
            //yVertical: parseInt(props.yVertical),
            rotation: 0,
            nextRotation: 0,
            //radius: parseInt(props.radius),
            //radiusVertical: parseInt(props.radiusVertical),
            renderModeHorizonal: this.shouldRenderHorizontal(),
            currentText: 0,
            lastChange: 0,
            //timezones: props.timezones,
            currentTimezone: parseInt(props.currentTimezone),
            //vel: 0,
            //accel: 0.5,
            //dir: 1,
            //inMotion: false,
            //rotationStartTime: 0.0,
            //dist: 0.0,
            //startRotation: 0.0,
            //rotationTime: 500.0
        };
        this.lastMoment = '';
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
        let cx = this.state.renderModeHorizonal? parseInt(this.props.x): parseInt(this.props.xVertical);
        let cy = this.state.renderModeHorizonal? parseInt(this.props.y): parseInt(this.props.yVertical);
        let radius = this.state.renderModeHorizonal? parseInt(this.props.radius): parseInt(this.props.radiusVertical);
        let circlePath = `M${cx} ${cy}`;
        let circlePathShadow = `M${cx} ${cy}`;;
        let segments = [];
        //let max = steps * this.state.spacing;
        for(let i = 0; i < this.props.texts.length + 2; i++) {
            //console.log(radius);
            //let currentPosition = ((i * this.state.spacing) / max) * this.state.limit; 
            let mult = 14;
            let add = 1.0;
            if (this.props.label === "seconds"){
                mult = 4.0;
                add = 0.1;
            }
            if (this.props.label === "minutes"){
                mult = 3.3;
                add = 0.5;
            }
            if (this.props.label === "hours"){
                mult = 6;
                add = 0.2
            }
            if (this.props.label === "cities"){
                mult = 4;
                add = 0.05;
            }
            let currentPosition = ((i * (mult + 1.0)) / 360.0);
            let currentPosition2 = ((i * (mult + 1.0) + add) / 360.0);
            let angle = 2 * Math.PI * (0.5 - currentPosition);
            let angle2 = 2 * Math.PI * (0.5 - currentPosition2);
            //let angle = (2 * Math.PI) / 360.0 * 4 * i
            let x = cx + (radius * Math.cos(angle));
            let y = cy + (radius * Math.sin(angle));
            let tx = cx + ((radius * 0.98) * Math.cos(angle));
            let ty = cy + ((radius * 0.98) * Math.sin(angle));
            let tx2 = cx + ((radius * 0.98) * Math.cos(angle2));
            let ty2 = cy + ((radius * 0.98) * Math.sin(angle2));
            let shadowX = cx + ((radius * 1.1) * Math.cos(angle));
            let shadowY = cy + ((radius * 1.1) * Math.sin(angle));
            if(i === 0){
                circlePath += `L${Math.floor(x)} ${Math.floor(y)}`;
                circlePathShadow += `L${Math.floor(shadowX)} ${Math.floor(shadowY)}`;
            }
            circlePath += `A${radius} ${radius} 0 0 0 ${Math.floor(x)} ${Math.floor(y)}`;
            circlePathShadow += `A${radius * 1.1} ${radius * 1.1} 0 0 0 ${Math.floor(shadowX)} ${Math.floor(shadowY)}`;
            if(i > 0 && i < this.props.texts.length + 1) {
                let segmentPath = `M${Math.floor(tx)} ${Math.floor(ty)} L${cx} ${cy}`
                let segmentPathBig = `M${Math.floor(tx2)} ${Math.floor(ty2)} L${cx} ${cy}`
                //console.log(segmentPath);
                segments.push({'index': i -1, 
                               'text': this.props.texts[i -1], 
                               path: segmentPath,
                               pathBig: segmentPathBig,
                               angle: currentPosition * 360})
            }
        }
        circlePath += `L${cx} ${cy} Z`;
        circlePathShadow += `L${cx} ${cy} Z`;
        let nextState = {...this.state};
        nextState.circlePath = circlePath;
        nextState.circlePathShadow = circlePathShadow;
        nextState.textPaths = [...segments];
        this.setState(nextState);
    }

    generateRotation(reverse=false) {
        let x = this.state.renderModeHorizonal? parseInt(this.props.x): parseInt(this.props.xVertical);
        let y  = this.state.renderModeHorizonal? parseInt(this.props.y): parseInt(this.props.yVertical);
        // r = this.easer.getValue;
        if(reverse)
        {
            return `rotate(-${(this.state.rotation)}, ${x}, ${y})`;
        } else {
            return `rotate(${(this.state.rotation)}, ${x}, ${y})`;
        }
    }

    generateRotation2(reverse=false) {
        let x = this.state.renderModeHorizonal? parseInt(this.props.x): parseInt(this.props.xVertical);
        let y  = this.state.renderModeHorizonal? parseInt(this.props.y): parseInt(this.props.yVertical);
        // r = this.easer.getValue;
        if(reverse)
        {
            return `rotate(-${(this.state.rotation)}, ${x}, ${y})`;
        } else {
            if(this.state.renderModeHorizonal){
                return `translate(0 -483) rotate(${(this.state.rotation)}, ${x}, ${y})`;
            } else {
                return `translate(0 -725) rotate(${(this.state.rotation)}, ${x}, ${y})`;
            }
        }
    }

    setRotation(timestamp) {
        let nextState = {...this.state};
        let nextIndex = 0;
        let easeType = 'easeOutBounce';
        let easeTime = 1500.0;
        let currentMoment = moment().tz(this.props.timezones[this.props.currentTimezone]['timezone'])
                                    .format("h:m:s:a")
                                    .split(":");
        if(currentMoment === this.lastMoment){
            window.requestAnimationFrame((timestamp) => this.setRotation(timestamp));
            return;
        }
        this.lastMoment = currentMoment;
        if(this.props.label === 'seconds'){
            nextIndex = parseInt(currentMoment[2] - 1); 
            if(nextIndex < 1){
                nextIndex = 0;
                easeTime = 1800.0;
            } else {
                //easeType = 'easeInQuint';
                easeTime = 750.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.props.label === 'minutes'){
            nextIndex = parseInt(currentMoment[1]);
            if(nextIndex === 0){
                easeType = 'easeOutBounce';
                easeTime = 2500.0;
            } else {
                //easeType = 'easeInQuint';
                easeTime = 750.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.props.label === 'hours'){
            nextIndex = parseInt(currentMoment[0]) - 1;
            if(Math.abs(nextState.index - nextIndex) > 2){
                easeType = 'easeOutBounce';
                easeTime = 2500.0;
            } else {
                //easeType = 'easeInQuint';
                easeTime = 1500.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.props.label === 'cities') {
            //nextState.currentText = this.props.currentTimezone;
            nextIndex = this.props.currentTimezone;
            if(nextIndex === 0){
                easeType = 'easeOutBounce';
                easeTime = 2300.0;
            } else {
                //easeType = 'easeInQuint';
                easeTime = 1200.0;
            }
            nextState.currentText = nextIndex;
        }
        if(this.props.label === 'ampm') {
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
        //if(this.props.label == 'cities') {
        //    verbose = true;
        //}
        nextState.rotation = this.easer.getValue(timestamp, verbose);
        this.setState(nextState);
        window.requestAnimationFrame((timestamp) => this.setRotation(timestamp));
    }

    rotationNearIndex(index) {
        if(Math.abs(this.state.rotation - this.state.textPaths[index].angle) < 3.0){
            return true;
        } else {
            return false;
        }
    }

    render() {

        return (
            <div className="Gear">
                <svg width={this.state.renderModeHorizonal?"1920": "1080"} height={this.state.renderModeHorizonal?"1080": "1920"} fill="white" stroke="yellow">
                    <defs>
                        <radialGradient id={`${this.props.label}-gradient`} cx={this.props.radiantX} cy={this.props.radiantY} r="100%">
                            <stop offset="0%" style={{stopColor:`${this.props.color}`, stopOpacity:"0"}}/>
                            <stop offset="100%" style={{stopColor:`${this.props.color}`, stopOpacity: `${this.props.transparencyMax}`}}/>
                        </radialGradient>
                        <radialGradient id={`${this.props.label}-gradient2`} cx="1.07" cy="0.5">
                            <stop offset="0%" style={{stopColor:`white`, stopOpacity:"0.0"}}/>
                            <stop offset="100%" style={{stopColor:`red`, stopOpacity:"1.0"}}/>
                        </radialGradient>
                        <filter id={`${this.props.label}-blur`} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                        </filter>
                        <clipPath id={`${this.props.label}-clipper`}>
                            <rect x="0" y="500" width="100%" height="100"/>
                        </clipPath>
                    </defs>
                    <g transform={this.generateRotation()}>
                        <radialGradient id={`${this.props.label}-gradient2`} cx="100%" cy="0%">
                            <stop offset="0%" style={{stopColor:`white`, stopOpacity:"0.0"}}/>
                            <stop offset="100%" style={{stopColor:`red`, stopOpacity:"1.0"}}/>
                        </radialGradient>
                        <path className="main-shape" d={this.state.circlePath} fill={`url(#${this.props.label}-gradient)`} stroke="rgba(255,255,255,0.0)"/>
                        {
                            this.state.textPaths.map((item, index) => (
                                <React.Fragment key={`${this.props.label}-${index}`}>
                                <defs>
                                    <path id={`${this.props.label}-textpath-${item['index']}`} d={(this.rotationNearIndex(index) ? item['pathBig'] : item['path'])} stroke="blue"/>
                                </defs>
                                <g>
                                <text className={`Clock-Text${this.state.renderModeHorizonal? '': '-Vertical'} 
                                                ${(this.rotationNearIndex(index)) ? `Clock-Text-Gone${this.state.renderModeHorizonal? '': '-Vertical'}`: ''}`} >
                                    <textPath href={`#${this.props.label}-textpath-${item['index']}`}>
                                       {`${item['text']}`}
                                    </textPath>
                                </text>
                                </g>
                                </React.Fragment>
                            ))
                        }
                    </g>
                </svg>
                <div className={`Window-Div${this.state.renderModeHorizonal? '': '-Vertical'} `}>
                <svg width={this.state.renderModeHorizonal?"1920": "1080"} height={this.state.renderModeHorizonal?"1080": "1920"} fill="white" stroke="yellow">
                    <g transform={this.generateRotation2()}>
                        {
                            this.state.textPaths.map((item, index) => (
                                <React.Fragment key={`${this.props.label}-${index}`}>
                                <defs>
                                    <path id={`${this.props.label}-textpath-${item['index']}`} d={(this.rotationNearIndex(index) ? item['pathBig'] : item['pathBig'])} stroke="blue"/>
                                </defs>
                                <g>
                                <text className={`Clock-Text-Big${this.state.renderModeHorizonal? '': '-Vertical'} `}>
                                    <textPath href={`#${this.props.label}-textpath-${item['index']}`}>
                                       {`${item['text']}`}
                                    </textPath>
                                </text>
                                <text className={`Clock-Text-Big2${this.state.renderModeHorizonal? '': '-Vertical'} `}>
                                    <textPath href={`#${this.props.label}-textpath-${item['index']}`}>
                                       {`${item['text']}`}
                                    </textPath>
                                </text>
                                </g>
                                </React.Fragment>
                            ))
                        }
                    </g>
                </svg>
                </div>
            </div>
        )
    }

}

export default Gear;