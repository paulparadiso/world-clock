import React from 'react';
import './Gear.css';
import { isFor, thisTypeAnnotation } from '@babel/types';

class Gear extends React.Component {

    constructor(props) {
        super(props)
        let height = props.texts.length * 20 + 40;
        this.state = {
            label: props.label,
            texts: props.texts,
            width: 1920,
            height: 1080,
            spacing: 2, 
            limit: props.limit,
            textPaths: [],
            x: parseInt(props.x),
            y: parseInt(props.y),
            rotation: 0,
            radius: parseInt(props.radius),
            currentText: 0,
            lastChange: 0
        };
        console.log(this.state);
        window.setInterval(() => this.setRotation(), 1000);
    }

    componentDidMount() {
        this.generate();
    }

    generatePath(width, height) {
        return `M0 0 L${width} ${height/2} L0 ${height}`;
    }

    generateTextPath(key) {
        return `M0 ${key * 20 + 20} L${this.state.width} ${this.state.height /2}`
    }

    generateTextPathID(key) {
        return `textpath-${key}`;
    }

    getTextPathID(key) {
        return `#textpath-${key}`;
    }

    generate() {
        let cx = this.state.x;
        let cy = this.state.y;
        let paths = []
        let radius = this.state.radius;
        let circlePath = `M${cx} ${cy}`;
        let segments = [];
        let steps = this.state.texts.length + 1;
        let max = steps * this.state.spacing;
        for(let i = 0; i < this.state.texts.length + 2; i++) {
            console.log(radius);
            let currentPosition = ((i * this.state.spacing) / max) * this.state.limit; 
            let angle = 2 * Math.PI * (0.5 - currentPosition);
            let x = cx + (radius * Math.cos(angle));
            let y = cy + (radius * Math.sin(angle));
            let tx = cx + ((radius * 0.98) * Math.cos(angle));
            let ty = cy + ((radius * 0.98) * Math.sin(angle));
            if(i == 0){
                circlePath += `L${Math.floor(x)} ${Math.floor(y)}`;
            }
            circlePath += `A${radius} ${radius} 0 0 0 ${Math.floor(x)} ${Math.floor(y)}`;
            if(i > 0 && i < this.state.texts.length + 1) {
                let segmentPath = `M${Math.floor(tx)} ${Math.floor(ty)} L${cx} ${cy}`
                console.log(segmentPath);
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

    generateCircle() {
        let cx = this.state.x;
        let cy = this.state.y;
        let paths = []
        let radius = this.state.radius;
        let svgPath = `M${cx} ${cy}`;
        let segments = [];
        let steps = this.state.texts.length + 1;
        let max = steps * this.state.spacing;
        for(let i = 0; i < this.state.texts.length; i++) {
            let currentPosition = ((i * this.state.spacing) / max) * this.state.limit;
            let angle = 2 * Math.PI * (0.5 - currentPosition);
            let x = cx + (radius * Math.cos(angle));
            let y = cy + (radius * Math.sin(angle));
            if(i == 0){
                svgPath += `L${Math.floor(x)} ${Math.floor(y)}`;
            }
            svgPath += `A${radius} ${radius} 0 0 0 ${Math.floor(x)} ${Math.floor(y)}`;
        }
        svgPath += `L${cx} ${cy} Z`;
        console.log(svgPath);
        return svgPath;
    }

    generateLine() {
        let cx = this.state.radius;
        let cy = this.state.radius;
        let radius = this.state.radius;
        let x = cx + (radius * Math.cos(2*Math.PI * 0.5));
        let y = cy + (radius * Math.sin(2*Math.PI * 0.5));
        return `M${cx} ${cy} L${x} ${y}`;
    }

    generateRotation() {
        let r = this.state.rotation;
        return `rotate(${(r)}, ${this.state.x}, ${this.state.y})`;
    }

    setRotation() {
        let nextState = {...this.state};
        let date = new Date();
        let index = 0;
        if(this.state.label == 'seconds'){
            index = date.getSeconds();
            nextState.currentText = index;
        }
        if(this.state.label == 'minutes'){
            index = date.getMinutes();
            nextState.currentText = index;
        }
        if(this.state.label == 'hours'){
            index = date.getHours() - 1;
            if( index > 12) {
                index = index - 13;
            }
            nextState.currentText = index;
        }
        if(this.state.label == 'cities') {
             let seconds = date.getSeconds();
             if(seconds % 5 == 0){
                 if(nextState.lastChange != seconds){
                    nextState.currentText = (nextState.currentText + 1) % this.state.texts.length;
                    index = nextState.currentText;
                    nextState.lastChange = seconds;
                }
             } else {
                 return;
             }
        }
        if(this.state.textPaths.length > 0) {
            let r = this.state.textPaths[index].angle;
            nextState.rotation = r;
            //console.log(`Setting rotation to ${r}`)
            this.setState(nextState);
        }
    }

    render() {
        let width = this.state.width;
        let height = this.state.height;
        let count = 0;
        const paths = [] 
        //paths.push(<React.Fragment key="1">);
        //paths.push(</React.Fragment>);
        return (
            <div className="Gear">
                <svg width="1920" height="1080" fill="white" stroke="black">
                    <g transform={this.generateRotation()}>
                        <path d={this.state.circlePath}/>
                        {
                            this.state.textPaths.map((item, index) => (
                                <React.Fragment key={`${this.state.label}-${index}`}>
                                <defs>
                                    <path id={`${this.state.label}-textpath-${item['index']}`} d={item['path']} stroke="blue"/>
                                </defs>
                                <text className={`Clock-Text ${this.state.currentText == index ? 'Clock-Text-Big': ''}`} fill="black">
                                    <textPath href={`#${this.state.label}-textpath-${item['index']}`}>
                                       {`${item['text']}`}
                                    </textPath>
                                </text>
                                </React.Fragment>
                            ))
                        }
                    </g>
                </svg>
            </div>
        )
    }

}

export default Gear;