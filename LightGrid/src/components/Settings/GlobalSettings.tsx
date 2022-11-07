import { Divider, InputAdornment, Paper, Slider, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Strip } from "../../classes/Strips/Strip";
import { debounce } from "lodash";
export type StripSettingsProps = {
    strips: Strip[];
    setStrips: (newStrips: Strip[]) => void;
    globalScaling: number;
    setGlobalScalingState: (newScaling: number) => void;
}

export const GlobalSettings = ({ setStrips, strips, setGlobalScalingState, globalScaling }: StripSettingsProps) => {

    const [getGlobalMaxStripDensity, setGlobalMaxStripDensityState] = useState(60)

    useEffect(() => {
        debounce(() => {
            console.log("Global Settings Updated");
            //find the max strip density
            let maxDensity = 0;
            strips.forEach(strip => {
                const density = strip.ledCount / (strip.getPhysicalLength / 100)
                if (maxDensity < density) {
                    maxDensity = density;
                }
            })
            setGlobalMaxStripDensityState(maxDensity);
        }, 1000);

    }, [strips])


    const setGlobalMaxStripDensity = (newDensity: number) => {
        setGlobalMaxStripDensityState(newDensity)
        const newStrips = [...strips]
        newStrips.forEach(strip => {
            strip.maxStripDensity = newDensity
        })
        setStrips(newStrips)
    }


    return (
        <Paper sx={{
            width: "100%",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "10px",
            marginTop: "10px"
        }}>
            <Typography variant="h6">
                Global Settings
            </Typography>
            <Divider />
            <Typography variant="caption">
                Global Scaling
            </Typography>
            <Slider
                aria-label="Angle"
                value={globalScaling}
                min={0.5}
                max={10}
                step={0.1}
                valueLabelDisplay="auto"
                onChange={(e, v) => setGlobalScalingState(v as number)}
            />
            <TextField type={"number"} id="standard-basic" label="Most Dense Strip" variant="standard" InputProps={{
                endAdornment: <InputAdornment position="start">/m</InputAdornment>,
            }} disabled onChange={(e) => setGlobalMaxStripDensity(parseInt(e.target.value))} value={getGlobalMaxStripDensity} fullWidth />

        </Paper>
    )
}