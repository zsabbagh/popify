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
    Pagination,
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
const boxShadow = {
    ':hover': {
        boxShadow: '0 0 20px rgba(33,33,33,.2)',
        transition: 'box-shadow 0.3s ease-in-out',
    },
}

export default
function StatisticsView(props: {
    location: string,
    onLocationChange: (location: string) => void,
    topItems: any, // TODO: type this
    timeRange: string,
    onTimeRangeChange: (timeRange: string) => void,
    onItemSelected: (item: any) => void,
}) {

    const items: Array<any> | undefined = props?.topItems;
    const [dropdownOpened, setDropdownOpened] = React.useState(false);

    const [currentPage, setCurrentPage] = React.useState(1);
    // presents 9 items per page
    const itemsPerPage = 9;
    const maxPages = Math.ceil((items?.length || 0) / itemsPerPage);
    
    function getPageSlice() {
        if (!items) {
            return [];
        }
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return items.slice(start, end);
    }

    function generateGridItems() {
        const items = getPageSlice();
        if (!items) {
            return <></>;
        }
        let opacity = 0.5;
        return items.map((item: any, index: number) => {
            index = index + (currentPage - 1) * itemsPerPage;
            async function onItemSelectedACB() {
                props.onItemSelected(item);
            }
            // delay for animation
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


    function onPageChangeACB(event: any, value: any) {
        setCurrentPage(value);
        console.log("page changed to ", value);
    }

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
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                >
                    <Tab icon={<Person/>} value="artists" label="Artists" sx={boxShadow}/>
                    <Tab icon={<Album/>} value="tracks" label="Tracks" sx={boxShadow}/>
                    <Tab icon={<AutoStories/>} value="genres" label="Genres" sx={boxShadow}/>
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
            <Pagination count={maxPages}
                defaultPage={1}
                siblingCount={2}
                onChange={onPageChangeACB}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}
            />
            <Grid container spacing={4}
                sx={{position: 'relative',
                    marginTop: '25px',
                    martinBottom: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    }}>
                {generateGridItems()}
            </Grid>
        </Container>
    );
}