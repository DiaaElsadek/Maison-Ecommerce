import React from 'react';
import { Button } from '@/app/components/ui/button';
import { FormInput } from '@/components/ui/form-input';

export function SettingsTab() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-medium mb-6 font-display">Account Settings</h2>
        <div className="max-w-md space-y-4">
          <FormInput label="Current Password" type="password" value="" onChange={() => {}} />
          <FormInput label="New Password" type="password" value="" onChange={() => {}} />
          <FormInput label="Confirm New Password" type="password" value="" onChange={() => {}} />
          <Button variant="primary" size="md">
            Update Password
          </Button>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-4 font-display">Preferences</h3>
        <div className="space-y-3 max-w-md">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-sm">Currency</span>
            <select className="text-sm bg-transparent border border-border px-2 py-1 focus:outline-none font-mono-brand cursor-pointer">
              <option>GBP (£)</option>
              <option>EUR (€)</option>
              <option>USD ($)</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <span className="text-sm">Language</span>
            <select className="text-sm bg-transparent border border-border px-2 py-1 focus:outline-none font-mono-brand cursor-pointer">
              <option>English (UK)</option>
              <option>French</option>
              <option>Italian</option>
            </select>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-8">
        <h3 className="text-destructive font-medium mb-3">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}
