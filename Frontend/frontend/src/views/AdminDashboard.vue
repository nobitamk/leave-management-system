<script setup>
import { ref, onMounted } from "vue";
import API from "../api/api";
import { useRouter } from "vue-router";

const router = useRouter();
const leaves = ref([]);
const token = localStorage.getItem("token");

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};

const fetchLeaves = async () => {
  try {
    const res = await API.get("/leave/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    leaves.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const approve = async (id) => {
  await API.put(`/leave/approve/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const leave = leaves.value.find(l => l._id === id);
  if (leave) leave.status = "approved";
};

const reject = async (id) => {
  await API.put(`/leave/reject/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const leave = leaves.value.find(l => l._id === id);
  if (leave) leave.status = "rejected";
};

onMounted(fetchLeaves);
</script>

<template>
<div class="min-h-screen bg-gray-100">

<!-- Navbar -->
<div class="flex justify-between items-center bg-blue-600 text-white p-4">
<h1 class="text-xl font-bold">Admin Dashboard</h1>

<button
@click="logout"
class="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
>
Logout
</button>
</div>

<div class="p-8">

<h2 class="text-2xl font-bold mb-6">
Leave Requests
</h2>

<div
v-for="leave in leaves"
:key="leave._id"
class="bg-white shadow p-5 mb-4 rounded"
>

<p><strong>Employee:</strong> {{ leave.employeeId.name }}</p>
<p><strong>Leave Type:</strong> {{ leave.leaveType }}</p>

<p class="mt-2">
<strong>Status:</strong>

<span
v-if="leave.status === 'pending'"
class="bg-yellow-200 text-yellow-800 px-2 py-1 rounded text-sm"
>
Pending
</span>

<span
v-if="leave.status === 'approved'"
class="bg-green-200 text-green-800 px-2 py-1 rounded text-sm"
>
Approved
</span>

<span
v-if="leave.status === 'rejected'"
class="bg-red-200 text-red-800 px-2 py-1 rounded text-sm"
>
Rejected
</span>
</p>

<!-- Action Buttons -->
<div v-if="leave.status === 'pending'" class="mt-3">

<button
@click="approve(leave._id)"
class="bg-green-500 text-white px-3 py-1 mr-2 rounded hover:bg-green-600"
>
Approve
</button>

<button
@click="reject(leave._id)"
class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
>
Reject
</button>

</div>

</div>

</div>

</div>
</template>