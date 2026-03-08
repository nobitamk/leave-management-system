<script setup>
import { ref } from "vue";
import API from "../api/api";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");

const errors = ref({});

const login = async () => {

  errors.value = {};

  if (!email.value) {
    errors.value.email = "Email is required";
  }

  if (!password.value) {
    errors.value.password = "Password is required";
  }

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  try {

    const res = await API.post("/auth/login", {
      email: email.value,
      password: password.value
    });

    const token = res.data.token;
    const user = res.data.user;

    localStorage.setItem("token", token);

    if (user.role === "employer") {
      router.push("/admin");
    } else {
      router.push("/employee");
    }

  } catch (err) {
    errors.value.server = "Invalid email or password";
  }
};
</script>

<template>

  <div class="min-h-screen flex items-center justify-center bg-gray-100">

    <div class="bg-white shadow-lg rounded-lg p-8 w-96">

      <h1 class="text-3xl font-bold text-center mb-6 text-blue-600">
        Leave Management
      </h1>

      <h2 class="text-xl text-center mb-6">
        Login
      </h2>

      <!-- Email -->
      <div class="mb-4">
        <label class="block mb-1 text-sm">Email</label>

        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          class="w-full border rounded p-2"
        />

        <p v-if="errors.email" class="text-red-500 text-sm">
          {{ errors.email }}
        </p>
      </div>

      <!-- Password -->
      <div class="mb-6">
        <label class="block mb-1 text-sm">Password</label>

        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="w-full border rounded p-2"
        />

        <p v-if="errors.password" class="text-red-500 text-sm">
          {{ errors.password }}
        </p>
      </div>

      <!-- Login Button -->
      <button
        @click="login"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        Login
      </button>

      <!-- Signup Link -->
      <p class="text-center text-sm mt-4">
        Don't have an account?
        <router-link
          to="/signup"
          class="text-blue-500 hover:underline font-semibold"
        >
          Sign Up
        </router-link>
      </p>

      <!-- Server Error -->
      <p v-if="errors.server" class="text-red-500 text-sm mt-3 text-center">
        {{ errors.server }}
      </p>

    </div>

  </div>

</template>