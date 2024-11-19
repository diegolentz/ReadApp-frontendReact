import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jest from 'jest-mock';
import '@testing-library/jest-dom';
import { Formulario } from './Formulario';
import { AuthorJSON } from '../../../domain/AuthorJSON';

describe('Formulario Component', () => {
    const mockOnSelect = jest.fn();

    const autor = new AuthorJSON();
    autor.id = 1;
    autor.name = "John";
    autor.lastName = "Doe";
    autor.nationality = "English";
    const idiomas = ["PORTUGUES", "ESPANIOL", "ALEMAN"];

    let nameInput: HTMLElement;
    let lastNameInput: HTMLElement;
    let languageSelect: HTMLElement;

    beforeEach(() => {
        render(<Formulario autor={autor} idiomas={idiomas} onSelect={mockOnSelect} isEdit={true} />);
        nameInput = screen.getByTestId('name-input');
        lastNameInput = screen.getByTestId('last-name-input');
        languageSelect = screen.getByTestId('language-select-input');
    });

    it('should validate name field and update inputs correctly', () => {
        expect(nameInput).not.toBeDisabled();
        expect(lastNameInput).not.toBeDisabled();
    });

    it('should validate name field and update inputs correctly', () => {

        userEvent.type(nameInput, 'diego');
        userEvent.type(lastNameInput, 'lentz');

        const saveButton = screen.getByTestId('save-button');
        fireEvent.click(saveButton);

        expect(mockOnSelect).toHaveBeenCalledTimes(1);
        expect(mockOnSelect).toHaveBeenCalledWith(expect.any(AuthorJSON));

    });
});
