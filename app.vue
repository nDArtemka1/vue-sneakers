<script setup>
import { ref, onMounted, watch, reactive, provide } from 'vue';
import axios from 'axios';

const items = ref([]);

const cart = ref([]);

const drawerOpen = ref(false);

const openDrawer = () => {
	drawerOpen.value = true;
};

const closeDrawer = () => {
	drawerOpen.value = false;
};

const filters = reactive({
	sortBy: 'title',
	searchQuery: '',
});

const addToCart = item => {
	cart.value.push(item);
	item.isAdded = true;
};

const removeFromCart = item => {
	cart.value.splice(cart.value.indexOf(item), 1);
	item.isAdded = false;
};

const onClickAddPlus = item => {
	if (!item.isAdded) {
		addToCart(item);
	} else {
		removeFromCart(item);
	}
	console.log(cart);
};

const onChangeSelect = event => {
	filters.sortBy = event.target.value;
};

const onChangeSearchInput = event => {
	filters.searchQuery = event.target.value;
};

const addToFavorite = async item => {
	try {
		if (!item.isFavorite) {
			const obj = {
				parentId: item.id,
			};
			item.isFavorite = true;

			const { data } = await axios.post(
				`https://a48a66e7382f1f01.mokky.dev/favorites`,
				obj
			);

			item.favoriteId = data.id;
		} else {
			item.isFavorite = false;
			await axios.delete(
				`https://a48a66e7382f1f01.mokky.dev/favorites/${item.favoriteId}`
			);
			item.favoriteId = null;
		}
	} catch (err) {
		console.log(err);
	}
};

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get(
			`https://a48a66e7382f1f01.mokky.dev/favorites`
		);
		items.value = items.value.map(item => {
			const favorite = favorites.find(
				favorite => favorite.parentId === item.id
			);

			if (!favorite) {
				return item;
			}

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id,
			};
		});
	} catch (err) {
		console.log(err);
	}
};

const fetchItems = async () => {
	try {
		const params = { sortBy: filters.sortBy };

		if (filters.searchQuery) {
			params.title = `*${filters.searchQuery}*`;
		}

		const { data } = await axios.get(
			`https://a48a66e7382f1f01.mokky.dev/items`,
			{
				params,
			}
		);
		items.value = data.map(obj => ({
			...obj,
			isFavorite: false,
			favoriteId: null,
			isAdded: false,
		}));
	} catch (err) {
		console.log(err);
	}
};
 
onMounted(async () => {
	await fetchItems();
	await fetchFavorites();
});

watch(filters, fetchItems);

provide('cart', {
	cart,
	closeDrawer,
	openDrawer,
	addToCart,
	removeFromCart,
});
</script>

<template>
	<Drawer v-if="drawerOpen" />
	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-10 mb-10">
		<Header @open-drawer="openDrawer" />

		<div class="p-10">
			<div class="flex justify-between items-center mb-10">
				<h2 class="text-3xl font-bold">Все кроссовки</h2>

				<div class="flex gap-4">
					<select
						@change="onChangeSelect"
						class="py-2 px-3 border rounded-md outline-none"
					>
						<option value="name">По названию</option>
						<option value="price">По цене (дешевые)</option>
						<option value="-price">По цене (дорогие)</option>
					</select>

					<div class="relative">
						<img class="absolute left-4 top-3" src="/search.svg" alt="" />
						<input
							@input="onChangeSearchInput"
							class="border rounded-md py-2 pl-12 pr-4 outline-none focus:border-gray-400"
							placeholder="Поиск..."
						/>
					</div>
				</div>
			</div>

			<CardList
				:items="items"
				@add-to-favorite="addToFavorite"
				@add-to-cart="onClickAddPlus"
			/>
		</div>

		<div>
			<p v-if="loading">Loading...</p>
			<p v-else-if="error">{{ error }}</p>
			<ul v-else>
				<li v-for="(obj, index) in datab" :key="index">{{ JSON.stringify(obj) }}</li>
			</ul>
		</div>
	</div>
</template>
