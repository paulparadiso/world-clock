class Easer {

    setup(startTime, duration, startVal, endVal, easingFunc) {
        //console.log(`Easer setup: ${startTime}, ${duration}, ${startVal}, ${endVal}, ${easingFunc}`)
        this.startTime = startTime;
        this.duration = duration;
        this.startVal = startVal;
        this.endVal = endVal;
        this.easingFunc = easingFunc; 
        //console.log(`Easing from ${this.startVal} to ${this.endVal}`);
    }
    
    linear(t) {
        const currentTime = t - this.startTime;
        const val = this.startVal + (this.endVal - this.startVal) * (currentTime / this.duration)
        return val;
    }

    easeInQuad(t, verbose) {
        const valDiff = this.endVal - this.startVal;
        const currTime = t - this.startTime;
        const timeDiff = currTime / this.duration;
        const val = valDiff * (timeDiff / this.duration) * timeDiff + this.startVal;
        if(verbose) {
            console.log(`Making ease from ${timeDiff} and ${valDiff}, ${this.startVal}, ${val}`);
        }
        return val;
    }

    easeInQuint(t, verbose) {
        const valDiff = this.endVal - this.startVal;
        const currTime = t - this.startTime;
        const timeDiff = currTime / this.duration;
        const val = valDiff * timeDiff * timeDiff * timeDiff * timeDiff * timeDiff + this.startVal;
        if(verbose) {
            console.log(`Easing from ${this.startVal} to ${this.endVal} current value = ${val}`);
        }
        return val;
    }
        
    easeInOutElastic(t, verbose) {
        const valDiff = this.endVal - this.startVal;
        const currTime = t - this.startTime;
        const timeDiff = currTime / this.duration;
        const b = this.startVal;
        const c = valDiff;
        const d = this.duration;
        let s=1.70158;var p=0;var a=c;
        if (t===0) return b;  if ((timeDiff/2)===2) return b+c;  if (!p) p=d*(.3*1.5);
        if (a < Math.abs(c)) { a=c; s=p/4; }
        else s = p/(2*Math.PI) * Math.asin (c/a);
        if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
    }

    easeInBounce(t, verbose) {
        let valDiff = this.endVal - this.startVal;
        return valDiff - this.easeOutBounce();
    }

    easeOutBounce(t, verbose) {
        let valDiff = this.endVal - this.startVal;
        let currTime = t - this.startTime;
        let timeDiff = currTime / this.duration;
        if(timeDiff < 2/2.75) {
            return valDiff * (1.5625 * timeDiff * timeDiff) + this.startVal;
        /*} else if(timeDiff < (2/2.75)) {
            return valDiff*(0.5625*(timeDiff-=(1.5/2.75)) * timeDiff + .75) + this.startVal;*/
        } else if (timeDiff < (2.5/2.75)) {
			return valDiff*(7.5625*(timeDiff-=(2.25/2.75)) * timeDiff + .9375) + this.startVal;
		} else {
			return valDiff*(7.5625*(timeDiff-=(2.625/2.75)) * timeDiff + .984375) + this.startVal;
		}

    }

    getValue(t, verbose = false){
        //console.log(`Calling getValue: ${t}`);
        if(t > this.startTime + this.duration) {
            return this.endVal;
        }
        if(this.easingFunc === 'linear') {
            //console.log(`Calling linear function.`);
            return this.linear(t, verbose);
        }
        if(this.easingFunc === 'easeInQuad') {
            return this.easeInQuad(t, verbose);
        }
        if(this.easingFunc === 'easeInQuint') {
            return this.easeInQuint(t, verbose);
        }
        if(this.easingFunc === 'easeInOutElastic') {
            return this.easeInOutElastic(t, verbose);
        }
        if(this.easingFunc === 'easeOutBounce') {
            return this.easeOutBounce(t, verbose);
        }
        console.log('Returning 0.0');
        return 0.0;
    }

}

export default Easer;