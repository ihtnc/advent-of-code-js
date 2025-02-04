'use client';

import Image from "next/image";
import { useActionState } from "react";
import { login } from "@/actions/auth";
import Spinner from "@/components/spinner";
import SignInAltIcon from "@public/images/sign-in-alt.svg";

export default function Login() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <>
    <form action={action} className="flex gap-2 pt-24 pb-24 items-center justify-center h-6">
      <input id="session" name="session" type="text" placeholder="Enter session id to begin" autoFocus
        className="caret-black dark:caret-white w-80 dark:bg-black text-center border border-gray-300 rounded-md"
        disabled={pending}
      />

      <button type="submit" disabled={pending}
      >
        {(pending
          ? <Spinner width={24} height={24} />
          : <Image
            aria-hidden
            src={SignInAltIcon}
            alt="Login icon"
            width={24}
            height={24}
            className="hover:scale-125"
          />
        )}
      </button>
    </form>
    {state?.message && <span className="-mt-6 text-red-500 text-sm">{state.message}</span>}
    </>
  );
};