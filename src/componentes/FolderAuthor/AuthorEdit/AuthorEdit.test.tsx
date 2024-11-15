import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, expect } from 'vitest';
import axios from 'axios';
import { REST_SERVER_URL } from '../../../constants';
import { MemoryRouter } from 'react-router-dom';
import AuthorEdit from './AuthorEdit';
import { AuthorJSON } from '../../../domain/AuthorJSON';
import { act } from 'react';

const author1 = new AuthorJSON();
author1.id = 1;
author1.name = 'John';
author1.lastName = 'Doe';
author1.nationality = 'PORTUGUES';
author1.creator = false;

const mockAuthors = [author1];

describe('renders component correctly', () => {
    beforeEach(() => {
        vi.mock('axios');
        const spyGetAxios = vi.spyOn(axios, 'get');
        spyGetAxios.mockResolvedValueOnce({
            data: mockAuthors,
        });
    });

    it('should render the form with initial data', async () => {
        render(
            <MemoryRouter>
                <AuthorEdit editable={true} />
            </MemoryRouter>
        );
        expect(axios.get).toHaveBeenCalledWith(`${REST_SERVER_URL}/lenguajes`);
    });

    it('should show error when fields are empty and cannot create author', async () => {
        const spyPostAxios = vi.spyOn(axios, 'post');
        spyPostAxios.mockResolvedValueOnce({
            data: true,
        });
    
        render(
            <MemoryRouter>
                <AuthorEdit editable={true} />
            </MemoryRouter>
        );
    
        const saveButton = await screen.findByTestId('save-button');
    
        act(() => {
            fireEvent.click(saveButton);
        });
    
        await waitFor(() => {
            expect(axios.post).not.toHaveBeenCalled();
        });
    
    });

});

