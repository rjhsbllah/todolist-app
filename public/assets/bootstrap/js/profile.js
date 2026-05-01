document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".password-field").forEach((field) => {
    const input = field.querySelector("input");
    const toggle = field.querySelector(".toggle-password i");

    field.querySelector(".toggle-password").addEventListener("click", () => {
      const isPassword = input.type === "password";

      input.type = isPassword ? "text" : "password";

      toggle.classList.toggle("fa-eye-slash");
      toggle.classList.toggle("fa-eye");
    });
  });
});
