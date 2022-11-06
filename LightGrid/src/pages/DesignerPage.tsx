import { useState, useEffect } from "react";
import { StraightStrip } from "../classes/Strips/StraightStrip";
import { Point } from "../classes/Point";
import { Strip } from "../classes/Strips/Strip";
import { StageViewer } from "../components/StageViewer";
import { Grid } from "@mui/material";
import { StripSettings } from "../components/Settings/StripSettings";
import { StripManager } from "../components/Settings/StripManager";

export const DesignerPage = () => {
    const [strips, setStrips] = useState<Strip[]>([]);
    const [selectedStripIndex, setSelectedStrip] = useState<number>(-1);
    useEffect(() => {
        const startPoint = new Point(0, 0);
        const startPoint2 = new Point(0, 100);
        const strip = new StraightStrip("0", startPoint, 100, 500);
        strip.scaleFactor = 2;

        const strip2 = new StraightStrip("1", startPoint2, 300, 500);
        strip2.scaleFactor = 2;
        strip2.rotate(40);

        console.log(strip.getPhysicalLedSize());
        console.table(strip.getPhysicalPositions());
        setStrips([strip, strip2]);
    }, [])

    const changeSelectedStrip = (newStrip: Strip) => {
        const newStrips = [...strips];
        newStrips[selectedStripIndex] = newStrip;
        setStrips(newStrips);
    }



    return (<>
        <Grid container sx={{
            minHeight: "95vh",
        }}>
            <Grid item xs={8} sx={{
                overflow: "hidden"
            }}>
                <StageViewer onStripClick={(index: number, ledIndex: number) => {
                    console.log(`Strip ${index} led ${ledIndex} clicked`);
                    setSelectedStrip(index);
                }} strips={strips} selectedStrip={selectedStripIndex} />
            </Grid>
            <Grid item xs={4}>
                <StripSettings changeSelectedStrip={changeSelectedStrip} selectedStrip={selectedStripIndex >= 0 ? strips[selectedStripIndex] : null} />
                <StripManager setSelectedStrip={(index) => setSelectedStrip(index)} strips={strips} setStrips={setStrips} />
            </Grid>
        </Grid>

    </>);
}