import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import type { FakeUser } from '@/types/api';

interface ProfileTabProps {
  user: FakeUser | null;
}

export function ProfileTab({ user }: ProfileTabProps) {
  const firstName = user?.name?.firstname || '';
  const lastName = user?.name?.lastname || '';

  return (
    <div>
      <h2 className="text-xl font-medium mb-6 font-display">Personal Information</h2>
      <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center text-primary-foreground text-xl mb-6 font-display uppercase">
        {firstName?.[0] || 'G'}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
        <FormInput label="First Name" value={firstName} onChange={() => {}} />
        <FormInput label="Last Name" value={lastName} onChange={() => {}} />
        <FormInput
          label="Email"
          type="email"
          value={user?.email || ''}
          onChange={() => {}}
          className="md:col-span-2"
        />
        <FormInput label="Phone" type="tel" value="+44 7700 900000" onChange={() => {}} />
        <FormInput label="Date of Birth" value="15 / 06 / 1990" onChange={() => {}} />
      </div>
      <Button variant="primary" size="md" className="mt-6">
        Save Changes
      </Button>

      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4 font-display">Saved Addresses</h3>
        <div className="border border-border p-5 max-w-sm relative">
          <div className="absolute top-3 right-3">
            <span className="text-xs bg-foreground text-primary-foreground px-2 py-0.5 font-mono-brand">
              Default
            </span>
          </div>
          <p className="font-medium text-sm mb-1 uppercase">{firstName} {lastName || 'Guest'}</p>
          <p className="text-sm text-muted-foreground">{user?.address?.street || '42 Portobello Road'} {user?.address?.number || ''}</p>
          <p className="text-sm text-muted-foreground">{user?.address?.city || 'London'}, {user?.address?.zipcode || 'W11 2DQ'}</p>
          <p className="text-sm text-muted-foreground">United Kingdom</p>
          <div className="flex gap-4 mt-4">
            <button className="text-xs text-muted-foreground hover:text-foreground underline font-mono-brand">
              Edit
            </button>
            <button className="text-xs text-muted-foreground hover:text-destructive underline font-mono-brand">
              Remove
            </button>
          </div>
        </div>
        <button className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 font-mono-brand">
          <Plus className="w-3 h-3" /> Add New Address
        </button>
      </div>
    </div>
  );
}
