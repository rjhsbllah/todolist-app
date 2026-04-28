function toggleComplete(id) {
  fetch(`/todos/${id}/toggle`, {
    method: "PATCH",
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Response error");
      }
      return res.json();
    })
    .then((data) => {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: data.message,
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((err) => {
      console.error("ERROR:", err);
      Swal.fire("Error", "Gagal update status", "error");
    });
}
