export interface ToastLabels {
  /** Accessible label for the dismiss button on individual toasts. */
  dismiss: string;
}

export const DEFAULT_TOAST_LABELS: ToastLabels = {
  dismiss: 'Dismiss notification',
};

export interface ToastProviderLabels {
  /** Accessible label for the toast container region. */
  notifications: string;
}

export const DEFAULT_PROVIDER_LABELS: ToastProviderLabels = {
  notifications: 'Notifications',
};
