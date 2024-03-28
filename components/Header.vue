<script setup>
const emit = defineEmits(['openDrawer']);
</script>
<template>
	<header class="flex justify-between border-b border-slate-300 px-10 py-6">
		<div class="flex items-center gap-4">
			<NuxtImg src="/logo.png" alt="Logo" class="w-10" />
			<div class="">
				<h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
				<p class="text-slate-400">Магазин лучших кроссовок</p>
			</div>
		</div>

		<ul class="flex items-center gap-10">
			<li
				@click="() => emit('openDrawer')"
				class="flex items-center cursor-pointer gap-3 text-gray-600 hover:text-black"
			>
				<NuxtImg src="/cart.svg" alt="Cart" class="w-5" />
				<b>1205 руб.</b>
			</li>

			<li
				class="flex items-center cursor-pointer gap-3 text-gray-600 hover:text-black"
			>
				<NuxtImg src="/heart.svg" alt="Heart" class="w-5" />
				<span>Закладки</span>
			</li>

			<li
				class="flex items-center cursor-pointer gap-3 text-gray-600 hover:text-black"
			>
				<NuxtImg src="/profile.svg" alt="Profile" class="w-5" />
				<span>Профиль</span>
			</li>
		</ul>
	</header>
</template>
