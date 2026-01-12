import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import { vi } from 'vitest'; // or jest

// 1. Mock the navigate function
const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

const renderLogin = () => render(
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);

describe('Login Component', () => {
  test('Positive: Login button exists and captures input', () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText(/Email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: 'test@lendsqr.com' } });
    expect(emailInput.value).toBe('test@lendsqr.com');
  });

  test('Negative: Shows error when fields are empty', () => {
    renderLogin();
    const loginButton = screen.getByText(/LOG IN/i);
    fireEvent.click(loginButton);
    
    // This will now pass because of the setError logic we added
    expect(screen.getByText(/Please enter your email/i)).toBeInTheDocument();
  });

  test('Navigation: Redirects to dashboard on valid submit', () => {
    renderLogin();
    
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i); // Find password input
    const loginButton = screen.getByText(/LOG IN/i);

    // Fill BOTH fields to satisfy the validation logic
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } }); 

    fireEvent.click(loginButton);

    // Now the mock should be called because validation passed
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/dashboard');
  });
});