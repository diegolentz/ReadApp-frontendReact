import { render, screen, fireEvent, waitFor } from '@testing-library/react'; 
import { FormsComponent } from './FormsComponent';
import { vi } from 'vitest';  // Importa `vi` para los mocks en Vitest
import '@testing-library/jest-dom';  // Importa esto para usar las aserciones extendidas

describe('FormsComponent', () => {
  const mockLogin = vi.fn();  // Usamos `vi.fn()` en lugar de `jest.fn()`
  const mockCreate = vi.fn();
  const mockChangePage = vi.fn();

  it('should render login view by default', () => {
    render(<FormsComponent 
      isLoginPage={true} 
      login={mockLogin} 
      changePage={mockChangePage} 
      create={mockCreate} 
    />);

    // Verificar que estamos en la vista de login
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/New account/i)).toBeInTheDocument();
  });

  it('should render signup view when changed', () => {
    render(<FormsComponent 
      isLoginPage={false} 
      login={mockLogin} 
      changePage={mockChangePage} 
      create={mockCreate} 
    />);

    // Verificar que estamos en la vista de registro
    expect(screen.getByText(/Create Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to Login/i)).toBeInTheDocument();
  });

  it('should show error messages for required fields when the form is submitted empty', async () => {
    render(
      <FormsComponent
        isLoginPage={true}
        login={mockLogin}
        changePage={mockChangePage}
        create={mockCreate}
      />
    );
  
    // Buscar el botón de login y hacer clic en él para intentar enviar el formulario
    const loginButton = screen.getByTestId('try-login');
    fireEvent.click(loginButton);
  
    // Esperar que los mensajes de error aparezcan
    await waitFor(() => {
      // Obtener todos los mensajes de error
      const errorMessages = screen.getAllByText(/Field is required/i);
      
      // Verificar que hay exactamente 2 mensajes de error
      expect(errorMessages).toHaveLength(2);
  
      // Verificar que los mensajes de error estén presentes
      expect(errorMessages[0]).toBeInTheDocument();
      expect(errorMessages[1]).toBeInTheDocument();
    });
  
    // Verificar que el mock de login no haya sido llamado
    expect(mockLogin).not.toHaveBeenCalled();
  });
      
  
});
