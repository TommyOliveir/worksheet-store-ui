"use client";

import { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { ApiError } from "@/shared/api/client";
import { useGoogleSignIn } from "@/features/auth/hooks/useGoogleSignIn";
import { GOOGLE_CLIENT_ID } from "@/features/auth/lib/googleConfig";
import type { GoogleSignInMode } from "@/features/auth/types/auth.types";

const GOOGLE_BUTTON_TEXT: Record<
  GoogleSignInMode,
  "signin_with" | "signup_with"
> = {
  signin: "signin_with",
  signup: "signup_with",
};

const GOOGLE_POPUP_ERROR = "Google sign-in was cancelled or failed.";
const UNKNOWN_ERROR = "Something went wrong. Please try again.";

interface GoogleSignInButtonProps {
  mode: GoogleSignInMode;
  onSignedIn: () => void;
}

// Smart component: owns the Google popup and the API exchange. The button
// itself is Google's own iframe, which their branding rules require us to
// use as-is rather than restyling our Button.
export function GoogleSignInButton({
  mode,
  onSignedIn,
}: GoogleSignInButtonProps) {
  const { signInWithGoogle, isSigningIn, signInError } = useGoogleSignIn();
  const [popupFailed, setPopupFailed] = useState(false);

  // Google's script cannot load without a client ID. In production the button
  // is simply left out; in development say why, so it doesn't vanish silently.
  if (!GOOGLE_CLIENT_ID) {
    return process.env.NODE_ENV === "development" ? (
      <p className="text-center text-xs text-muted-foreground">
        Google sign-in is off: set NEXT_PUBLIC_GOOGLE_CLIENT_ID in .env.local
        and restart the dev server.
      </p>
    ) : null;
  }

  const errorMessage = popupFailed
    ? GOOGLE_POPUP_ERROR
    : signInError
      ? signInError instanceof ApiError
        ? signInError.message
        : UNKNOWN_ERROR
      : null;

  const handleCredential = (credential: string | undefined) => {
    if (!credential) {
      setPopupFailed(true);
      return;
    }
    setPopupFailed(false);
    signInWithGoogle({ credential }, { onSuccess: onSignedIn });
  };

  // The provider loads Google's script, so it lives here rather than in the
  // root layout: only the login and register pages pay for it.
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center gap-2" aria-busy={isSigningIn}>
        <GoogleLogin
          onSuccess={({ credential }) => handleCredential(credential)}
          onError={() => setPopupFailed(true)}
          text={GOOGLE_BUTTON_TEXT[mode]}
          shape="rectangular"
          width={320}
        />
        {isSigningIn && (
          <p className="text-sm text-muted-foreground">Signing in...</p>
        )}
        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}
