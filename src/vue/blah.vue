<script setup lang="ts">

import { provide } from 'vue'
import { SaleorAuthClient } from "../SaleorAuthClient";

const props = defineProps<{
    client: SaleorAuthClient
}>()

provide('saleorAuthClient', props.client)

</script>

<template>
    <slot />
</template>
