(() => {
  const AUTHORIZED_EMAIL = "nadimabdelmeguid@gmail.com";

  function show(messageEl, text, type) {
    if (!messageEl) return;
    messageEl.textContent = text;
    messageEl.className = "form-message " + (type || "");
  }

  function projectStorageKey(url) {
    try { return "sb-" + new URL(url).hostname.split(".")[0] + "-auth-token"; }
    catch (_) { return ""; }
  }

  async function init() {
    const root = document.getElementById("login-form");
    const button = document.getElementById("google-login-button");
    const message = document.getElementById("login-message");
    if (!root || !button) return;

    const supabaseUrl = root.dataset.supabaseUrl;
    const supabaseKey = root.dataset.supabaseKey;
    if (!supabaseUrl || !supabaseKey) {
      show(message, "Admin authentication is not configured correctly.", "error");
      return;
    }

    // Supabase implicit OAuth returns tokens in the URL fragment.
    const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");

    if (accessToken && refreshToken) {
      show(message, "Google sign-in successful. Opening your dashboard...", "success");
      try {
        const userResponse = await fetch(supabaseUrl + "/auth/v1/user", {
          headers: {
            apikey: supabaseKey,
            Authorization: "Bearer " + accessToken
          }
        });
        const user = await userResponse.json();
        if (!userResponse.ok) throw new Error(user?.msg || user?.message || "Could not verify the Google session.");
        if ((user?.email || "").toLowerCase() !== AUTHORIZED_EMAIL) {
          throw new Error("This Google account is not authorized for Soleil & Stone admin.");
        }

        const expiresIn = Number(hash.get("expires_in") || 3600);
        const session = {
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn,
          expires_at: Math.floor(Date.now() / 1000) + expiresIn,
          token_type: hash.get("token_type") || "bearer",
          user
        };
        localStorage.setItem(projectStorageKey(supabaseUrl), JSON.stringify(session));
        history.replaceState({}, document.title, "/admin/");
        location.reload();
        return;
      } catch (error) {
        show(message, error?.message || "Could not complete Google sign-in.", "error");
        return;
      }
    }

    const params = new URLSearchParams(location.search);
    const oauthError = params.get("error_description") || hash.get("error_description") || params.get("error") || hash.get("error");
    if (oauthError) show(message, decodeURIComponent(oauthError), "error");

    // If a valid persisted session exists, let the main admin app initialize.
    try {
      const raw = localStorage.getItem(projectStorageKey(supabaseUrl));
      if (raw) {
        const session = JSON.parse(raw);
        if ((session?.user?.email || "").toLowerCase() === AUTHORIZED_EMAIL && session?.access_token) return;
      }
    } catch (_) {}

    button.addEventListener("click", () => {
      button.disabled = true;
      button.textContent = "Opening Google...";
      show(message, "Redirecting to Google sign-in...", "");
      const redirectTo = "https://soleilandstone.co/admin/";
      location.href =
        supabaseUrl + "/auth/v1/authorize?provider=google" +
        "&redirect_to=" + encodeURIComponent(redirectTo) +
        "&scopes=" + encodeURIComponent("openid email profile");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();