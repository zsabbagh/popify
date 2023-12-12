import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "../interfaces";
import CardPages from "../components/CardPages";
import { useState } from "react";
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from "@mui/material";
import { set } from "mobx";
import { Album, AutoStories, Person, Audiotrack } from "@mui/icons-material";

export default
function SearchView(props: {items: any, onItemSelected: any, page: number, setPage: any, location: string, onLocationChange: any}) {
    const boxShadow = {
        ':hover': {
            boxShadow: '0 0 20px rgba(33,33,33,.2)',
            transition: 'box-shadow 0.3s ease-in-out',
        },
    }

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
                    <Tab icon={<Album />} value="albums" label="Albums" sx={boxShadow} />
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
            <CardPages
                page={props.page}
                onPageChange={props.setPage}
                items={props.items}
                onItemSelected={props.onItemSelected} />
            </div>
        </Container>
    );
}