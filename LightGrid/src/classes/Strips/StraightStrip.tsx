import { Point } from "../Point";
import { StripBase } from "./StripBase";

export class StraightStrip implements StripBase {
    private end: Point;
    constructor(public id: string, private start: Point, private leds: number, private physicalLength: number) {
        this.end = new Point(start.x + physicalLength, start.y);
    }

    public scaleFactor = 2;

    get startPoint(): Point {
        return this.start;
    }

    get endPoint(): Point {
        return this.end;
    }

    get ledCount(): number {
        return this.leds;
    }

    set ledCount(count: number) {
        this.leds = count;
    }

    get stripLength(): number {
        return Math.sqrt(Math.pow(this.end.x - this.start.x, 2) + Math.pow(this.end.y - this.start.y, 2));
    }

    // make a function to rotate the strip by a given angle in degrees
    public rotate(angle: number) {
        const angleRad = angle * Math.PI / 180;
        this.end.x = this.start.x + this.physicalLength * Math.cos(angleRad);
        this.end.y = this.start.y + this.physicalLength * Math.sin(angleRad);
    }

    public move(x: number, y: number) {
        this.start.x += x;
        this.start.y += y;
        this.end.x += x;
        this.end.y += y;
    }

    public setPosition(x: number, y: number) {
        const dx = x - this.start.x;
        const dy = y - this.start.y;
        this.move(dx, dy);
    }

    get getStripAngle(): number {
        //return value in degrees
        return Math.ceil(Math.atan2(this.end.y - this.start.y, this.end.x - this.start.x) * 180 / Math.PI);
    }

    get getPhysicalLength(): number {
        return this.physicalLength;
    }

    public setPhysicalLength(length: number) {
        this.physicalLength = length;
    }

    public getPhysicalLedSize(): number {
        return (this.physicalLength / this.leds) * this.scaleFactor;
    }

    // get the physical positions of the leds with a scale of 1cm = 20px
    public getPhysicalPositions(): Point[] {
        const positions: Point[] = [];
        const ledSize = this.getPhysicalLedSize();
        const angle = this.getStripAngle;
        for (let i = 0; i < this.leds; i++) {
            const x = this.start.x + (i * ledSize * Math.cos(angle * Math.PI / 180));
            const y = this.start.y + (i * ledSize * Math.sin(angle * Math.PI / 180));
            positions.push(new Point(x, y));
        }
        return positions;
    }

}