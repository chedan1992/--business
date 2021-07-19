<template>
	<view class="content">
		<view class="flex-between borderb pd-30 bg-white">
			<view class="f30 bold">平台订单号：123456789123</view>
			<view class="f30 colorFF6E44">待审核</view>
		</view>
		<view class="pd-30 bg-white">
			<view class="f26 pdb-30">订单时间：2021-04-26 14:00</view>
			<view class="f26 pdb-30">外卖订单号：12345678912345678</view>
			<view class="f26 pdb-30">外卖支付金额：25元</view>
			<view class="f26">外卖平台：美团</view>
		</view>
		<view class="pd-30 bg-white f30 bold mgt-20 borderb">
			活动信息
		</view>
		<view class="pd-30 bg-white active">
			<view class="status">
				<image src="/static/order/feihuiyuan.png" class="img"></image>
			</view>
			<view class="flex item">
				<view class="w120 h120 pdr-20 flex-center">
					<image src="../../../main/packages/static/shop/logo.png" class="w120 h120"></image>
				</view>
				<view class="wordW2">
					<view class="f30 mgb-10 wordW">东门高端料理，东门高端料理，宝宝们入股不亏</view>
					<view class="flex-center">
						<view class="wordW2 f24 color666">五星好评，20字以上，2-4张图片（记得上传到 小程序）</view>
					</view>
				</view>
			</view>
			<view class="f26 mgt-20 colorFF6E44 flex-center">
				<view class="borderr pdr-30">满30减20</view>
				<view>
					<image src="/static/order/phone.png" class="w21 h26 mgl-30"></image>
				</view>
			</view>
		</view>
		<view class="pd-30 bg-white f30 bold mgt-20 borderb">
			审核信息
		</view>
		<view class="pd-30 flex flex-wrap imgs bg-white">
			<view class="width3">
				<image class="img" src="../../../main/packages/static/shop/logo.png"></image>
			</view>
			<view class="width3">
				<image class="img" src="../../../main/packages/static/shop/logo.png"></image>
			</view>
			<view class="width3">
				<image class="img" src="../../../main/packages/static/shop/logo.png"></image>
			</view>
			<view class="width3">
				<image class="img" src="../../../main/packages/static/shop/logo.png"></image>
			</view>
		</view>
		<view class="pd-30 bg-white f30 bold mgt-20 borderb">
			审核记录
		</view>
		<view class="pd-30 bg-white">
			<view class="pdb-20">
				<view class="f26 lh40">2021-04-26 12:00</view>
				<view class="f26 lh40">图片不清晰图片不清晰</view>
			</view>
			<view class="pdb-20">
				<view class="f26 lh40">2021-04-26 12:00</view>
				<view class="f26 lh40">图片不清晰图片不清晰</view>
			</view>
			<view class="pdb-20">
				<view class="f26 lh40">2021-04-26 12:00</view>
				<view class="f26 lh40">图片不清晰图片不清晰</view>
			</view>
			<view class="pdb-20">
				<view class="f26 lh40">2021-04-26 12:00</view>
				<view class="f26 lh40">图片不清晰图片不清晰</view>
			</view>
			<view>
				<view class="f26 lh40">2021-04-26 12:00</view>
				<view class="f26 lh40">图片不清晰图片不清晰</view>
			</view>
		</view>
		<view class="fixed bottom0 pdt-20 pdb-20 bg-white dflex box">
			<view class="pdr-20 pdl-20">
				<button class="btn bg-white block h80 lh80">拒绝</button>
			</view>
			<view class="pdr-20">
				<button class="btn bg-FF6E44 colorfff block h80 lh80">通过</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				key: ''
			}
		},
		onReady() {

		},
		methods: {}
	}
</script>

<style lang="scss">
	.content {
		padding: 0;
		padding-bottom: 150rpx;

		.active {
			position: relative;

			.status {
				left: 0px;
				top: 0px;
				position: absolute;
				z-index: 11;

				.img {
					height: 100rpx;
					width: 100rpx;
				}
			}

			.item {

				.w120 {
					width: 120rpx;
				}

				.h120 {
					height: 120rpx;
				}
			}
		}

		.imgs {
			.width3 {
				width: calc(100% / 3);
				margin-bottom: 20rpx;

				.img {
					width: 200rpx;
					height: 200rpx;
				}
			}
		}
	}
</style>
