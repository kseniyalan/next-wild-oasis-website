import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  // It is a server component so we cant use onClick event on button
  // Instead we use form action to call the signOutAction
  return (
    <form action={signOutAction}>
      <button className='py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full'>
        <ArrowLeftStartOnRectangleIcon className='h-5 w-5 text-primary-600' />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
