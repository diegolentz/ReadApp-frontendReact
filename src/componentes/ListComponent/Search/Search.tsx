import { Box, Button, OutlinedInput } from "@mui/material"
import ManageSearchSharpIcon from '@mui/icons-material/ManageSearchSharp';
import { useEffect, useState } from "react";
import { bookService } from "../../../service/bookService";
import { AuthorJSON } from "../../../domain/AuthorJSON";
import { Book } from "../../../domain/BookJSON";
import { authorService } from "../../../service/authorService";

export const Search = ({Book, filter}:{Book : boolean | null, filter :(items: AuthorJSON[] | Book[]) => void}) => {
    const [isBook, setIsBook] = useState<boolean | null>(Book);
    const [text, setText] = useState<string>("");
    const [authors, setAuthors] = useState<AuthorJSON[]>([]);
    const [books, setBooks] = useState<Book[]>([]);

    const textSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value;
        const textLower = text.toLowerCase().replace(/\s+/g, '');
        setText(textLower);
    }

    const searchObject = async () => {
        if(isBook){
            const filterbooks = await bookService.findBook(text);
            setBooks(filterbooks);
            filter(books);
            // console.log(books);
        }else{
            const filterauthors = await authorService.findAuthor(text);
            setAuthors(filterauthors);
            filter(authors);
            // console.log(authors);
        }
    }

    useEffect(() => {
        setIsBook(Book);
    }, [Book]);

    return (
        <Box width="100vw" height="5rem" display="flex" flexDirection="row">
            <OutlinedInput 
                placeholder="Search"
                onChange={textSearch}
                sx={{ 
                    width: "85%", 
                    height: "100%",
                    border: "1px solid grey",
                    borderRadius: "0px", 
                    backgroundColor: "white",
                }}
                slotProps={{ input: { style: { fontSize: '1.8rem' } } }}
            />
            <Button onClick = {searchObject} 
            sx={{
                width: "15%", 
                height: "100%",
                border: "1px solid grey", 
                borderRadius: "0px",
            }}>
                <ManageSearchSharpIcon sx={{ color: "black", width: "100%", height: "100%", backgroundColor: "secondary" }} />
            </Button>
        </Box>
    )
}