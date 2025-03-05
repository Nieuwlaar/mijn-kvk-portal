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
              <!-- <div class="px-6 pt-4 pb-2">
                <button @click="navigateToPortalDirectly" class="flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 w-full">
                  <img src="/src/img/digid.png" alt="Login" class="h-6 mr-4" />
                  <span class="flex-1 text-left font-medium text-gray-700">{{ t('loginWithDigiD') }}</span>
                  <ChevronRightIcon class="h-6 w-6 text-gray-900" aria-hidden="true" />
                </button>
              </div> -->
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
          <!-- <div class="max-w-sm w-full overflow-hidden bg-white rounded-lg border border-gray-500">
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
          </div> -->
        </div>
      </main>
    </div>

    <div v-if="isPopupVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50" @click.self="hidePopup">
      <div class="bg-white rounded-lg overflow-hidden shadow-lg max-w-md w-full p-6">
        <h2 class="text-xl font-semibold text-gray-800 text-center">{{ t('popupTitle') }}</h2>
        <div class="flex justify-center items-center mt-4 h-64">
          <div v-if="!qrCode" class="loader"></div>
          <img v-if="qrCode" :src="qrCode" alt="QR Code" />
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
const kvkNumber = ref('90000001')
const qrCode = ref(null)
const sharedDetails = ref(null)
const loading = ref(false)


const showPopup = async () => {
  isPopupVisible.value = true
  loading.value = true
  await fetchQRCode();
  await fetchSharedDetails();
  loading.value = false
}

const hidePopup = () => {
  isPopupVisible.value = false
}

const hideErrorPopup = () => {
  isErrorVisible.value = false
}

const fetchQRCode = async () => {
  try {
    const qrResponse = await fetch('http://localhost:8000/qr');
    const qrBlob = await qrResponse.blob();
    qrCode.value = URL.createObjectURL(qrBlob);
  } catch (error) {
    console.error('Error fetching QR code:', error);
  }
}

const fetchSharedDetails = async () => {
  const startTime = Date.now();
  const timeout = 60000; // 60 seconds
  const interval = 2000; // 0.5 seconds

  while (Date.now() - startTime < timeout) {
    try {
      const detailsResponse = await fetch('http://localhost:8000/shared_details');
      if (detailsResponse.ok) {
        sharedDetails.value = await detailsResponse.json();
        console.log('Shared details:', sharedDetails.value);
        await goToPortal(); 
        return;
      }
    } catch (error) {
      console.error('Error fetching shared details:', error);
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  console.error('Failed to fetch shared details within the timeout period.');
}

const goToPortal = async () => {
  isPopupVisible.value = false
  const birth_date = sharedDetails.value.birth_date.replace(/[^0-9-]/g, '');

  // Remove any occurrences of "1004"
  const cleaned_birth_date = birth_date.replace(/1004/g, '');

  // Assuming the birth_date is in the format YYYY-MM-DD
  const [year, month, day] = cleaned_birth_date.split('-');

  // Format the date as DD-MM-YYYY
  const birthdateFormatted = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;

  console.log(birthdateFormatted);


  try {
    const response = await fetch(`http://localhost:3333/api/bevoegdheid/${kvkNumber.value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        geslachtsnaam: sharedDetails.value.family_name,
        voornamen: sharedDetails.value.given_name,
        geboortedatum: birthdateFormatted,
        voorvoegselGeslachtsnaam: ""
      })
    })
    

    if (response.ok) {
      const companyCertificateResponse = await fetch(`http://localhost:3333/api/company-certificate/${kvkNumber.value}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          geslachtsnaam: sharedDetails.value.family_name,
          voornamen: sharedDetails.value.given_name,
          geboortedatum: birthdateFormatted,
          voorvoegselGeslachtsnaam: ""
        })
      })
      const data = await response.json();
      const dataCompanyCertificate = await companyCertificateResponse.json(); // Assume the response is in JSON format
      const postResponse = await fetch(`http://127.0.0.1:8000/${kvkNumber.value}/store_company_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCompanyCertificate)
      });

      if (postResponse.ok) {
        console.log('Data successfully stored on the backend.');
      } else {
        console.error('Failed to store data on the backend.');
      }
      router.push({ path: '/portal', query: { kvkNumber: kvkNumber.value } })
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
.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
