<template>
	<svg class="svg"
		:width="width ? width : 32" 
		:height="height ? height : 32"
	>
		<path 
			:fill="color ? color : '#9291a6'"
		></path>
	</svg>
</template>

<script>

export default {
  name: 'svg',
  props: ['color', 'width', 'height'],
}

</script>
