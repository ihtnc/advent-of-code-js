'use client';

import { useActionState, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { login } from "@/actions/auth";
import Spinner from "@/components/spinner";
import Modal from "@/components/modal";
import EnterIcon from '@public/images/enter.svg';
import AngleSmallRightIcon from '@public/images/angle-small-right.svg';

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
      <Modal title="Sign in" onClose={closeForm} show={show} className="gap-6">
        <span className="flex text-sm text-gray-500 dark:text-gray-400 text-center justify-center w-full">
          Enter your Advent of Code session<br />
          to use the input provided to your account.
        </span>
        <form action={action} className="flex flex-col items-center justify-center text-lg gap-6">
          <input id="session" name="session" type="text" placeholder="Advent of Code session" autoFocus
            className="caret-black dark:caret-white w-80 dark:bg-black text-center border border-gray-300 rounded-md"
            disabled={pending}
          />
          {state?.message && <span className="flex place-self-center text-red-500 text-sm h-6 -my-6">{state.message}</span>}
          <input type="hidden" name="redirectTo" value={pathname} />

          <button disabled={pending}
            className="group flex items-center rounded-md border border-black dark:border-white pr-2 pl-4 py-1 hover:pr-3 hover:pl-5 hover:py-2 hover:-my-1 cursor-pointer">
            Enter
            {(pending
              ? <Spinner width={24} height={24} className="m-1" />
              : <Image
                  aria-hidden
                  src={AngleSmallRightIcon}
                  alt="Button icon"
                  width={32}
                  height={32}
                  className="group-hover:scale-125 dark:invert"
                />
            )}
          </button>
        </form>
      </Modal>
    );
  }

  return (
    <>
      <button
        className="group flex gap-2 items-center cursor-pointer"
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