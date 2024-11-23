import { render, screen, fireEvent } from '@testing-library/react'; 
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
});
