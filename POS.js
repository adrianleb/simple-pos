// this is better as a class, but keeping it simple for the sake of simplicity

var Terminal = {
  init:function(){
    this.reset()
    this.setPricing()
  },

  reset:function(){
    this.total = 0;
    this.products = [];
  },

  setPricing: function(){
    this.productPricing = {
      "A": {
        name:'Doritos',
        price: 2.00,
        volumeCount:4,
        volumePrice: 7.00
      },
      "B": {
        name:'Something Expensive',
        price: 12.00,
        volumeCount:false,
        volumePrice: undefined
      },
      "C": {
        name:'Beer',
        price: 1.25,
        volumeCount:6,
        volumePrice: 6.00
      },
      "D": {
        name:'Candy',
        price: 0.15,
        volumeCount:false,
        volumePrice: undefined
      }
    }
  },

  scanProduct:function(productKey){
    this.products.push(productKey);
    this.updateTotalPrice()

  },

  updateTotalPrice:function(){
    var purchasedProducts = {}
    this.total = 0;

    for (var i = this.products.length - 1; i >= 0; i--) {
      // separate amounts based on product
      purchasedProducts[this.products[i]] = purchasedProducts[this.products[i]] ? purchasedProducts[this.products[i]] + 1 : 1
    };

    var purchasedProductKeys = Object.keys(purchasedProducts);
    for (var i = purchasedProductKeys.length - 1; i >= 0; i--) {
      var currentProductKey = purchasedProductKeys[i];
      var currentProduct = purchasedProducts[purchasedProductKeys[i]];
      var productPricing = this.productPricing[currentProductKey];
      var subTotal = 0

      if (productPricing.volumeCount) {
        // the bulk price
        subTotal += (parseInt(currentProduct / productPricing.volumeCount) * productPricing.volumePrice)
        // leftover items price
        subTotal += (currentProduct % productPricing.volumeCount) * productPricing.price

      } else {
        // just use the normal price
        subTotal = currentProduct * productPricing.price
      }
      this.total = this.total + subTotal;
    };


  }
}

Terminal.init()
