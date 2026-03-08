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

  const res = await API.get("/leave/all", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  leaves.value = res.data;
};

const approve = async (id) => {

  await API.put(`/leave/approve/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  fetchLeaves();
};

const reject = async (id) => {

  await API.put(`/leave/reject/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  fetchLeaves();
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

    <!-- Content -->
    <div class="p-8">

      <h2 class="text-2xl font-bold mb-6">
        Leave Requests
      </h2>

      <div
        v-for="leave in leaves"
        :key="leave._id"
        class="bg-white shadow p-4 mb-4 rounded"
      >

        <p><strong>Employee:</strong> {{ leave.employeeId.name }}</p>
        <p><strong>Leave Type:</strong> {{ leave.leaveType }}</p>
        <p><strong>Status:</strong> {{ leave.status }}</p>

        <div class="mt-3">

          <button
            @click="approve(leave._id)"
            class="bg-green-500 text-white px-3 py-1 mr-2 rounded"
          >
            Approve
          </button>

          <button
            @click="reject(leave._id)"
            class="bg-red-500 text-white px-3 py-1 rounded"
          >
            Reject
          </button>

        </div>

      </div>

    </div>

  </div>
</template>