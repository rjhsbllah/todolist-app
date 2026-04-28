function confirmDelete(id) {
  Swal.fire({
    title: "Yakin hapus?",
    text: "Data tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById(`delete-form-${id}`).submit();
    }
  });
}
