"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {
  // useFormStatus hook is used to get the pending status of the form
  // It should be used NOT inside the component, which renders the form itself,
  // but in the any CHILD component of the form (inside the <form> tag)
  // In this case, it is the SubmitButton component
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
