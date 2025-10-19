"use client";

import { GoogleAnalytics as GA } from "nextjs-google-analytics";

interface GoogleAnalyticsProps {
  trackPageViews?: boolean;
  gaMeasurementId: string;
}

export default function GoogleAnalytics({
  trackPageViews,
  gaMeasurementId,
}: GoogleAnalyticsProps) {
  return (
    <GA trackPageViews={trackPageViews} gaMeasurementId={gaMeasurementId} />
  );
}
