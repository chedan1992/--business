<template>
	<view>
		<image class="empty__image" :src="emptyUrl" v-if="emptyUrl"></image>
		<view class="empty__text" v-if="emptyText">{{emptyText}}</view>
		<slot name="emptyUrl" v-if="!emptyUrl"></slot>
		<slot name="emptyText" v-if="!emptyText"></slot>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
			}
		},
		props: {
			emptyText: {
				type: String,
				default: ''
			},
			emptyUrl: {
				type: String,
				default: ''
			}
		},
		created() {
		},
		computed: {},
		beforeDestroy() {
		},
		methods: {
			
		}
	}
</script>

<style>
	.empty__image{
		
	}
	.empty__text{
		
	}
</style>
