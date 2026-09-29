(() => {
  const AUTHORIZED_EMAIL = "nadimabdelmeguid@gmail.com";

  function init() {
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

    // Handle an OAuth error returned by Supabase.
    const params = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
    const oauthError =
      params.get("error_description") ||
      hash.get("error_description") ||
      params.get("error") ||
      hash.get("error");
    if (oauthError) show(decodeURIComponent(oauthError), "error");

    button.addEventListener("click", () => {
      if (!supabaseUrl || !supabaseKey) {
        show("Admin authentication is not configured correctly.", "error");
        return;
      }

      button.disabled = true;
      button.textContent = "Opening Google...";
      show("Redirecting to Google sign-in...", "");

      const redirectTo = "https://soleilandstone.co/admin/";
      const authorizeUrl =
        supabaseUrl +
        "/auth/v1/authorize?provider=google" +
        "&redirect_to=" + encodeURIComponent(redirectTo) +
        "&scopes=" + encodeURIComponent("openid email profile");

      location.assign(authorizeUrl);
    });

    // The main Supabase client processes the returned session. This script
    // provides an additional client-side guard; database RLS/admin membership
    // remains the authorization boundary.
    try {
      const projectRef = new URL(supabaseUrl).hostname.split(".")[0];
      const raw = localStorage.getItem("sb-" + projectRef + "-auth-token");
      if (raw) {
        const session = JSON.parse(raw);
        const email = session?.user?.email?.toLowerCase();
        if (email && email !== AUTHORIZED_EMAIL) {
          localStorage.removeItem("sb-" + projectRef + "-auth-token");
          show("This Google account is not authorized for Soleil & Stone admin.", "error");
        }
      }
    } catch (_) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();