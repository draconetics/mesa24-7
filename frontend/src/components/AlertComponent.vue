<template>
	<b-alert 
	:show="dismissCountDown"
	dismissible
	variant="danger"
	@dismissed="dismissCountDown=0"
	@dismiss-count-down="countDownChanged">
 		{{message}}
    </b-alert>
</template>
<script type="text/javascript">

import { mapActions } from 'vuex';

export default {
	name:'AlertComponent',
	data:()=>({
		dismissCountDown:0
	}),
	props: {
		message:String,
		type: {
			type:String,
			default: 'danger'
		}
	},
	methods: {
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
			//console.log(dismissCountDown);
			if(dismissCountDown == 0)
				this.resetError(null);
		},
		...mapActions({
			resetError: 'resetError'
		}),
	},
	watch: {
    	message: {
			immediate: true,
			deep: true,
			handler(newValue, oldValue) {
				//console.log(newValue, oldValue);
      			//console.log("variables is changing");
      			this.dismissCountDown = 10;
			},
		}
  	}

}
</script>