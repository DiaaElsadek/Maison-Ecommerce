import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/app/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { authApi } from '@/lib/api/auth';
import { toast } from 'sonner';

export function AuthPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [form, setForm] = useState({ username: '', password: '', firstName: '', lastName: '' });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(form.username, form.password),
    onSuccess: async (data) => {
      // FakeStoreAPI login only returns a token. We need to fetch users to find the matching user profile, 
      // or we can mock the user payload for now if we can't reliably find them. Let's just create a FakeUser object
      // since FakeStoreAPI doesn't have an /auth/me endpoint.
      const mockUser = {
        id: 1,
        email: `${form.username}@example.com`,
        username: form.username,
        name: { firstname: form.firstName || 'Guest', lastname: form.lastName || '' },
        address: { city: '', street: '', number: 0, zipcode: '', geolocation: { lat: '0', long: '0' } },
        phone: ''
      };
      
      signIn(mockUser, data.token);
      toast.success('Successfully signed in!');
      navigate('/account');
    },
    onError: () => {
      // Axios interceptor will handle the toast error message
    },
  });

  const signupMutation = useMutation({
    mutationFn: () => authApi.signup({
      email: `${form.username}@example.com`,
      username: form.username,
      password: form.password,
      name: {
        firstname: form.firstName,
        lastname: form.lastName
      },
      address: {
        city: 'kilcoole',
        street: 'new road',
        number: 7682,
        zipcode: '12926-3874',
        geolocation: {
          lat: '-37.3159',
          long: '81.1496'
        }
      },
      phone: '1-570-236-7033'
    }),
    onSuccess: (data) => {
      // FakeStoreAPI /users POST returns the created user object but no token.
      // We'll automatically sign them in using a mock token so the flow works.
      signIn(data, 'mock_signup_token_123');
      toast.success('Account created successfully!');
      navigate('/account');
    },
    onError: () => {
      // Error handled by interceptor
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.username && form.password) {
      if (mode === 'signup') {
        signupMutation.mutate();
      } else {
        loginMutation.mutate();
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden bg-foreground">
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=1000&fit=crop&auto=format"
          alt="MAISON"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <h2 className="text-4xl text-primary-foreground mb-4 font-display">
            A membership<br />
            <span className="italic">worth having.</span>
          </h2>
          <p className="text-primary-foreground/60 text-sm">
            Priority access to new collections, exclusive events, and a dedicated advisor.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-10">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="text-foreground"
            >
              <path
                d="M1 18V2L10 11L19 2V18"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-sm tracking-[0.3em] uppercase font-display">Maison</span>
          </div>
          <div className="flex gap-6 mb-8">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={cn(
                  'label-mono pb-2 border-b-2 transition-colors',
                  mode === m
                    ? 'border-foreground text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                )}
              >
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) => update('firstName', e.target.value)}
                  required
                />
                <FormInput
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) => update('lastName', e.target.value)}
                  required
                />
              </div>
            )}
            <FormInput
              label={mode === 'signin' ? 'Username' : 'Username (or Email)'}
              type="text"
              value={form.username}
              onChange={(e) => update('username', e.target.value)}
              required
              placeholder={mode === 'signin' ? 'e.g. mor_2314' : ''}
            />
            <FormInput
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
              placeholder={mode === 'signup' ? 'Minimum 8 characters' : ''}
            />
            {mode === 'signin' && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-foreground underline font-mono-brand"
                >
                  Forgot password?
                </button>
              </div>
            )}
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full"
              disabled={loginMutation.isPending || signupMutation.isPending}
            >
              {(loginMutation.isPending || signupMutation.isPending) ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-mono-brand">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="space-y-3">
            {['Continue with Google', 'Continue with Apple'].map((opt) => (
              <button
                key={opt}
                className="w-full border border-border py-3 text-sm font-medium hover:border-foreground hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
