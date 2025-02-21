'use client';

import { useActionState, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { login } from "@/actions/auth";
import Spinner from "@/components/spinner";
import Modal from "@/components/modal";
import EnterIcon from '@public/images/enter.svg';
import SignInAltIcon from '@public/images/sign-in-alt.svg';

export default function SignInButton() {
  const [show, setShow] = useState(false);
  const [state, action, pending] = useActionState(login, undefined);
  const pathname = usePathname();

  const showForm = () => {
    setShow(true);
  };

  const closeForm = () => {
    if (state?.message) { state.message = ''; }
    setShow(false);
  };

  const signInForm = () => {
    return (
      <Modal title="Sign in" onClose={closeForm} show={show}>
        <span className="flex text-sm text-gray-500 dark:text-gray-400 text-center justify-center w-full">
          Enter your Advent of Code session<br />
          to use the input provided to your account.
        </span>
        <form action={action} className="flex gap-2 pt-6 pb-12 items-center justify-center h-6 text-md sm:text-lg">
          <input id="session" name="session" type="text" placeholder="Advent of Code session" autoFocus
            className="caret-black dark:caret-white w-80 dark:bg-black text-center border border-gray-300 rounded-md"
            disabled={pending}
          />
          <input type="hidden" name="redirectTo" value={pathname} />

          <button disabled={pending}>
            {(pending
              ? <Spinner width={32} height={32} />
              : <Image
                  aria-hidden
                  src={SignInAltIcon}
                  alt="Button icon"
                  width={32}
                  height={32}
                  className="hover:scale-125 dark:invert"
                />
            )}
          </button>
        </form>
        {state?.message && <span className="flex place-self-center text-red-500 text-sm -mt-12 h-8">{state.message}</span>}
      </Modal>
    );
  }

  return (
    <>
      <button
        className="group flex gap-2 items-center"
        onClick={() => showForm()}
      >
        <Image
          aria-hidden
          src={EnterIcon}
          alt="Sign in icon"
          width={16}
          height={16}
          className="group-hover:scale-125 dark:invert rotate-180"
        />
        Sign in
      </button>
      {signInForm()}
    </>
  );
};