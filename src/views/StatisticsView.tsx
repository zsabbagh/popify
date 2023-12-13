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
    Audiotrack,
} from '@mui/icons-material';
import { ItemData, User } from '../interfaces';
import { blueGrey, deepOrange } from '@mui/material/colors';
import CardPages from '../components/CardPages';

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

export default function StatisticsView(props: {
        location: string,
        onLocationChange: (location: string) => void,
        topItems: Array<ItemData> | undefined, // TODO: type this
        timeRange: string,
        onTimeRangeChange: (timeRange: string) => void,
        onItemSelected: (item: any) => void,
    }) {

    const items: Array<ItemData> | undefined = props?.topItems;
    const [dropdownOpened, setDropdownOpened] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);

    return (
        <Container sx={{
            marginTop: '80px',
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
                    <Tab icon={<Person />} value="artists" label="Artists" sx={boxShadow} />
                    <Tab icon={<Audiotrack />} value="tracks" label="Tracks" sx={boxShadow} />
                    <Tab icon={<AutoStories />} value="genres" label="Genres" sx={boxShadow} />
                </Tabs>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px',
                marginBottom: '75px',
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
                <CardPages
                    currentPage={currentPage}
                    onPageChange={(value: any) => setCurrentPage(value)}
                    items={items}
                    onItemSelected={props.onItemSelected} />
            </div>
        </Container>
    );
}