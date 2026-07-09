import React from 'react';
import { useNavigate } from 'react-router';
import { Mail, Phone, Headphones, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { FormInput } from '@/components/ui/form-input';

export function SupportPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <p className="label-mono text-accent mb-3">We are here</p>
        <h1 className="text-5xl text-foreground mb-4 font-display">How can we help?</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Our advisors are available 7 days a week to assist with orders, products, and anything
          else you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: <Mail className="w-6 h-6" />,
            title: 'Email Us',
            desc: 'We respond within 4 hours',
            action: 'hello@maison.com',
          },
          {
            icon: <Phone className="w-6 h-6" />,
            title: 'Call Us',
            desc: 'Mon–Sun, 9am–8pm GMT',
            action: '+44 20 7946 0001',
          },
          {
            icon: <Headphones className="w-6 h-6" />,
            title: 'Live Chat',
            desc: 'Instant response available now',
            action: 'Start Chat',
          },
        ].map((item) => (
          <div
            key={item.title}
            className="border border-border p-8 text-center hover:border-foreground transition-colors group"
          >
            <div className="text-accent mx-auto mb-4 flex justify-center">{item.icon}</div>
            <h3 className="font-medium mb-2 font-display">{item.title}</h3>
            <p className="label-mono text-muted-foreground mb-4">{item.desc}</p>
            <p className="text-sm text-foreground">{item.action}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-2xl text-foreground mb-6 font-display">Send a Message</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormInput label="First Name" value="" onChange={() => {}} />
              <FormInput label="Last Name" value="" onChange={() => {}} />
            </div>
            <FormInput label="Email" type="email" value="" onChange={() => {}} />
            <div>
              <label className="label-mono mb-1.5 block">Subject</label>
              <select className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors cursor-pointer font-mono-brand">
                <option value="">Select a topic</option>
                <option>Order Enquiry</option>
                <option>Return or Exchange</option>
                <option>Product Information</option>
                <option>Delivery Question</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="label-mono mb-1.5 block">Message</label>
              <textarea
                rows={5}
                placeholder="Describe how we can help..."
                className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none font-mono-brand"
              />
            </div>
            <Button variant="primary" size="md">
              Send Message
            </Button>
          </div>
        </div>
        <div>
          <h2 className="text-2xl text-foreground mb-6 font-display">Common Topics</h2>
          <div className="space-y-2">
            {[
              'Track my order',
              'Start a return',
              'Change or cancel an order',
              'Size guide and fit advice',
              'Product care instructions',
              'Gifting and packaging',
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => navigate('/faq')}
                className="w-full flex items-center justify-between py-4 border-b border-border text-sm text-left hover:text-accent transition-colors"
              >
                {topic}
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
