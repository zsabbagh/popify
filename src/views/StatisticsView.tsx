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
    MenuItem,
    InputLabel,
    Select,
    Slider,
    Typography,
} from '@mui/material';
// icons
import {
    RadioButtonChecked,
    CheckBox,
    Favorite,
} from '@mui/icons-material';
import { User } from '../interfaces';
import { blueGrey, deepOrange } from '@mui/material/colors';

const DEBUG = {
    border: '1px solid red',
};
const none = '';
const theme = {
    spacing: 8,
};

export default
function StatisticsView(props: {
    user: User | undefined,
    topItems: any, // TODO: type this
    onLimitChange: (limit: number) => void,
    onItemSelected: (item: any) => void,
    onTimeRangeChange: (timeRange: string) => void,
}) {

    // component states
    const [limit, setLimit] = React.useState(props?.topItems?.items?.length || 5);
    const [open, setOpen] = React.useState(false);
    const [timeRange, setTimeRange] = React.useState('short_term');

    // handles the time limit slider
    async function onLimitChangeACB(event: any) {
        setLimit(event.target.value);
        props.onLimitChange(event.target.value);
    }

    async function onTimeRangeOpenedACB() {
        setOpen(true);
    }
    async function onTimeRangeClosedACB() {
        setOpen(false);
    }
    // the user has selected a new time range
    async function onTimeRangeChangedACB(event: any) {
        setTimeRange(event.target.value);
        props.onTimeRangeChange(event.target.value);
    }

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
                        <Card sx={{
                            maxWidth: 345, 
                            borderRadius: '20px', 
                            ':hover': {
                                boxShadow: '0 0 11px rgba(33,33,33,.2)',
                            }, }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.images[0]?.url}
                            />
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <Box sx={{
                                    width: '80%',
                                }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    {item.type}
                                    </Typography>
                                </Box>
                                <Box sx={{ 
                                    display: 'flex',
                                    justifyContent: 'right',
                                    alignItems: 'center',
                                    width: '50%' }}>
                                    nr
                                    <Avatar sx={{ 
                                        bgcolor: blueGrey[200],
                                        marginLeft: '10px',
                                    }}>
                                        {index + 1}
                                    </Avatar>
                                </Box>
                            </CardContent>
                            <CardActions
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}>
                                <Button size="small" onClick={onItemSelectedACB}>Show More</Button>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                    marginLeft: 'auto',
                                    alignItems: 'center',
                                    width: '50%',
                                }}
                                >
                                    Popularity:
                                    <Avatar sx={{bgcolor: 'transparent', color: 'black'}}>{item.popularity}</Avatar>
                                </Box>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            );
        });
    }

      

    const items: Array<any> | undefined = props?.topItems?.items;


    return (
        <Container sx={{marginTop: '80px',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div>
                <Typography sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    Top Items for { props.user?.display_name }
                </Typography>
            </div>
            <Slider
                aria-label="Limit"
                defaultValue={limit}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                name="Limit"
                max={50}
                onChange={onLimitChangeACB}
                />
            <div>
                <Button sx={{ display: 'block', mt: 2 }} onClick={onTimeRangeOpenedACB}>
                Select Time Range
                </Button>
                <FormControl sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={onTimeRangeClosedACB}
                    onOpen={onTimeRangeOpenedACB}
                    value={timeRange}
                    label="Time Range"
                    onChange={onTimeRangeChangedACB}
                >
                    <MenuItem value={'short_term'}>4 weeks</MenuItem>
                    <MenuItem value={'medium_term'}>6 months</MenuItem>
                    <MenuItem value={'long_term'}>Several years</MenuItem>
                </Select>
                </FormControl>
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