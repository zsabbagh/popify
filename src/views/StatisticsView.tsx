// components
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography,
} from '@mui/material';
// icons
import {
    RadioButtonChecked,
    Favorite,
} from '@mui/icons-material';
import { User } from '../interfaces';

const border = '1px solid black';
const theme = {
    spacing: 8,
};

function StatisticsView(props: {
    user: User | undefined,
    topItems: any, // TODO: type this
    onItemSelected: (item: any) => void,
}) {

    function generateGridItems() {
        const items: Array<any> | undefined = props?.topItems?.items;
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
                <Grid key={item.id} item xs={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.images[0]?.url}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            {item.type}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={onItemSelectedACB}><Favorite/></Button>
                        </CardActions>
                    </Card>
                </Grid>
            );
        });
    }

    const items: Array<any> | undefined = props?.topItems?.items;

    return (
        <Container sx={{marginTop: '80px'}}>
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
                    Statistics for { props.user?.display_name }
                </Typography>
            </Box>
            <Grid container spacing={12}
                sx={{position: 'absolute'}}>
                {generateGridItems()}
            </Grid>
        </Container>
    );
}

export default StatisticsView;