<script setup>
import useAuth from '../../api/useAuth';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import itemService from '../../api/softdeleteApi';
import { useToast } from 'vue-toast-notification';

const { getAuthenticated: authenticate } = useAuth();
const permission = ref()
const search = ref('');
const orderBy = ref('quantity');
const direction = ref('asc');
const preOrders = ref({ data: [], prev_page_url: null, next_page_url: null });
const currentPage = ref(1);
const $toast = useToast();

const fetchPreOrders = async () => {
   const response = await axios.get('/api/preorders', {
      params: {
         search: search.value,
         orderBy: orderBy.value,
         direction: direction.value,
         page: currentPage.value,
      },
   });
   preOrders.value = response.data;
};

const nextPage = () => {
   currentPage.value++;
   fetchPreOrders();
};

const previousPage = () => {
   currentPage.value--;
   fetchPreOrders();
};

const items = ref([]);
const trashedItems = ref([]);

const fetchItems = async () => {
   const response = await itemService.getItems();
   items.value = response.data;
};

const fetchTrashedItems = async () => {
   const response = await itemService.getTrashedItems();
   trashedItems.value = response.data;
};

const softDelete = async (id) => {
   try {
      await itemService.softDeleteItem(id);
      await fetchPreOrders();
      //await fetchItems();
      //await fetchTrashedItems();

   } catch (error) {
      // error
      $toast.error('You are not authorized user to access this oparations.');
   }

};

const restore = async (id) => {
   await itemService.restoreItem(id);
   await fetchItems();
   await fetchTrashedItems();
};

onMounted(async () => {
   await fetchPreOrders();
   await fetchItems();
   await fetchTrashedItems();
});


</script>

<template>
   <div class="max-w-6xl mx-auto my-10 bg-gradient-to-b from-white to-gray-100 bg-gray-200">
      <div class="relative flex flex-col w-full h-full text-black shadow-md bg-clip-border rounded-xl  ">
         <div
            class="grid  overflow-hidden text-black shadow-lg h-28 bg-gray-200 rounded-xl bg-gradient-to-tr bg-clip-border shadow-gray-900/20">
            <div class="grid items-center">
               <div class="col-7 justify-self-center">
                  <strong>Pre Order Lists Information</strong>
               </div>
            </div>
            <div class="grid items-center grid-cols-3 gap-1 bg-gray-200">
               <div class="col-7 justify-self-center"><input bg-black w-full v-model="search" placeholder="Search"
                     @input="fetchPreOrders" /></div>
               <div class="col-3 justify-self-center"><select bg-black w-full v-model="orderBy"
                     @change="fetchPreOrders">
                     <option value="name">User Name</option>
                     <option value="email">User Email</option>
                  </select></div>
               <div class="col-2 justify-self-center"><select bg-black w-full v-model="direction"
                     @change="fetchPreOrders">
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
                        User Name
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
                        Product Name
                     </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                     <p
                        class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Product Quantity
                     </p>
                  </th>
                  <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                     <p
                        class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                        Action
                     </p>
                  </th>
               </tr>
            </thead>

            <tbody>
               <!-- Repeat this block for each row -->
               <tr v-for="order in preOrders.data" :key="order.id" class="even:bg-blue-gray-50/50">
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- Username goes here -->
                        {{ order.name }}
                     </p>
                  </td>
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- email goes here -->
                        {{ order.email }}
                     </p>
                  </td>
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- product goes here -->
                        {{ order.product['product_name'] }}
                     </p>
                  </td>
                  <td class="p-4">
                     <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        <!-- quantity goes here -->
                        {{ order.quantity }}
                     </p>
                  </td>
                  <td class="p-4">
                     <!--<a href="#"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>-->

                     <button @click="softDelete(order.id)"
                        class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Soft
                        Delete</button>
                  </td>
               </tr>
            </tbody>
         </table>
         <div class="grid items-center grid-cols-10  bg-gray-200  rounded-xl mb-5">
            <button class="h-10" @click="previousPage" :disabled="!preOrders.prev_page_url">Previous</button>
            <button @click="nextPage" :disabled="!preOrders.next_page_url">Next</button>
         </div>
      </div>
   </div>
</template>