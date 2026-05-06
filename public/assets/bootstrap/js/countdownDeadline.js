function getWIBTime() {
  const now = new Date();

  // offset dalam menit
  const localOffset = now.getTimezoneOffset();
  const wibOffset = 7 * 60;

  return new Date(now.getTime() + (wibOffset + localOffset) * 60000);
}

function updateCountdown() {
  const elements = document.querySelectorAll(".countdown");

  elements.forEach((el) => {
    // pastikan deadline dianggap WIB
    const deadline = new Date(el.dataset.deadline + " GMT+0700");
    const now = getWIBTime();

    const diff = deadline - now;

    if (diff <= 0) {
      el.innerHTML = "❌ Deadline terlewati";
      el.classList.remove("text-info");
      el.classList.add("text-danger");
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    el.innerHTML = `Tersisa : ${days} hari ${hours} jam ${minutes} menit`;
  });
}

setInterval(updateCountdown, 1000);
updateCountdown();
