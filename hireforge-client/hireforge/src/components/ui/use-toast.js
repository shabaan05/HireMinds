import { useState } from "react";

let listeners = [];

export function useToast() {
  const [, setState] = useState({});

  const toast = ({ title, description }) => {
    listeners.forEach((listener) =>
      listener({ title, description })
    );
  };

  return { toast };
}

export function subscribe(listener) {
  listeners.push(listener);
}