new Vue({
	el: "#app",
	data: {
		isShowingCart: false,
		cart: {
			items: []
		},
		products: [
			{
				id: 1,
				name: 'mac book Pro (15 inch)',
				description: 'This laptop has a super crisp retina display, Yes, we know it\'s overpriced...',
				price: 2999,
				inStock: 50,
				img: 'img1.jpg'
			},
			{
				id: 2,
				name: 'samsung 7',
				description: 'unlike the macBook, it is not overpriced, it\'s features are second to none.',
				price: 755,
				inStock: 27,
				img: 'img2.jpg'
			},
			{
				id: 3,
				name: 'HP officejet',
				description: 'This one may not last that long, but hey, printers never really work',
				price: 49,
				inStock: 5,
				img: 'img3.jpg'
			},
			{
				id: 4,
				name: 'iphone 7 cover',
				description: 'Ever thought of dropping that phone, huh? why not get this cover that perfectly suits this beauty',
				price: 49,
				inStock: 42,
				img: 'img4.jpg'
			},
			{
				id: 5,
				name: 'ipad pro (9.7 inch)',
				description: 'we exprect it to be pretty good, atleast thats what they said',
				price: 599,
				inStock: 0,
				img: 'img7.jpg'
			},
			{
				id: 6,
				name: 'OnePlus 3 cover',
				description: 'This is the cover that suits that smartphone that is always on the ground',
				price: 19,
				inStock: 81,
				img: 'img6.jpg'
			},

			
		]
	},
	filters: {
		currency: function(value){

			return "$" + value;	
		}
	},
	methods: {
		addProductToCart: function(product){

			var item = this.getItem(product);
			if(item != null){
				item.quantity++;
			}
			else{
				this.cart.items.push({
				product: product,
				quantity: 1
				});
			}
			
			product.inStock--;
		},
		getItem: function(product){
			for(var x = 0; x < this.cart.items.length; x++){
				if (this.cart.items[x].product.id === product.id){
					return this.cart.items[x];
				}
			}
			return null;
		},
		increaseCartQuantity: function(item){
			item.quantity++;
			item.product.inStock--;

		},
		decreaseCartQuantity: function(item){
			item.quantity--;
			item.product.inStock++;
			if(item.quantity == 0){
				//var i = this.cart.items.indexOf(item);
				this.removeCartItem(item);
			}
		},
		removeCartItem: function(item){
			var index = this.cart.items.indexOf(item);
			if(index != -1){
				this.cart.items.splice(index, 1);
			}
		},
		checkout: function(){
			if(confirm("Are you sure you want to checkout")){
				this.cart.items.forEach(function(item){
					item.product.inStock += item.quantity;
				});

				this.cart.items = [];
			}
			
		}
	},
	computed: {
		cartTotal: function(){
			var total = 0;
			this.cart.items.forEach(function(item){
				total += item.product.price * item.quantity
			});

			return total;
		},
		taxAmount: function(){
			return (this.cartTotal * 10) / 100;
		}
	}
	
});