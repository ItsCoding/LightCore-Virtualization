import { Button, Divider, Paper, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Strip } from "../../classes/Strips/Strip";
import { useSnackbar } from "notistack";
import { StraightStrip } from "../../classes/Strips/StraightStrip";
import { Point } from "../../classes/Point";
import { useState } from "react";


export type StripManagerProps = {
    strips: Strip[];
    setStrips: (newStrips: Strip[]) => void;
    setSelectedStrip: (index: number) => void;
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: true },
    {
        field: 'ledCount',
        headerName: 'LED Count',
        width: 200,
        editable: true,
    },
    {
        field: 'getPhysicalLength',
        headerName: 'Physical Length',
        width: 150,
        editable: true,
        valueFormatter: (params) =>
            `${params.value} cm`,
    },
];

const randomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

export const StripManager = ({ strips, setStrips, setSelectedStrip }: StripManagerProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const addNewStrip = () => {
        const newStrips = [...strips];
        newStrips.push(new StraightStrip(randomString(5), new Point(0, 0), 100, 100));
        setStrips(newStrips);
        enqueueSnackbar(`New Strip Added with ID ${strips.length}`, { variant: "success" });
    }

    const removeSelectedStrips = () => {
        const newStrips = [...strips];
        selectedRows.forEach((row) => {
            newStrips.splice(row, 1);
        })
        setStrips(newStrips);
        enqueueSnackbar(`Strips Removed`, { variant: "success" });
    }


    const Footer = (
        <>
            <Button onClick={addNewStrip}>New</Button>
            <Button color="error" onClick={removeSelectedStrips}>Delete</Button>
        </>
    )

    return (<>
        <div style={{
            marginTop: 10,
            height: "400px"
        }}>
            <Paper sx={{
                width: "100%",
                height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
                paddingBottom: "50px"
            }}>
                <Typography variant="h6">
                    Strips
                </Typography>
                <Divider />
                <DataGrid
                    onRowClick={(e) => {
                        const index = strips.findIndex((strip) => strip.id === e.row.id);
                        if (index !== -1) {
                            setSelectedStrip(index);
                        }
                    }}
                    rows={strips}
                    // rows={[]}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    components={{
                        Footer: () => Footer
                    }}
                    onSelectionModelChange={(newSelection) => {
                        setSelectedRows(newSelection as number[]);
                        console.log(newSelection);
                    }}
                    checkboxSelection
                    disableSelectionOnClick
                    onProcessRowUpdateError={(params) => console.log(params)}
                    onCellEditCommit={(params) => {
                        //Get index of the strip that was edited
                        console.log("OLD: ", params)
                        const index = strips.findIndex(strip => strip.id === params.id);
                        const newStrips = [...strips];
                        const strip = newStrips[index];
                        if (params.field === "ledCount") {
                            strip.ledCount = parseInt(params.value as string);
                        }
                        else if (params.field === "getPhysicalLength") {
                            strip.setPhysicalLength(parseInt(params.value as string));
                        }
                        else if (params.field === "id" && params.value.length > 0 && params.value !== strip.id) {
                            if (strips.findIndex(strip => strip.id === params.value) !== -1) {
                                enqueueSnackbar("Strip ID already exists", { variant: "error" });
                            } else {
                                strip.id = params.value as string;
                            }
                        }
                        console.log(index, strip)
                        setStrips(newStrips);
                    }}
                />
            </Paper>

        </div>
    </>)
}