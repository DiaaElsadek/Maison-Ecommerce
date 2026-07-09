import type { FAQSection } from '@/types';

export const FAQ_ITEMS: FAQSection[] = [
  {
    category: 'Orders & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery within 3\u20135 working days. Express delivery within 1\u20132 working days. International orders typically take 5\u201310 working days depending on destination and customs.',
      },
      {
        q: 'Do you offer free delivery?',
        a: 'Complimentary standard delivery on all UK orders over \u00a3150. International complimentary delivery on orders over \u00a3300. Express delivery is charged at \u00a315.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes. As soon as your order is dispatched, you will receive an email with your tracking number and a direct link to follow your shipment in real time.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    questions: [
      {
        q: 'What is your returns policy?',
        a: 'We accept returns within 30 days of delivery for full-price items. Items must be unworn, with all original tags attached and in original packaging.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'Log in to your account, navigate to your orders, and select \u2018Return\u2019. You will receive a prepaid returns label by email within 24 hours.',
      },
      {
        q: 'Are sale items returnable?',
        a: 'Sale items are final sale and cannot be returned or exchanged unless they arrive damaged or defective, in which case please contact us immediately.',
      },
    ],
  },
  {
    category: 'Product & Care',
    questions: [
      {
        q: 'How do I care for cashmere?',
        a: 'Hand wash in cold water with a specialist cashmere shampoo. Never wring \u2014 gently press water out, then dry flat on a clean towel away from direct heat or sunlight.',
      },
      {
        q: 'Are your products ethically made?',
        a: 'Yes. Every item in our collection is made in family-owned workshops across Italy, France, Scotland, and Portugal. We visit each partner at least twice per year.',
      },
      {
        q: 'Do you offer alterations?',
        a: 'We offer complimentary hemming on all MAISON trousers and skirts. For more complex alterations, we can recommend trusted tailors in major cities.',
      },
    ],
  },
];
