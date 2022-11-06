import { Strip } from "../classes/Strips/Strip";

export type StageViewerProps = {
    strips: Strip[];
    onStripClick?: (index: number, ledIndex: number) => void;
    selectedStrip?: number;
}

export const StageViewer = ({ strips, onStripClick, selectedStrip }: StageViewerProps) => {

    //Render the strips and make a div for each pixel
    return (
        <div style={{
            position: "relative",
        }}>
            {strips.map((strip, stripIndex) => {
                const ledSize = {
                    width: strip.getPhysicalLedSize(),
                    height: 10
                }
                const angle = strip.getStripAngle;
                return (
                    <div key={stripIndex}>
                        {strip.getPhysicalPositions().map((ledPosition, index) => {
                            return (
                                <div key={index} style={{
                                    position: "absolute",
                                    top: ledPosition.y,
                                    left: ledPosition.x,
                                    width: ledSize.width,
                                    height: ledSize.height,
                                    backgroundColor: "red",
                                    transform: `rotate(${angle}deg)`,
                                    borderWidth: 1,
                                    borderStyle: "solid",
                                    borderColor: selectedStrip === stripIndex ? "blue" : "black",
                                    zIndex: 1
                                }}
                                    onClick={() => {
                                        if (onStripClick) {
                                            onStripClick(stripIndex, index);
                                        }
                                    }}></div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}
