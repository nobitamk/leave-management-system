<script setup>
import { ref } from "vue";
import API from "../api/api";

const leaveType = ref("");
const startDate = ref("");
const endDate = ref("");
const reason = ref("");

const errors = ref({});
const successMessage = ref("");

const applyLeave = async () => {

  errors.value = {};
  successMessage.value = "";

  // Field validation
  if (!leaveType.value) {
    errors.value.leaveType = "Leave type is required";
  }

  if (!startDate.value) {
    errors.value.startDate = "Start date is required";
  }

  if (!endDate.value) {
    errors.value.endDate = "End date is required";
  }

  if (!reason.value) {
    errors.value.reason = "Reason is required";
  }

  // Date validation
  if (startDate.value && endDate.value) {
    if (new Date(endDate.value) < new Date(startDate.value)) {
      errors.value.date = "End date cannot be before start date";
    }
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  const token = localStorage.getItem("token");

  try {

    await API.post(
      "/leave/apply",
      {
        leaveType: leaveType.value,
        startDate: startDate.value,
        endDate: endDate.value,
        reason: reason.value
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    successMessage.value = "Leave applied successfully";

    leaveType.value = "";
    startDate.value = "";
    endDate.value = "";
    reason.value = "";

  } catch (err) {
    errors.value.server = "Something went wrong. Please try again.";
  }
};
</script>

<template>

  <div class="min-h-screen bg-gray-100 flex justify-center items-center">

    <div class="bg-white shadow-lg rounded p-8 w-96">

      <h1 class="text-2xl font-bold text-center mb-6">
        Apply Leave
      </h1>

      <!-- Success Message -->
      <div v-if="successMessage"
        class="bg-green-100 text-green-700 p-2 mb-4 rounded">
        {{ successMessage }}
      </div>

      <!-- Leave Type -->
      <div class="mb-4">
        <label class="block mb-1">Leave Type</label>

        <input
          v-model="leaveType"
          placeholder="Sick Leave / Vacation"
          class="w-full border p-2 rounded"
        />

        <p v-if="errors.leaveType" class="text-red-500 text-sm">
          {{ errors.leaveType }}
        </p>
      </div>

      <!-- Start Date -->
      <div class="mb-4">
        <label class="block mb-1">Start Date</label>

        <input
          type="date"
          v-model="startDate"
          class="w-full border p-2 rounded"
        />

        <p v-if="errors.startDate" class="text-red-500 text-sm">
          {{ errors.startDate }}
        </p>
      </div>

      <!-- End Date -->
      <div class="mb-4">
        <label class="block mb-1">End Date</label>

        <input
          type="date"
          v-model="endDate"
          class="w-full border p-2 rounded"
        />

        <p v-if="errors.endDate" class="text-red-500 text-sm">
          {{ errors.endDate }}
        </p>
      </div>

      <!-- Date Validation -->
      <p v-if="errors.date" class="text-red-500 text-sm mb-3">
        {{ errors.date }}
      </p>

      <!-- Reason -->
      <div class="mb-6">
        <label class="block mb-1">Reason</label>

        <textarea
          v-model="reason"
          placeholder="Reason for leave"
          class="w-full border p-2 rounded"
        ></textarea>

        <p v-if="errors.reason" class="text-red-500 text-sm">
          {{ errors.reason }}
        </p>
      </div>

      <!-- Submit Button -->
      <button
        @click="applyLeave"
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit Leave Request
      </button>

      <!-- Server Error -->
      <p v-if="errors.server" class="text-red-500 text-sm mt-3">
        {{ errors.server }}
      </p>

    </div>

  </div>

</template>