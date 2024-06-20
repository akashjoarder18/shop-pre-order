<script setup>
import { RouterLink } from 'vue-router';
import useAuth from '../api/useAuth';

const { getUser: user, getAuthenticated: authenticate, logout } = useAuth();

</script>

<template>
    <header>
        <!-- Navbar -->
        <nav
            class="block w-full max-w-screen-xl px-6 py-3 mx-auto text-black bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
            <div class="flex items-center justify-between text-blue-gray-900">

                <!-- Logo // or you can use image here-->
                <a href="#"
                    class="mr-4 block cursor-pointer py-1.5 font-sans text-base font-semibold leading-relaxed tracking-normal text-inherit antialiased">

                    Logo

                </a>

                <!-- Hamburger menu -->
                <div class="hidden lg:block">
                    <ul class="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                        <template v-if="authenticate">
                            <li
                                class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                <router-link class="flex items-center transition-colors hover:text-blue-500"
                                    to="/admin/users">Users</router-link>

                            </li>

                            <li
                                class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                <router-link class="flex items-center transition-colors hover:text-blue-500"
                                    to="/admin/orders">PreOrderLists</router-link>

                            </li>
                            <li
                                class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                <router-link class="flex items-center transition-colors hover:text-blue-500"
                                    to="/register">Registration</router-link>

                            </li>
                            <li
                                class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
                                <router-link @click="logout"
                                    class="flex items-center transition-colors hover:text-blue-500"
                                    to="/admin/logout">Logout</router-link>
                            </li>
                            <li>
                                {{ user.role }}
                            </li>
                        </template>
                        <template v-else>
                            <li
                                class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">

                                <router-link class="flex items-center transition-colors hover:text-blue-500"
                                    to="/">Order</router-link>
                            </li>

                            <li
                                class="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">

                                <router-link class="flex items-center transition-colors hover:text-blue-500"
                                    to="/admin/login">Login</router-link>
                            </li>
                        </template>



                    </ul>
                </div>



                <!-- Hamburger button -->
                <button
                    class="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
                    type="button">
                    <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" aria-hidden="true" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5">
                            </path>
                        </svg>
                    </span>
                </button>

            </div>
        </nav>
    </header>
</template>