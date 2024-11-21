import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";
import { paths } from "../../../domain/routes";

export const Author = ({renderAuthor,onDelete }: 
    {renderAuthor: AuthorJSON; onDelete: (id: number) => void }) => {
    
    const navigate = useNavigate();
    
    const editAuthor = (id: number) => {
        navigate(`${paths.author.edit.path}/${id}`); 
    };

    const deleteAuthor = (id: number) => {
        onDelete(id);
    };

    const showAuthor = (id: number) => {
        navigate(`${paths.author.show.path}/${id}`);
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

                <Card
                    key={renderAuthor.id} variant="outlined"   data-testid="card" sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 1,
                        width: 250,
                        height: 100,
                        borderRadius: 2,
                        borderColor: '#212121',
                        backgroundColor: "#ff8a80",
                      
                    }}>

                    <CardContent onClick={() => showAuthor(renderAuthor.id)} data-testid="cardContent" sx={{
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
                            {renderAuthor.name} {renderAuthor.lastName}
                        </Typography>

                        <Typography
                            variant="h6"
                            color="text.primary"
                            data-testid="authorNationality"
                            sx={{ fontStyle: 'oblique' }}
                        >
                            {renderAuthor.nationality}
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
                            onClick={() => showAuthor(renderAuthor.id)}
                            color="default"
                            data-testid="showAuthor"
                            sx={{ height: "33%", padding: 0 }}
                        >
                            <MoreVertIcon sx={{ width: "100%", height: "100%" }} />
                        </IconButton>

                        <IconButton
                            onClick={() => editAuthor(renderAuthor.id)}
                            color="success"
                            data-testid="editAuthor"
                            sx={{
                                height: "33%",
                                padding: 0,
                            }}
                        >
                            <EditIcon sx={{ width: "100%", height: "100%" }} />
                        </IconButton>
                        
                        {!renderAuthor.creator && (
                            <IconButton
                                sx={{ height: "33%", padding: 0 }}
                                onClick={() => deleteAuthor(renderAuthor.id)}
                                color="error"
                                data-testid="deleteAuthor"
                            >
                                <DeleteIcon sx={{ width: "100%", height: "100%" }} />
                            </IconButton>
                        )}
                        
                     
                    </Box>
                </Card>
        </Box>
    );
};

export default Author;
