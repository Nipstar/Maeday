import type { Metadata } from 'next';
import { site } from '@/site.config';
import { pageMeta } from '@/lib/seo';
import { routes } from '@/lib/routes';
import { LegalPage } from '@/components/LegalPage';

/** Noindex until Andy supplies reviewed legal text to replace the [[TERMS_*]] placeholders. */
export const metadata: Metadata = pageMeta({
  title: 'Terms of service | MaeDay',
  description: 'Terms of service for MaeDay, a service of Antek Automation.',
  path: routes.terms,
  noindex: true,
});

export default function Page() {
  return (
    <LegalPage title="Terms of service">
      <p className="mt-6">
        {site.name} is a service of {site.owner}. Contact: {site.email}.
      </p>
      <h2>Summary</h2>
      <p>[[TERMS_SUMMARY]]</p>
      <h2>Full text</h2>
      <p>[[TERMS_TEXT]]</p>
    </LegalPage>
  );
}
