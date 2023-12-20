import { TextField } from "@mui/material";


export default function SearchView(props: {
    searchQuery: string, 
    onSearchChange: (query: string) => void, 
    onSearch: () => void,
    }) {

    return <div style={{display: "flex", alignItems: "center", width: "100%", justifyContent: "center", marginTop: 20}}>
        <TextField
            label="Search"
            id="outlined-size-medium"
            defaultValue=""
            size="medium"
            variant="filled"
            sx={{
                input: {
                color: 'black',
                background: 'white',
                },
                width: "50%",
            }}
            onChange={(e) => {
                props.onSearchChange(e.target.value);
            }}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                props.onSearch();
                }
            }}
        />
    </div>
}