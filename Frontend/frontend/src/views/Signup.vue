<script setup>
import { ref } from "vue";
import API from "../api/api";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");

const errors = ref({});
const successMessage = ref("");

const router = useRouter();

const signup = async () => {

  errors.value = {};
  successMessage.value = "";

  if (!name.value) {
    errors.value.name = "Name is required";
  }

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

    await API.post("/auth/signup", {
      name: name.value,
      email: email.value,
      password: password.value
    });

    successMessage.value = "Account created successfully";

    name.value = "";
    email.value = "";
    password.value = "";

    setTimeout(() => {
      router.push("/");
    }, 1500);

  } catch (err) {
    errors.value.server = "Signup failed. Try again.";
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
        Sign Up
      </h2>

      <!-- Success Message -->
      <div v-if="successMessage"
        class="bg-green-100 text-green-700 p-2 mb-4 rounded">
        {{ successMessage }}
      </div>

      <!-- Name -->
      <div class="mb-4">
        <label class="block mb-1 text-sm">Name</label>

        <input
          v-model="name"
          placeholder="Enter your name"
          class="w-full border rounded p-2"
        />

        <p v-if="errors.name" class="text-red-500 text-sm">
          {{ errors.name }}
        </p>
      </div>

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

      <!-- Button -->
      <button
        @click="signup"
        class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Create Account
      </button>

      <!-- Login link -->
      <p class="text-center text-sm mt-4">
        Already have an account?
        <router-link
          to="/"
          class="text-blue-500 hover:underline font-semibold"
        >
          Login
        </router-link>
      </p>

      <!-- Server Error -->
      <p v-if="errors.server" class="text-red-500 text-sm mt-3">
        {{ errors.server }}
      </p>

    </div>

  </div>

</template>