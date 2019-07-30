import React from 'react';
import './Gear.css';

class Gear extends React.Component {

    constructor(props) {
        super(props)
        console.log(props);
        let height = props.texts.length * 20 + 40;
        this.state = {
            label: props.label,
            texts: props.texts,
            width: props.width,
            height: height,
            x: props.x,
            y: props.y,
            rotation: 0,
            radius: 500,
            currentText: 0
        };
        window.setInterval(this.setRotation.bind(this), 10);
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

    generateCircle() {
        let cx = this.state.radius;
        let cy = this.state.radius;
        let paths = []
        let radius = this.state.radius;
        let svgPath = `M${cx} ${cy}`;
        for(let i = 0; i < 5; i++) {
            let currentPosition = i / 10.0;
            let x = cx + (radius * Math.cos(2*Math.PI * (0.5 - currentPosition)));
            let y = cy + (radius * Math.sin(2*Math.PI * (0.5 - currentPosition)));
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
        const r = this.state.rotation;
        return `rotate(${r}, ${this.state.radius}, ${this.state.radius})`;
    }

    setRotation() {
        const nextState = {...this.state};
        nextState.rotation = (this.state.rotation + 1) % 360;
        this.setState(nextState);
    }

    render() {

        let width = this.state.width;
        let height = this.state.height;
        this.state.texts.map( (item, key) => {
            console.log(`${item} | ${key}`)
        })
        let count = 0;
        const paths = [] 
        this.state.texts.map( (item) => (
            paths.push(
            <React.Fragment key={count}>
                <path id={this.generateTextPathID(count)} d={this.generateTextPath(count)}/>
                <text className="Clock-Text">
                    <textPath href={this.getTextPathID(count++)}>
                        {item}
                    </textPath>
                </text>
            </React.Fragment>
            )
        ));
        console.log(paths);
        return (
            <div className="Gear">
                <svg width={this.state.radius * 2} height={this.state.radius * 2} fill="red" x={this.state.x}>
                    <g transform={this.generateRotation()}>
                        <path d={this.generateCircle()}/>
                        <path d={this.generateLine()} stroke="blue"/>
                    </g>
                </svg>
            </div>
        )
    }

}

export default Gear;