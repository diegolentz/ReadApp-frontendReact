import { IconButton } from '@mui/material';
import { Book } from '../../domain/BookJSON';
import './Book.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../domain/routes';
import DeleteIcon from '@mui/icons-material/Delete';

export const BookComponent = ({
    book,
    onDelete
    // onEdition,
    // onDetail,
}: {
    book: Book;
    onDelete: (id: number) => void;
    // onEdition: (id: number) => void;
    // onDetail: (id: number) => void;
}) => {

    const navigate = useNavigate();

    const editBook = (id: number) => {
        navigate(`${paths.books.edit.path}/${id}`)
    };

    const deleteBook = (id: number) => {
        onDelete(id);
    };

    const displayBook = (id: number) => {
        navigate(`${paths.books.display.path}/${id}`)
    };

    return (

        <article key={book.id} className="libro">
            {/* /* <img class="libro__portada" [src]="book.imagen" alt="FOTO"> */}
            <div className="encabezado">
                <img className="libro__portada"></img>
                <div>
                    {/* aca van los tres SVG */}
                </div>
            </div>
            <IconButton
                onClick={() => editBook(book.id)}
                color="success"
                sx={{
                    height: "33%",
                    padding: 0,
                }}
            >
                <EditIcon sx={{ width: "100%", height: "100%" }} />
            </IconButton>
            <IconButton
                                sx={{ height: "33%", padding: 0 }}
                                onClick={() => deleteBook(book.id)}
                                color="error"
                                data-testid="deleteAuthor"
                            >
                                <DeleteIcon sx={{ width: "100%", height: "100%" }} />
                            </IconButton>
            <IconButton
                onClick={() => displayBook(book.id)}
                color="default"
                sx={{ height: "33%", padding: 0 }}
            >
                <MoreVertIcon sx={{ width: "100%", height: "100%" }} />
            </IconButton>
            <div className="libro__contenido ">
                <h4>{book.title}</h4>
                <p>Por <strong>{book.author}</strong></p>
                <div className="libro__info">
                    <div className="dato ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                            <path
                                d="M232,72H160a40,40,0,0,0-32,16A40,40,0,0,0,96,72H24a8,8,0,0,0-8,8V200a8,8,0,0,0,8,8H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h72a8,8,0,0,0,8-8V80A8,8,0,0,0,232,72ZM96,192H32V88H96a24,24,0,0,1,24,24v88A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V112a24,24,0,0,1,24-24h64ZM89.6,43.19a48,48,0,0,1,76.8,0,8,8,0,0,1-12.79,9.62,32,32,0,0,0-51.22,0A8,8,0,1,1,89.6,43.19Z">
                            </path>
                        </svg>
                        <p>{book.numberOfPages}</p> <p> Paginas</p>
                    </div>
                    <div className="dato">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                            <path
                                d="M87.24,52.59a8,8,0,0,0-14.48,0l-64,136a8,8,0,1,0,14.48,6.81L39.9,160h80.2l16.66,35.4a8,8,0,1,0,14.48-6.81ZM47.43,144,80,74.79,112.57,144ZM200,96c-12.76,0-22.73,3.47-29.63,10.32a8,8,0,0,0,11.26,11.36c3.8-3.77,10-5.68,18.37-5.68,13.23,0,24,9,24,20v3.22A42.76,42.76,0,0,0,200,128c-22.06,0-40,16.15-40,36s17.94,36,40,36a42.73,42.73,0,0,0,24-7.25,8,8,0,0,0,16-.75V132C240,112.15,222.06,96,200,96Zm0,88c-13.23,0-24-9-24-20s10.77-20,24-20,24,9,24,20S213.23,184,200,184Z">
                            </path>
                        </svg>
                        <p>{book.numberOfWords}</p> <p>Palabras</p>
                    </div>
                    <div className="dato">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256">
                            <path
                                d="M247.15,212.42l-56-112a8,8,0,0,0-14.31,0l-21.71,43.43A88,88,0,0,1,108,126.93,103.65,103.65,0,0,0,135.69,64H160a8,8,0,0,0,0-16H104V32a8,8,0,0,0-16,0V48H32a8,8,0,0,0,0,16h87.63A87.76,87.76,0,0,1,96,116.35a87.74,87.74,0,0,1-19-31,8,8,0,1,0-15.08,5.34A103.63,103.63,0,0,0,84,127a87.55,87.55,0,0,1-52,17,8,8,0,0,0,0,16,103.46,103.46,0,0,0,64-22.08,104.18,104.18,0,0,0,51.44,21.31l-26.6,53.19a8,8,0,0,0,14.31,7.16L148.94,192h70.11l13.79,27.58A8,8,0,0,0,240,224a8,8,0,0,0,7.15-11.58ZM156.94,176,184,121.89,211.05,176Z">
                            </path>
                        </svg>
                        <p> {book.translations}</p>
                    </div>
                </div>
            </div>
            <div>
                {/* {book.bestSeller && 
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5321d0" viewBox="0 0 256 256">
                    <path
                        d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z" />
                </svg>
                </div>} */}

                <BestSellerIcon isBestSeller={book.bestSeller}></BestSellerIcon>
                <ChallengeIcon isChallenging={book.challenging}></ChallengeIcon>
            </div>
        </article>
    )

}

function ChallengeIcon({ isChallenging }: { isChallenging: boolean }) {

    if (isChallenging) return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="yellow" viewBox="0 0 256 256">
                <path
                    d="M183.89,153.34a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68ZM216,144a88,88,0,0,1-176,0c0-27.92,11-56.47,32.66-84.85a8,8,0,0,1,11.93-.89l24.12,23.41,22-60.41a8,8,0,0,1,12.63-3.41C165.21,36,216,84.55,216,144Zm-16,0c0-46.09-35.79-85.92-58.21-106.33L119.52,98.74a8,8,0,0,1-13.09,3L80.06,76.16C64.09,99.21,56,122,56,144a72,72,0,0,0,144,0Z" />
            </svg>
        </div>
    )
}

function BestSellerIcon({ isBestSeller }: { isBestSeller: boolean }) {

    if (isBestSeller) return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#5321d0" viewBox="0 0 256 256">
                <path
                    d="M128,136a8,8,0,0,1-8,8H72a8,8,0,0,1,0-16h48A8,8,0,0,1,128,136Zm-8-40H72a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm112,65.47V224A8,8,0,0,1,220,231l-24-13.74L172,231A8,8,0,0,1,160,224V200H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216a16,16,0,0,1,16,16V86.53a51.88,51.88,0,0,1,0,74.94ZM160,184V161.47A52,52,0,0,1,216,76V56H40V184Zm56-12a51.88,51.88,0,0,1-40,0v38.22l16-9.16a8,8,0,0,1,7.94,0l16,9.16Zm16-48a36,36,0,1,0-36,36A36,36,0,0,0,232,124Z" />
            </svg>
        </div>
    )
}


export { Book };

