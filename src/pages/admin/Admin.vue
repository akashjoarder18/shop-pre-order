<script setup>
import useAuth from '../../api/useAuth';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

const { getAuthenticated: authenticate } = useAuth();
const permission = ref()
const search = ref('');
const orderBy = ref('name');
const direction = ref('asc');
const adminUsers = ref({ data: [], prev_page_url: null, next_page_url: null });
const currentPage = ref(1);
const $toast = useToast();

const fetchAdminUsers = async () => {
   const response = await axios.get('/api/users', {
      params: {
         search: search.value,
         orderBy: orderBy.value,
         direction: direction.value,
         page: currentPage.value,
      },
   });
   console.log(response.data);
   adminUsers.value = response.data;
};

const nextPage = () => {
   currentPage.value++;
   fetchAdminUsers();
};

const previousPage = () => {
   currentPage.value--;
   fetchAdminUsers();
};

onMounted(async () => {
   await fetchAdminUsers();
});


</script>

<template>
   <div class="max-w-6xl mx-auto my-10 bg-gradient-to-b from-white to-gray-100 bg-gray-200">
      <div class="relative flex flex-col w-full h-full text-black shadow-md bg-clip-border rounded-xl  ">
         <div
            class="grid  overflow-hidden text-black shadow-lg h-28 bg-gray-200 rounded-xl bg-gradient-to-tr bg-clip-border shadow-gray-900/20">
            <div class="grid items-center">
               <div class="col-7 justify-self-center">
                  <strong>Admin User Lists</strong>
               </div>
            </div>
            <div class="grid items-center grid-cols-3 gap-1 bg-gray-200">
               <div class="col-7 justify-self-center"><input bg-black w-full v-model="search" placeholder="Search"
                     @input="fetchAdminUsers" /></div>
               <div class="col-3 justify-self-center"><select bg-black w-full v-model="orderBy"
                     @change="fetchAdminUsers">
                     <option value="name">User Name</option>
                     <option value="email">User Email</option>
                  </select></div>
               <div class="col-2 justify-self-center"><select bg-black w-full v-model="direction"
                     @change="fetchAdminUsers">
                     <option value="asc">Ascending</option>
                     <option value="desc">Descending</option>
                  </select></div>
            </div>

         </div>

         <table class="w-full text-left table-auto min-w-max">
            <thead>
               <tr>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                     <p
                        class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Name
                     </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                     <p
                        class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Email
                     </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                     <p
                        class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Role
                     </p>
                  </th>
                  
               </tr>
            </thead>

            <tbody>
               <!-- Repeat this block for each row -->
               <tr v-for="admin in adminUsers.data" :key="admin.id" class="even:bg-blue-gray-50/50">
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- Username goes here -->
                        {{ admin.name }}
                     </p>
                  </td>
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- email goes here -->
                        {{ admin.email }}
                     </p>
                  </td>
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- product goes here -->
                        {{ admin.role }}
                     </p>
                  </td>
               </tr>
            </tbody>
         </table>
         <div class="grid items-center grid-cols-10  bg-gray-200  rounded-xl mb-5">
            <button class="h-10" @click="previousPage" :disabled="!adminUsers.prev_page_url">Previous</button>
            <button @click="nextPage" :disabled="!adminUsers.next_page_url">Next</button>
         </div>
      </div>
   </div>
</template>