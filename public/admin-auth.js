import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const AUTHORIZED_EMAIL = "nadimabdelmeguid@gmail.com";

async function init() {
  const root = document.getElementById("login-form");
  const button = document.getElementById("google-login-button");
  const message = document.getElementById("login-message");
  if (!root || !button || !message) return;

  const supabaseUrl = root.dataset.supabaseUrl;
  const supabaseKey = root.dataset.supabaseKey;

  function show(text, type) {
    message.textContent = text;
    message.className = "form-message " + (type || "");
  }

  if (!supabaseUrl || !supabaseKey) {
    show("Admin authentication is not configured correctly.", "error");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  const params = new URLSearchParams(location.search);
  const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
  const oauthError =
    params.get("error_description") ||
    hash.get("error_description") ||
    params.get("error") ||
    hash.get("error");

  if (oauthError) {
    show(decodeURIComponent(oauthError), "error");
  }

  // Give supabase-js a moment to consume an implicit OAuth callback.
  if (location.hash.includes("access_token=")) {
    show("Google sign-in successful. Opening your dashboard...", "success");
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (session?.user) {
    const email = session.user.email?.toLowerCase();
    if (email !== AUTHORIZED_EMAIL) {
      await supabase.auth.signOut();
      show("This Google account is not authorized for Soleil & Stone admin.", "error");
      return;
    }

    // The main admin module will now see the persisted Supabase session.
    if (location.hash || location.search) {
      history.replaceState({}, document.title, "/admin/");
    }
    window.dispatchEvent(new CustomEvent("soleil-admin-auth-ready"));
    return;
  }

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Opening Google...";
    show("Redirecting to Google sign-in...", "");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://soleilandstone.co/admin/",
        scopes: "openid email profile"
      }
    });

    if (error) {
      show(error.message || "Could not start Google sign-in.", "error");
      button.disabled = false;
      button.textContent = "Continue with Google";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
