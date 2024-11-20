import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";

export const Author = ({
    renderAuthor,
    onDelete,
   
}: {
    renderAuthor: AuthorJSON[];
    onDelete: (id: number) => void;
   
}) => {
    const navigate = useNavigate();

    const editAuthor = (id: number) => {
        navigate(`/author/edit/${id}`);
    };

    const deleteAuthor = (id: number) => {
        onDelete(id);
    };

    const showAuthor = (id: number) => {
        navigate(`/author/show/${id}`);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1.5}
            width="100%"
            height="100%"
            padding={2} 
        >
            {renderAuthor.map((author) => (

                <Card
                    key={author.id} variant="outlined"   data-testid="card" sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 1,
                        width: 250,
                        height: 100,
                        borderRadius: 2,
                        borderColor: '#212121',
                        backgroundColor: "#ff8a80",
                      
                    }}>

                    <CardContent onClick={() => showAuthor(author.id)} data-testid="cardContent" sx={{
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
                            data-testid="authorName"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {author.name} {author.lastName}
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.primary"
                            data-testid="authorNationality"
                            sx={{ fontStyle: 'oblique' }}
                        >
                            {author.nationality}
                        </Typography>

                    </CardContent>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="space-between"
                        width="20%"
                        height="100%"
                        gap={0.5} 
                    >
                        <IconButton
                            onClick={() => showAuthor(author.id)}
                            color="default"
                            data-testid="showAuthor"
                            sx={{ height: "33%", padding: 0 }}
                        >
                            <MoreVertIcon sx={{ width: "100%", height: "100%" }} />
                        </IconButton>

                        <IconButton
                            onClick={() => editAuthor(author.id)}
                            color="success"
                            data-testid="editAuthor"
                            sx={{
                                height: "33%",
                                padding: 0,
                            }}
                        >
                            <EditIcon sx={{ width: "100%", height: "100%" }} />
                        </IconButton>
                        
                        {!author.creator && (
                            <IconButton
                                sx={{ height: "33%", padding: 0 }}
                                onClick={() => deleteAuthor(author.id)}
                                color="error"
                                data-testid="deleteAuthor"
                            >
                                <DeleteIcon sx={{ width: "100%", height: "100%" }} />
                            </IconButton>
                        )}
                        
                     
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default Author;
