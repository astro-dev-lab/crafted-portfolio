import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthProvider from '@/app/components/AuthProvider';
import SaaSPage from '@/app/personas/saas/page';
import EcommercePage from '@/app/personas/ecommerce/page';

// Test wrapper with auth provider
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('Persona Flow Integration Tests', () => {
  describe('SaaS Admin Console Flow', () => {
    it('allows admin to manage customers', async () => {
      render(
        <TestWrapper>
          <SaaSPage />
        </TestWrapper>
      );

      // Initially should show sign-in form
      expect(screen.getByPlaceholderText('email')).toBeInTheDocument();

      // Sign in as admin
      await userEvent.type(screen.getByPlaceholderText('email'), 'admin@example.com');
      await userEvent.click(screen.getByText('Sign In (mock)'));

      await waitFor(() => {
        expect(screen.getByText(/Signed in as/)).toBeInTheDocument();
      });

      // Should be able to add a customer
      const nameInput = screen.getAllByPlaceholderText('Name')[0];
      const emailInput = screen.getAllByPlaceholderText('Email')[0];

      await userEvent.type(nameInput, 'Test Company');
      await userEvent.type(emailInput, 'test@company.com');
      await userEvent.click(screen.getByText('Add'));

      // Should show "Test Company" somewhere in the customer list
      expect(screen.getByText(/Test Company/)).toBeInTheDocument();
    });

    it('restricts customer management for non-admin users', async () => {
      render(
        <TestWrapper>
          <SaaSPage />
        </TestWrapper>
      );

      // Don't sign in - should see restriction message
      expect(screen.getByText('Sign in as admin/support to edit.')).toBeInTheDocument();
    });
  });

  describe('E-commerce Flow', () => {
    it('allows users to manage cart and wishlist', async () => {
      render(
        <TestWrapper>
          <EcommercePage />
        </TestWrapper>
      );

      // Should show products
      expect(screen.getByText(/Widget A/)).toBeInTheDocument();

      // Add to cart
      const addToCartButtons = screen.getAllByText('Add to cart');
      await userEvent.click(addToCartButtons[0]);

      // Check cart count updated
      await waitFor(() => {
        expect(screen.getByText(/Cart: 1 items/)).toBeInTheDocument();
      });

      // Add to wishlist
      const wishlistButtons = screen.getAllByText('Wishlist');
      await userEvent.click(wishlistButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/Wishlist: 1/)).toBeInTheDocument();
      });
    });

    it('filters products correctly', async () => {
      render(
        <TestWrapper>
          <EcommercePage />
        </TestWrapper>
      );

      // Filter by category
      const categorySelect = screen.getByDisplayValue('All');
      await userEvent.selectOptions(categorySelect, 'Gadgets');

      // Should show filtered results (Widget A and Widget C are Gadgets)
      expect(screen.getByText(/Widget A/)).toBeInTheDocument();

      // Reset to show all products
      await userEvent.selectOptions(categorySelect, 'All');

      // Search for specific product
      const searchInput = screen.getByPlaceholderText('Search products');
      await userEvent.type(searchInput, 'Widget B');

      expect(screen.getByText(/Widget B/)).toBeInTheDocument();
    });
  });
});
