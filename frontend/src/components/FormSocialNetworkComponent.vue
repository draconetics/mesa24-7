<template>
	<b-row align-h="center">
		<h4>
			¿No quieres completar el formulario?
		</h4>
		<p>
			Regístrate rápida y fácilmente utilizando una de tus redes sociales
		</p>
		<b-col >
			<b-img class="m-1" :src="require('@/assets/facebook.jpg')"></b-img>
			<b-img class="m-1" :src="require('@/assets/google.jpg')"></b-img>
		</b-col>
	</b-row>
</template>
<script>
export default {
	name: 'FormSocialNetwork',
}
</script>