<script setup>
import { inject } from 'vue';

const { cart, removeFromCart } = inject('cart');
</script>

<template>
	<div class="flex flex-col flex-1 gap-4">
		<CartItem
			v-for="item in cart"
			:key="item.id"
			:title="item.title"
			:image-url="item.imageUrl"
			:price="item.price"
			@on-click-remove="() => removeFromCart(item)"
		/>
	</div>
</template>
