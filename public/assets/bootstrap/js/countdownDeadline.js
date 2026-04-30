function updateCountdown() {
  const elements = document.querySelectorAll(".countdown");

  elements.forEach((el) => {
    const deadline = new Date(el.dataset.deadline);
    const now = new Date();

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

// update tiap 1 detik
setInterval(updateCountdown, 1000);

// jalankan pertama kali
updateCountdown();
