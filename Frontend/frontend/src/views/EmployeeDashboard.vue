<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">

    <!-- Navbar -->
    <div class="flex justify-between items-center bg-blue-600 text-white p-4">
      <h1 class="text-xl font-bold">Employee Dashboard</h1>

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
        Welcome Employee
      </h2>

      <div class="flex gap-4">

        <router-link
          to="/apply"
          class="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600"
        >
          Apply Leave
        </router-link>

        <router-link
          to="/myleaves"
          class="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600"
        >
          Check My Leaves
        </router-link>

      </div>

    </div>

  </div>
</template>