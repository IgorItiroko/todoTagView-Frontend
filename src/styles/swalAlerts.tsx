import Swal from "sweetalert2";

export const apiFailed = Swal.mixin({
    title:'API server is running?',
    text:'Cannot connect with API',
    icon:'question'
})

export const confirmDelete = Swal.mixin({
        title: 'Are you sure?',
        text: "You are deleting an uncompleted task!!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
})