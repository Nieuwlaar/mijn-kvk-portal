<template>
  <div class="min-h-full relative">
    <NavigationBar />
    <div class="bg-gray-100 h-1"></div>
    <div class="py-10">
      <main>
        <div class="flex justify-center space-x-4 mx-auto max-w-4xl">
          <div class="max-w-sm w-full overflow-hidden bg-white rounded-lg border border-gray-500">
            <div class="max-w-sm mx-auto overflow-hidden bg-white">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-semibold text-gray-800">{{ t('myKvk') }}</h2>
                <p class="mt-1 text-gray-600">{{ t('depositYourAnnual') }}</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/digid.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">{{ t('loginWithDigiD') }}</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button @click="showPopup" class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/EUWallet.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">{{ t('loginWithEUWallet') }}</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
              </div>

              <div class="flex mb-4 items-center px-6 pt-4 pb-2">
                <ChevronRightIcon class="h-5 w-5 flex-none text-gray-900" aria-hidden="true" />
                <a href="#" class="text-blue-600 hover:underline">{{ t('moreInformation') }}</a>
              </div>
            </div>
          </div>
          <div class="max-w-sm w-full overflow-hidden bg-white rounded-lg border border-gray-500">
            <div class="max-w-sm mx-auto overflow-hidden">
              <div class="px-6 py-4">
                <h2 class="text-2xl font-semibold text-gray-800">{{ t('organizationWallet') }}</h2>
                <p class="mt-1 text-gray-600">{{ t('requestKvKAttestations') }}</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                <button @click="showPopup" class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/EUWallet.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">{{ t('loginWithEUWallet') }}</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
              </div>

              <div class="flex mb-4 items-center px-6 pt-4 pb-2">
                <ChevronRightIcon class="h-5 w-5 flex-none text-gray-900" aria-hidden="true" />
                <a href="#" class="text-blue-600 hover:underline">{{ t('moreInformation') }}</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="isPopupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">{{ t('popupTitle') }}</h2>
          <div class="mt-4">
            <div class="mb-4">
              <label class="block text-gray-700">{{ t('kvkNumber') }}</label>
              <input v-model="kvkNumber" type="text" class="w-full px-4 py-2 border rounded-md" />
            </div>
            <p class="mt-2 mb-2">{{ t('popupSubtitle') }}</p>
            <div class="mb-4">
              <label class="block text-gray-700">{{ t('familyName') }}</label>
              <input v-model="familyName" type="text" class="w-full px-4 py-2 border rounded-md" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">{{ t('name') }}</label>
              <input v-model="name" type="text" class="w-full px-4 py-2 border rounded-md" />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700">{{ t('birthdate') }}</label>
              <input v-model="birthdate" type="date" class="w-full px-4 py-2 border rounded-md" />
            </div>
          </div>
        </div>
        <div class="px-6 py-4 flex justify-center">
          <button @click="goToPortal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">{{ t('login') }}</button>
          <button @click="hidePopup" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">{{ t('cancel') }}</button>
        </div>
      </div>
    </div>

    <div v-if="isErrorVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full">
        <div class="px-6 py-4">
          <h2 class="text-xl font-semibold text-gray-800">Failed to log in</h2>
          <p class="mt-1 text-gray-600">Does the gimly-kvk-api-consumer work correctly?</p>
          <div class="px-6 py-4 flex justify-center">
            <button @click="hideErrorPopup" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'

const { t } = useI18n()
const router = useRouter()
const isPopupVisible = ref(false)
const isErrorVisible = ref(false)
const familyName = ref('Klaassen')
const name = ref('Jan')
const birthdate = ref('1969-07-09')
const kvkNumber = ref('90000001')

const showPopup = () => {
  isPopupVisible.value = true
}

const hidePopup = () => {
  isPopupVisible.value = false
}

const hideErrorPopup = () => {
  isErrorVisible.value = false
}

const goToPortal = async () => {
  isPopupVisible.value = false
  const birthdateFormatted = new Date(birthdate.value).toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replaceAll('/', '-');
  try {
    const response = await fetch(`http://localhost:3333/api/bevoegdheid/${kvkNumber.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geslachtsnaam: familyName.value,
        voornamen: name.value,
        geboortedatum: birthdateFormatted
      })
    })

    if (response.ok) {
      router.push({ path: '/portal' })
    } else {
      console.error('Failed to log in')
      isErrorVisible.value = true
      setTimeout(() => {
        isErrorVisible.value = false
      }, 5000) // Hide the error popup after 5 seconds
    }
  } catch (error) {
    console.error('Failed to log in', error)
    isErrorVisible.value = true
    setTimeout(() => {
      isErrorVisible.value = false
    }, 5000) // Hide the error popup after 5 seconds
  }
}
</script>

<style scoped>
button {
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #e2e8f0; /* Light gray color to avoid purple flash */
}
</style>
