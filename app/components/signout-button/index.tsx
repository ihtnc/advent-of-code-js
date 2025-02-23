'use client';

import { useActionState, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Modal from "@/components/modal";
import Spinner from "@/components/spinner";
import { performSignOut } from "./actions";
import ExitIcon from "@public/images/exit.svg";
import AngleSmallRightIcon from "@public/images/angle-small-right.svg";

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
      <Modal title="Sign out" onClose={closeForm} show={show} className="gap-6">
        <span className="flex text-sm text-gray-500 dark:text-gray-400 text-center justify-center w-full">
          Removing your Advent of Code session<br />
          will use the sample input instead.
        </span>
        <form action={action} className="flex gap-2 py-6 items-center justify-center h-6 text-lg">
          <button disabled={pending}
            className="group flex items-center rounded-md border border-black dark:border-white pr-2 pl-4 py-1 hover:pr-3 hover:pl-5 hover:py-2 hover:-my-1 cursor-pointer">
            Remove
            {(pending
              ? <Spinner width={24} height={24} className="m-1"/>
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
  };

  return (
    <>
      <button
        className="group flex gap-2 items-center cursor-pointer"
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