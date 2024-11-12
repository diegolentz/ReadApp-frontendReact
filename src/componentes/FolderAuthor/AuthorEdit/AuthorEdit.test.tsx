import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importa jest-dom para los matchers adicionales
import { MemoryRouter } from 'react-router-dom';
import AuthorEdit from './AuthorEdit'; // Asegúrate de importar tu componente correctamente

  test('should render Name TextField', () => {
    // arrange

    render(
      <MemoryRouter>
        <AuthorEdit editable={true} />
      </MemoryRouter>
    );

    // act
    const nameTextField = screen.getByTestId('name-input');

    // assert
    expect(nameTextField).toBeInTheDocument();
  });
