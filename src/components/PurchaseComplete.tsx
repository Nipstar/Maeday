'use client';

import { useEffect } from 'react';
import { getPlan, site } from '@/site.config';
import { readUtm, track } from '@/lib/analytics';

/** Fires purchase_complete once per session when the Starter order form redirects here. */
export function PurchaseComplete() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem('maeday_purchase_tracked')) return;
      sessionStorage.setItem('maeday_purchase_tracked', '1');
    } catch {
      /* storage blocked: still track once per page view */
    }
    track({ event: 'purchase_complete', plan: 'starter', value: getPlan('starter').price, currency: site.currency, ...readUtm() });
  }, []);
  return null;
}
