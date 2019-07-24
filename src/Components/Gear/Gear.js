import React from 'react';
import './Gear.css';

class Gear extends React.Component {

    constructor(props) {
        super(props)
        console.log(props);
        this.setState({
            label: props.label,
            texts: props.texts,
            currentText: 0
        });
    }

    render() {
        return (
            <div className="Gear">
                let count = 0;
                let len = this.state.texts.length;
                let width = this.state.width;
                let height = len * 10;
                <svg width={width} height={height} style="fill:lime">
                    <path  />
                </svg>
            </div>
        )
    }

}

export default Gear;