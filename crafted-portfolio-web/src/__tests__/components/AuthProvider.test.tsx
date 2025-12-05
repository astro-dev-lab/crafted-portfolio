import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProvider, { useAuth } from '@/app/components/AuthProvider';

// Test component that uses the auth context
function TestComponent() {
  const { user, signIn, signOut } = useAuth();

  return (
    <div>
      <div data-testid='user-status'>
        {user ? `Logged in as ${user.email} (${user.role})` : 'Not logged in'}
      </div>
      <button onClick={() => signIn('test@example.com', 'admin')}>Sign In</button>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

describe('AuthProvider', () => {
  it('provides initial auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
  });

  it('allows user to sign in', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(screen.getByText('Sign In'));

    expect(screen.getByTestId('user-status')).toHaveTextContent(
      'Logged in as test@example.com (admin)'
    );
  });

  it('allows user to sign out', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Sign in first
    await userEvent.click(screen.getByText('Sign In'));
    expect(screen.getByTestId('user-status')).toHaveTextContent('Logged in');

    // Then sign out
    await userEvent.click(screen.getByText('Sign Out'));
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
  });

  it('throws error when useAuth is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within AuthProvider');

    consoleSpy.mockRestore();
  });
});
