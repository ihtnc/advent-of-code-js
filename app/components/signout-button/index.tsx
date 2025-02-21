'use client';

import { useActionState, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Modal from "@/components/modal";
import Spinner from "@/components/spinner";
import { performSignOut } from "./actions";
import ExitIcon from "@public/images/exit.svg";
import SignInAltIcon from "@public/images/sign-in-alt.svg";

export default function SignOutButton() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const performSignOutParams = performSignOut.bind(null, { redirectTo: pathname });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, action, pending] = useActionState(performSignOutParams, undefined);

  const showForm = () => {
    setShow(true);
  };

  const closeForm = () => {
    setShow(false);
  };

  const signOutForm = () => {
    return (
      <Modal title="Sign out" onClose={closeForm} show={show}>
        <span className="flex text-sm text-gray-500 dark:text-gray-400 text-center justify-center w-full">
          Removing your Advent of Code session<br />
          will use the sample input instead.
        </span>
        <form action={action} className="flex gap-2 pt-6 pb-12 items-center justify-center h-6 text-md sm:text-lg">
          <button disabled={pending} className="group flex gap-2 items-center">
            Proceed
            {(pending
              ? <Spinner width={32} height={32} />
              : <Image
                  aria-hidden
                  src={SignInAltIcon}
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
  };

  return (
    <>
      <button
        className="group flex gap-2 items-center"
        onClick={() => showForm()}>
        <Image
          aria-hidden
          src={ExitIcon}
          alt="Sign out icon"
          width={16}
          height={16}
          className="group-hover:scale-125 dark:invert"
        />
        Sign out
      </button>
      {signOutForm()}
    </>
  );
};