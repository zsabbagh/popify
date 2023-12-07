// components
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
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

function StatisticsView(props: {
    user: User | undefined,
    topItems: any, // TODO: type this
    onLimitChange: (limit: number) => void,
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
                        <Card sx={{ maxWidth: 345, borderRadius: '20px' }}>
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
                                    width: '50%' }}>
                                    <Avatar sx={{ 
                                        bgcolor: blueGrey[200],
                                    }}>
                                        {index + 1}
                                    </Avatar>
                                </Box>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={onItemSelectedACB}>Select</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            );
        });
    }

    const items: Array<any> | undefined = props?.topItems?.items;

    async function onLimitChangeACB(event: any) {
        props.onLimitChange(event.target.value);
    }

    return (
        <Container sx={{marginTop: '80px',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box>
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
            </Box>
            <Slider
                aria-label="Limit"
                defaultValue={5}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                name="Limit"
                max={50}
                onChange={onLimitChangeACB}
                />
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

export default StatisticsView;