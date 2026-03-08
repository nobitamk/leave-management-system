<script setup>
import { ref, onMounted } from "vue";
import API from "../api/api";

const leaves = ref([]);

const fetchLeaves = async () => {

  const token = localStorage.getItem("token");

  const res = await API.get("/leave/my", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  leaves.value = res.data;
};

onMounted(fetchLeaves);
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <div class="max-w-3xl mx-auto pt-10">

      <h1 class="text-2xl font-bold mb-6">
        My Leave Requests
      </h1>

      <div
        v-for="leave in leaves"
        :key="leave._id"
        class="bg-white shadow p-4 mb-4 rounded"
      >

        <p><strong>Leave Type:</strong> {{ leave.leaveType }}</p>

        <p>
          <strong>Dates:</strong>
          {{ new Date(leave.startDate).toLocaleDateString() }}
          →
          {{ new Date(leave.endDate).toLocaleDateString() }}
        </p>

        <p class="mt-2">

          <strong>Status:</strong>

          <span
            v-if="leave.status === 'pending'"
            class="text-yellow-600 font-semibold"
          >
            Pending
          </span>

          <span
            v-if="leave.status === 'approved'"
            class="text-green-600 font-semibold"
          >
            Approved
          </span>

          <span
            v-if="leave.status === 'rejected'"
            class="text-red-600 font-semibold"
          >
            Rejected
          </span>

        </p>

      </div>

    </div>

  </div>
</template>