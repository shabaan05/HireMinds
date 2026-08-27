let listeners = [];

export function useToast() {
  const toast = ({ title, description, variant }) => {
    listeners.forEach((listener) =>
      listener({ title, description, variant })
    );
  };

  return { toast };
}

export function subscribe(listener) {
  listeners.push(listener);
  // Return unsubscribe function so Toaster can clean up on unmount
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
