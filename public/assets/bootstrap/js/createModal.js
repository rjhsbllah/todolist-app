function openAddModal() {
  const modal = new bootstrap.Modal(document.getElementById("addModal"));
  modal.show();
}

function closeAddModal() {
  const modalEl = document.getElementById("addModal");
  let modal = bootstrap.Modal.getInstance(modalEl);

  if (!modal) {
    modal = new bootstrap.Modal(modalEl);
  }

  modal.hide();
}

function submitAdd() {
  const title = document.getElementById("add-title").value;
  const description = document.getElementById("add-desc").value;
  const dueDate = document.getElementById("add-date").value;

  fetch("/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, dueDate }),
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: data.message || "Tugas berhasil ditambahkan",
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((err) => {
      console.error(err);
      Swal.fire("Error", "Gagal menambahkan tugas", "error");
    });
}
