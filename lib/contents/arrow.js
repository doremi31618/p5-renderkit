

import Content from './content.js';

export default class ArrowPattern extends Content {
    constructor(p5, x, y, arrowSpan=50) {
        super(p5)
        this.x = x;
        this.y = y;
        this.arrowSpan = arrowSpan;
    }

    draw() {
        
        this.p5.push();
        // let x2 = this.p5.mouseX;
        // let y2 = this.p5.mouseY;
        let x2 = this.x;
        let y2 = this.y;

        let arrowSpan = this.arrowSpan;
        let x1 = x2 + arrowSpan;
        let y1 = y2 - arrowSpan;

        let angle = this.p5.atan2(y2 - y1, x2 - x1);

        this.p5.translate(x1, y1);
        this.p5.rotate(angle);

        let shaftLength = this.p5.dist(x1, y1, x2, y2) - 20;
        this.p5.line(0, 0, shaftLength, 0); // 箭桿

        let arrowSize = 20;
        this.p5.translate(shaftLength, 0);

        // 畫箭頭，稍微傾斜一點
        this.p5.beginShape();
        this.p5.vertex(arrowSize, 0);
        this.p5.vertex(-5, arrowSize * 0.5);
        this.p5.vertex(-5, -arrowSize * 0.5);
        this.p5.endShape(this.p5.CLOSE);

        this.p5.pop();
    }
}