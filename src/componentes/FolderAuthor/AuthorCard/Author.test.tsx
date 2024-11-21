import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Author } from './Author';
import { vi } from 'vitest';
import { AuthorJSON } from '../../../domain/AuthorJSON';
import { act } from 'react';

const author = new AuthorJSON(); 
    author.id = 1;
    author.name = 'John';
    author.lastName = 'Doe';
    author.nationality = 'PORTUGUES';
    author.creator = false;

    const mockAuthors = [author];

    const onDelete = vi.fn();
    const onSelect = vi.fn();
    const onDetail = vi.fn();

describe('Author Component render', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })
    it('card renders correctly', async () => {
        render(<Author renderAuthor={mockAuthors} onDelete={onDelete} onSelect={onSelect} onDetail={onDetail} />);
        const card = await screen.findByTestId('card');
        expect(card).toBeInTheDocument();
    });

    it('renders author details correctly', async () => {
        render(<Author renderAuthor={mockAuthors} onDelete={onDelete} onSelect={onSelect} onDetail={onDetail} />);
        const authorName = await screen.findByTestId('authorName'); 
        expect(authorName.textContent).toBe("John Doe");
    });

});

describe('buttons capture the info', () => {

    afterEach(() => {
        vi.clearAllMocks()
    })
    
    it('calls the correct onDelete function with the correct ID when delete button is clicked', async () => {
        render(<Author renderAuthor={mockAuthors} onDelete={onDelete} onSelect={onSelect} onDetail={onDetail} />);
        const deleteButton = await screen.findByTestId('deleteAuthor');
        act(() => {
            fireEvent.click(deleteButton);
        });
        expect(onDelete).toHaveBeenCalledWith(1);  // Verifies the correct ID is passed
    });
    
    it('calls onSelect with correct ID when edit button is clicked', () => {
        render(<Author renderAuthor={mockAuthors} onDelete={onDelete} onSelect={onSelect} onDetail={onDetail} />);
        const editButton = screen.queryByTestId('editAuthor');
        act(() => {
            if (editButton) {
                fireEvent.click(editButton);
            }
        });
        expect(onSelect).toHaveBeenCalledWith(1);  // Verifies the correct ID is passed
    });
    
    it('calls onDelete with correct ID when delete button is clicked', () => {
        render(<Author renderAuthor={mockAuthors} onDelete={onDelete} onSelect={onSelect} onDetail={onDetail} />);
        
        const deleteButton = screen.queryByTestId('deleteAuthor');
        // Simulates click on delete button and verifies onDelete is called with the correct ID
        act(() => {
            if (deleteButton) {
                fireEvent.click(deleteButton);
            }
        });
        expect(deleteButton).toBeInTheDocument(); 
        expect(onDelete).toHaveBeenCalledWith(1);  // Verifies the correct ID is passed
    });

    it('does not render delete button for creator authors', () => {
        const authors = mockAuthors;
        authors[0].creator = true;
        
        render(<Author renderAuthor={authors} onDelete={onDelete} onSelect={onSelect} onDetail={onDetail} />);
        
        // Verifies the delete button is not rendered
        expect(screen.queryByTestId('deleteAuthor')).not.toBeInTheDocument();
    });

});