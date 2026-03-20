<template>
    <VSlideYTransition class="py-0" tag="v-row" group>
    <VRow
      v-for="(etsyListing, index) in mergeListings"
      :key="etsyListing.listingId"
    >
      <VCol cols="12">
        <VDivider v-if="index !== 0"></VDivider>
      </VCol>
      <VCol cols="1">
        <VImg
          v-if="etsyListing.imageUrl"
          :src="etsyListing.imageUrl"
          alt="Image"
          class="cursor-pointer"
          @click="lity(etsyListing.imageUrl)"
        ></VImg>
      </VCol>
      <VCol>
        <a
          :href="etsyListing.url"
          target="_blank"
          rel="noopener noreferrer"
          >{{ etsyListing.title }}</a
        >
      </VCol>
      <VCol cols="2">{{ etsyListing.price }}</VCol>
      <VCol cols="2">{{ etsyListing.quantity }}</VCol>
      <VCol cols="1">
        <VBtn
          icon="ri-close-line"
          variant="text"
          color="secondary"
          @click="handleRemove(etsyListing.listingId)"
        ></VBtn>
      </VCol>
    </VRow>
  </VSlideYTransition>
</template>