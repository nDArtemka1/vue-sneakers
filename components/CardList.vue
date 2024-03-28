<script setup>
defineProps({ items: Array });

const emit = defineEmits(['addToFavorite', 'addToCart']);
</script>

<template>
	<div class="grid grid-cols-4 gap-5">
		<Card
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:image-url="item.imageUrl"
			:title="item.title"
			:price="item.price"
			:onClickAdd="() => emit('addToCart', item)"
			:onClickFavorite="() => emit('addToFavorite', item)"
			:isFavorite="item.isFavorite"
			:isAdded="item.isAdded"
		/>
	</div>
</template>
