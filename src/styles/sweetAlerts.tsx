import Swal from "sweetalert2";

export const apiFailed = Swal.mixin({
  title: "API server is running?",
  text: "Cannot connect with API",
  icon: "question",
  confirmButtonColor: "#00B69B",
});

export const confirmDelete = Swal.mixin({
  title: "Are you sure?",
  text: "You are deleting an uncompleted task!!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#00B69B",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
});
