// shadow.js
class Shadow {
    constructor(dx = 2, dy = 4, stdDeviation = 2) {
        this.dx = dx;
        this.dy = dy;
        this.stdDeviation = stdDeviation;
    }
    
    render() {
        return `<feDropShadow dx="${this.dx}" dy="${this.dy}" stdDeviation="${this.stdDeviation}" />`;
    }
}

module.exports = Shadow;
