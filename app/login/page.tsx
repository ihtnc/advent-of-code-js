'use client';

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { login } from "@/actions/auth";
import Spinner from "@/components/spinner";
import SignInAltIcon from "@public/images/sign-in-alt.svg";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <>
    <form action={action} className="flex gap-2 pt-24 pb-24 items-center justify-center h-6 text-md sm:text-lg">
      <input id="session" name="session" type="text" placeholder="Enter session id to begin" autoFocus
        className="caret-black dark:caret-white w-80 dark:bg-black text-center border border-gray-300 rounded-md"
        disabled={pending}
      />
      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button disabled={pending}
      >
        {(pending
          ? <Spinner width={32} height={32} />
          : <Image
            aria-hidden
            src={SignInAltIcon}
            alt="Login icon"
            width={32}
            height={32}
            className="hover:scale-125 dark:invert"
          />
        )}
      </button>
    </form>
    {state?.message && <span className="-mt-6 text-red-500 text-sm">{state.message}</span>}
    </>
  );
};