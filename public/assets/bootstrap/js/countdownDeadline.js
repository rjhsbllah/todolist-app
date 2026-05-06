function updateCountdown() {
  const elements = document.querySelectorAll(".countdown");

  elements.forEach((el) => {
    const deadline = new Date(el.dataset.deadline).getTime();
    const now = Date.now();

    const diff = deadline - now;

    if (isNaN(diff)) {
      el.innerHTML = "❌ Format tanggal error";
      return;
    }

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
