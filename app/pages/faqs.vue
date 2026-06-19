<template>
  <div class="flex w-full mb-10 lg:px-20 px-4">
    <div class="container mx-auto w-full bg-white lg:px-10 px-2 pb-10 rounded-lg shadow-2xl">
      <h1 class="flex w-full lg:text-5xl text-2xl font-bold pt-4 mb-4">Kanunay Nga Mga Pangutana</h1>

      <div v-for="(item, i) in faqs" :key="i" class="mb-2">
        <button
          class="flex w-full justify-between items-center bg-green-600 text-white lg:px-4 px-2 py-3 cursor-pointer rounded-t-lg"
          @click="open = open === i ? -1 : i"
        >
          <span class="lg:text-2xl md:text-lg text-sm font-bold text-left">{{ item.title }}</span>
          <svg class="fill-current text-white transition-transform" :class="open === i ? 'rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z" /></svg>
        </button>
        <div v-show="open === i" class="px-4 py-4 border border-green-600">
          <p class="text-justify leading-loose text-gray-800" v-html="item.body" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(0)

const faqs = [
  {
    title: 'Koleksyon sa Impormasyon Ug Paggamit',
    body: `Samtang ginagamit ang among Serbisyo, mahimo ka namo nga hangyoon sa paghatag sa pipila ka personal nga impormasyon aron mailhan ka ug ang kasayuran nga mahimong magamit sa pagkontak o sa pag ila nimo. Ang kasayuran sa personal nga pag-ila ("Personal nga Impormasyon") mahimong maglakip, apan dili limitado sa:
      <ul class="pt-4 pl-6 list-disc">
        <li>Pangalan</li><li>Email address</li><li>Numero sa Telepono</li><li>Address</li>
      </ul>`
  },
  {
    title: 'Mga Accounts',
    body: `Sa pag himo ug account kanamo, kinahanglan nga ang mga impormasyon tukma, kumpleto ug "up-to-date" sa tanan nga mga panahon. Ang pagkapakyas sa pagbuhat sa ingon nahimo nga paglapas sa mga Termino, nga mahimong magresulta sa diha-diha nga pagtapos sa imong account. Ikaw ang responsable sa pagpanalipod sa password nga gigamit nimo aron ma-access ang Serbisyo. Miuyon ka nga dili ibutyag ang imong password sa bisan kinsa, ug pahibal-on kami dayon kung naay paglapas sa seguridad.`
  },
  {
    title: 'Paghatud',
    body: `Sa pagdeliver gikinahanglan nga tama ug sakto ang impormasyon nga imong gibutang sa Address. Ang "Pamalengke" mag pahibalo kanimo kung unsa na ang kasamtangan sa imong pinalit. Ang paghatud sa imong pinalit mudepende sa oras sa imong pag order.<br><br>
      <b>Oras sa paghatud</b><br>
      Oras sa pag order 12:00 a.m. – 11:59 a.m., Oras sa Paghatud 1:00 p.m. – 5:00 p.m.<br>
      Oras sa pag order 12:00 p.m. – 11:59 p.m., Oras sa Paghatud pagkaugma 9:00 a.m. – 12:00 p.m.`
  }
]
</script>
