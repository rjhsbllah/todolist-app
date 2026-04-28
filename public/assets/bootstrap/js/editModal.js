let editId = null;

function openEditModal(id, title, desc) {
  editId = id;
  document.getElementById("edit-id").value = id;
  document.getElementById("edit-title").value = title;
  document.getElementById("edit-desc").value = desc;

  new bootstrap.Modal(document.getElementById("editModal")).show();
}

function closeModal() {
  const modalEl = document.getElementById("editModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}

function saveTask() {
  const id = document.getElementById("edit-id").value;
  const title = document.getElementById("edit-title").value;
  const description = document.getElementById("edit-desc").value;

  fetch(`/todos/${id}?_method=PUT`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  }).then(() => location.reload());
}
