(() => {
  function init() {
    const form = document.getElementById("login-form");
    const emailInput = document.getElementById("login-email");
    const button = document.getElementById("login-submit");
    const message = document.getElementById("login-message");
    const otpInput = document.getElementById("login-otp");

    if (!form || !emailInput || !button || !message) return;

    const supabaseUrl = form.dataset.supabaseUrl;
    const supabaseKey = form.dataset.supabaseKey;

    function show(text, type) {
      message.textContent = text;
      message.className = "form-message " + (type || "");
    }

    const otpForm = document.getElementById("otp-form");
    const otpButton = document.getElementById("otp-submit");

    if (otpForm && otpInput && otpButton) {
      otpForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const email = emailInput.value.trim();
        const token = otpInput.value.replace(/\s+/g, "").trim();

        if (!email || !token) {
          show("Enter the email address and verification code from your inbox.", "error");
          return;
        }

        otpButton.disabled = true;
        otpButton.textContent = "Verifying...";
        show("Verifying your code...", "");

        try {
          const response = await fetch(supabaseUrl + "/auth/v1/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": supabaseKey,
              "Authorization": "Bearer " + supabaseKey
            },
            body: JSON.stringify({
              type: "email",
              email,
              token
            })
          });

          let payload = {};
          try { payload = await response.json(); } catch (_) {}

          if (!response.ok) {
            throw new Error(
              payload?.msg ||
              payload?.message ||
              payload?.error_description ||
              "The verification code is invalid or has expired."
            );
          }

          const accessToken = payload?.access_token;
          const refreshToken = payload?.refresh_token;

          if (!accessToken || !refreshToken) {
            throw new Error("The code was accepted, but no session was returned.");
          }

          const storageKey = "sb-" + new URL(supabaseUrl).hostname.split(".")[0] + "-auth-token";
          localStorage.setItem(storageKey, JSON.stringify({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: payload.expires_in,
            expires_at: payload.expires_at,
            token_type: payload.token_type || "bearer",
            user: payload.user
          }));

          show("Code verified. Opening your dashboard...", "success");
          window.location.reload();
        } catch (error) {
          show(error?.message || "Could not verify the code.", "error");
        } finally {
          otpButton.disabled = false;
          otpButton.textContent = "Verify code";
        }
      }, true);
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();

      const email = emailInput.value.trim();
      if (!email) {
        show("Enter your email address.", "error");
        return;
      }

      if (!supabaseUrl || !supabaseKey) {
        show("Admin authentication is not configured correctly.", "error");
        return;
      }

      button.disabled = true;
      button.textContent = "Sending...";
      show("Requesting your secure sign-in email...", "");

      try {
        const redirectTo =
          location.hostname === "localhost" || location.hostname === "127.0.0.1"
            ? location.origin + "/admin/"
            : "https://soleilandstone.co/admin/";

        const response = await fetch(
          supabaseUrl + "/auth/v1/otp?redirect_to=" + encodeURIComponent(redirectTo),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "apikey": supabaseKey,
              "Authorization": "Bearer " + supabaseKey
            },
            body: JSON.stringify({ email, create_user: true })
          }
        );

        let payload = {};
        try { payload = await response.json(); } catch (_) {}

        if (!response.ok) {
          throw new Error(
            payload?.msg ||
            payload?.message ||
            payload?.error_description ||
            "Could not send the sign-in email."
          );
        }

        show(
          "Email sent. Check your inbox and spam folder, then enter the verification code below.",
          "success"
        );

        if (otpInput) otpInput.focus();
      } catch (error) {
        show(error?.message || "Could not send the sign-in email.", "error");
      } finally {
        button.disabled = false;
        button.textContent = "Send secure sign-in email";
      }
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();