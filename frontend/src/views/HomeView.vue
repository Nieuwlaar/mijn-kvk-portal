<template>
  <div class="min-h-full">
    <NavigationBar/>
    <div class="bg-gray-100 h-1"></div>
    <div class="py-10">
      <main>
        <div class="flex justify-center space-x-4 mx-auto max-w-4xl">
          <div class="max-w-sm w-full overflow-hidden bg-white rounded-lg border border-gray-500">
            <div class="max-w-sm mx-auto overflow-hidden bg-white">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-semibold text-gray-800">Mijn KVK</h2>
                <p class="mt-1 text-gray-600">Deponeer uw jaarrekening of vraag uw identificatiegegevens van rechtspersonen aan voor uw Organisatie Wallet aan.</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/digid.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">Log in met DigiD Hoog</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/EUWallet.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">Log in met EU Wallet</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
              </div>


              <div class="flex mb-4 items-center px-6 pt-4 pb-2">
                <ChevronRightIcon class="h-5 w-5 flex-none text-gray-900" aria-hidden="true" />
                <a href="#" class="text-blue-600 hover:underline">Meer informatie</a>
              </div>

            </div>
          </div>
          <div class="max-w-sm w-full overflow-hidden bg-white rounded-lg border border-gray-500">
            <div class="max-w-sm mx-auto overflow-hidden">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-semibold text-gray-800">Organisatie Wallet</h2>
                <p class="mt-1 text-gray-600">Vraag KVK attesties op voor in uw Organisatie Wallet.</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/EUWallet.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">Log in met EU Organisational Wallet</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
                
              </div>


              <div class="flex mb-4 items-center px-6 pt-4 pb-2">
                <ChevronRightIcon class="h-5 w-5 flex-none text-gray-900" aria-hidden="true" />
                <a href="#" class="text-blue-600 hover:underline">Meer informatie</a>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue';
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

</script>