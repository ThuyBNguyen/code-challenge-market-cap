import { getStorageUser } from 'providers/AuthProvider/slice';

declare global {
  interface Window {
    dataLayer: any;
    gtag: any;
  }
}
// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const logPageView = (url: string): void => {
  const user = getStorageUser();
  if (user) {
    window.gtag('set', { user_id: user._id, user_role: user.role });
  } else {
    window.gtag('set', { user_id: '', user_role: '' });
  }
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
  window.gtag('config', process.env.GOOGLE_TAG_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const logEvent = (
  action: string,
  params = {},
  category?: string,
  label?: string,
  value?: number,
): void => {
  const user = getStorageUser();
  if (user) {
    window.gtag('set', { user_id: user._id, user_role: user.role });
  } else {
    window.gtag('set', { user_id: '', user_role: '' });
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...params,
  });
};
