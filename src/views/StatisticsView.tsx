// components
import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
// icons
import {
    Album,
    Person,
    AutoStories,
    RadioButtonChecked,
    CheckBox,
    Favorite,
} from '@mui/icons-material';
import { User } from '../interfaces';
import { blueGrey, deepOrange } from '@mui/material/colors';
import ItemCard from '../components/ItemCard';

const DEBUG = {
    border: '1px solid red',
};
const none = '';
const theme = {
    spacing: 8,
};

export default
function StatisticsView(props: {
    location: string,
    onLocationChange: (location: string) => void,
    user: User | undefined,
    topItems: any, // TODO: type this
    limit: number,
    onLimitChange: (limit: number) => void,
    timeRange: string,
    onTimeRangeChange: (timeRange: string) => void,
    onItemSelected: (item: any) => void,
}) {

    function generateGridItems() {
        const items: Array<any> | undefined = props?.topItems;
        if (!items) {
            return <></>;
        }
        const itemStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
            margin: '10px',
        };
        return items.map((item: any, index: number) => {
            async function onItemSelectedACB() {
                props.onItemSelected(item);
            }
            return (
                <Grid key={item.id} item xs={4} xl={2}
                    sx={{
                        alignContent: 'center',
                    }}>
                    <Box
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        <ItemCard item={item} index={index} onItemSelected={onItemSelectedACB} />
                    </Box>
                </Grid>
            );
        });
    }

    const items: Array<any> | undefined = props?.topItems?.items;
    const [dropdownOpened, setDropdownOpened] = React.useState(false);

    return (
        <Container sx={{marginTop: '80px',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '0px',
                marginBottom: '20px',
            }}>
                <Tabs
                    value={props.location}
                    onChange={(event: any, value: any) => props.onLocationChange(value)}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab icon={<Person/>} value="artists" label="Artists" />
                    <Tab icon={<Album/>} value="tracks" label="Tracks" />
                    <Tab icon={<AutoStories/>} value="genres" label="Genres"/>
                </Tabs>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                marginBottom: '20px',
            }}>
                <div style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                }}>
                    <Typography id="discrete-slider" gutterBottom>
                        Limit
                    </Typography>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Avatar sx={{
                            bgcolor: 'transparent',
                            border: '1px solid black',
                            marginRight: '10px',
                            color: 'black'}}>
                            {props.limit}
                        </Avatar>
                        <Slider
                            aria-label="Limit"
                            defaultValue={props.limit}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={1}
                            name="Limit"
                            max={50}
                            onChange={(event: any, value: any) => props.onLimitChange(value) }
                            />
                    </div>
                </div>
                <div style={{
                    width: '80%',
                    marginRight: '20px',
                }}>
                    <Button sx={{ display: 'block', mt: 2 }} onClick={() => setDropdownOpened(!dropdownOpened)}>
                    Select Time Range
                    </Button>
                    <FormControl sx={{ m: 1, minWidth: 250 }}>
                    <InputLabel id="demo-controlled-open-select-label">Time Range</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={dropdownOpened}
                        onClose={() => setDropdownOpened(false)}
                        onOpen={() => setDropdownOpened(true)}
                        value={props.timeRange}
                        label="Time Range"
                        onChange={(event: any) => props.onTimeRangeChange(event.target.value)}
                    >
                        <MenuItem value={'short_term'}>4 weeks</MenuItem>
                        <MenuItem value={'medium_term'}>6 months</MenuItem>
                        <MenuItem value={'long_term'}>Several years</MenuItem>
                    </Select>
                    </FormControl>
                </div>
            </div>
            <Grid container spacing={4}
                sx={{position: 'absolute',
                    marginTop: '25px',
                    width: '90%',
                    }}>
                {generateGridItems()}
            </Grid>
        </Container>
    );
}