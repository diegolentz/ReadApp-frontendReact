import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Height } from "@mui/icons-material";

export const Author = ({
    renderAuthor,
    onDelete,
    onSelect,
    onDetail,
}: {
    renderAuthor: AuthorJSON[];
    onDelete: (id: number) => void;
    onSelect: (id: number) => void;
    onDetail: (id: number) => void;
}) => {

    const editAuthor = (id: number) => {
        onSelect(id);
    };

    const deleteAuthor = (id: number) => {
        onDelete(id);
    };

    const showAuthor = (id: number) => {
        onDetail(id);
    };

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            gap={1.5} 
            width="100%" 
            height= "100%"
        >
            {renderAuthor.map((author) => (

                <Card 
                key={author.id} variant="outlined" sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        padding: 1, 
                        width: 250, 
                        height: 100,
                        borderRadius: 2,
                        borderColor: '#d50000',
                        backgroundColor: "#e57373",
                    }}>

                    <CardContent onClick={() => showAuthor(author.id)} sx={{ 
                            flexGrow: 1, 
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            gap: 2,

                        }}>
                        <Typography 
                            variant="h5" 
                            color="text.primary"
                        >
                            {author.name} {author.lastName}
                        </Typography>

                        <Typography 
                            variant="h6"
                            color="text.secondary"
                        >
                            {author.nationality}
                        </Typography>

                    </CardContent>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        alignItems="center"  
                        justifyContent="space-between"
                        width="10%"
                        height="100%"
                        gap={0.5}

                        >
                        
                        <IconButton 
                            onClick={() => editAuthor(author.id)} 
                            color="success"
                             
                            sx={{height: "33%",
                                padding: 0,
                            }}
                            >
                            <EditIcon sx={
                                { height: "auto" }
                            }/>
                        </IconButton>


                        {!author.creator && (
                            <IconButton 
                            sx={{ height: "33%" }}
                                onClick={() => deleteAuthor(author.id)} 
                                color="error" 
                                size="small">

                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        )}
                        <IconButton 
                            onClick={() => showAuthor(author.id)} 
                            sx={{ height: "33%" }}
                            color="primary" 
                            >

                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default Author;
