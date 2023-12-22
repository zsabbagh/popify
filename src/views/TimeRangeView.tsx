import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import React from "react";

export default function TimeRangeView(props: {
    timeRange: string,
    timeRanges: Array<string>,
    onTimeRangeChange?: (type: string) => void | undefined,
}) {

    function setLabel(type: string) {
        if(type===props.timeRanges[0]) return 'Four weeks'
        else if(type===props.timeRanges[1]) return 'Six months'
        else return 'Several years'
    }

    async function onTimeRangeChangeACB(newTime: string) {
        props.onTimeRangeChange ? props.onTimeRangeChange(newTime) : undefined;
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40px',
            marginBottom: '20px',
        }}
        >
            <p style={{ fontSize: '1.5rem',
                        margin: '10px',
            }}>
                What you have been listening to the past
            </p>
            <RadioGroup
                row
                value={props.timeRange}
                onChange={(event: any, value: any) => onTimeRangeChangeACB(value)}
                aria-label="time range selection"
            >
                {
                    props.timeRanges.map((type: string) => {
                        let label=setLabel(type);
                        return <FormControlLabel value={type} control={<Radio size="small" />} label={label} />
                    })
                }
            </RadioGroup>
        </div>
    );
}
