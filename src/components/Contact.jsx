import React from "react";

const Contact=()=>{
return(
    <div class="relative py-20 md:py-32 overflow-hidden">
  <div class="relative container px-4 mx-auto">
    <div class="max-w-2xl mx-auto mb-18 text-center">
      <span class="inline-block py-2 px-4 mb-4 text-sm font-semibold text-black bg-blue-100 rounded-full">READY TO SUPPORT</span>
      <h1 class="text-4xl md:text-5xl xs:text-6xl font-bold text-gray-900 mb-4">
        <span>Anything unclear or need help?</span>
      </h1>
      <p class="md:text-xl my-6 text-gray-500 font-semibold">Relax, we are ready to support 24/7 for you</p>
    </div>
    <div class="flex flex-wrap justify-center -mx-4 mt-16">
      <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10 mb-10 md:mb-0">
        <div class="max-w-sm mx-auto py-8 px-6 bg-white border border-gray-200 rounded-5xl">
          <div class="max-w-2xs mx-auto text-center">
            <img class="block mx-auto mb-3" src="saturn-assets/images/contact/icon-orange-email.svg" alt="" />
            <h5 class="text-2xl font-bold text-gray-900 mb-3">Contact Us</h5>
            <p class="text-gray-500 mb-3">Contact us to seek help from us, we will help you as soon as possible</p>
            <span class="block text-lg font-semibold text-blue-500 mb-8">+91 7057630401</span>
        
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 lg:w-auto px-4 xl:px-10">
        <div class="max-w-sm mx-auto  py-8 px-6 bg-white border border-gray-200 rounded-5xl">
          <div class="max-w-2xs mx-auto text-center">
            <img class="block mx-auto mb-3" src="saturn-assets/images/contact/icon-orange-headphones.svg" alt="" />
            <h5 class="text-2xl font-bold text-gray-900 mb-3">Customer Service</h5>
            <p class="text-gray-500 mb-3">Contact us to seek help from us, we will help you as soon as possible</p>
            <span class="block text-lg font-semibold text-blue-500 mb-8">crypstat@customercare.com </span>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
}
export default Contact;
