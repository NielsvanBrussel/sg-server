<script>
</script>


<div class="container">
	<div class="sliding-background1"></div>
	<div class="sliding-background2"></div>
	<div class="sliding-background3"></div>
	<div class="sliding-background4"></div>
</div>


<style>
	.container {
		overflow: hidden;
		width: 100%;
		margin: 0rem auto;
		height: 90vh;
		width: 90vw;
		position: relative;
		background-color: #38aac7;
		background-image: url("../assets/img/sun.png");
		background-repeat: no-repeat;
		z-index: -5;
	}

	.sliding-background1, .sliding-background2, .sliding-background3, .sliding-background4  {
		position: absolute;
		background-repeat: repeat-x;
		background-size: 900vh 90vh;
		height: 90vh;
		width: 2700vh;
		margin: auto;
	}

	.sliding-background1 {
		background-image: url("../assets/img/layer1.png");
		animation: slide-left 60s linear infinite;
		z-index: -2;
	}

	.sliding-background2 {
		background-image: url("../assets/img/layer2.png");
		animation: slide-left 120s linear infinite;
		z-index: -3;
	}


	.sliding-background3 {
		background-image: url("../assets/img/layer3.png");
		animation: slide-right 20s linear infinite;
		z-index: -4;
	}

	.sliding-background4 {
		background-image: url("../assets/img/layer4.png");
		animation: slide-left 10s linear infinite;
		z-index: -1;
	}

	@keyframes slide-left{
	0% {
		transform: translate3d(0, 0, 0);
	}
	100% {
		transform: translate3d(-900vh, 0, 0);
	}
	}

	@keyframes slide-right{
	0% {
		transform: translate3d(-900vh, 0, 0);
	}
	100% {
		transform: translate3d(0, 0, 0);
	}
	}
</style>
