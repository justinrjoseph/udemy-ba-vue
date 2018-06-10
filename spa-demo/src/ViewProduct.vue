<template>
  <div>
    <p>
      <strong>ID:</strong> {{ product.id }}
    </p>

    <p>
      <strong>Price:</strong> {{ product.price - discount | currency }}
      <span v-if="discount > 0">(save {{ discount | currency }})</span>
    </p>

    <p>
      <strong>In Stock:</strong> {{ product.inStock }}
    </p>

    <p>{{ product.description }}</p>
  </div>
</template>

<script>
  import products from './data/products';

  export default {
    props: {
      id: {
        required: true
      }
    },
    data() {
      return {
        products,
        product: null,
        discount: 0
      };
    },
    methods: {
      getProduct(id) {
        return this.products.find((product) => product.id === id);
      },
      calculateDiscount(originalPrice, percentage) {
        if ( !percentage ) {
          return 0;
        }

        return (originalPrice * percentage) / 100;
      }
    },
    created() {
      // let productId = this.$route.params.id;
      this.product = this.getProduct(this.id);

      if ( typeof this.$route.query.discount ) {
        this.discount = this.calculateDiscount(
          this.product.price, this.$route.query.discount
        );
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.discount = this.calculateDiscount(
        this.product.price, to.query.discount
      );

      this.product = this.getProduct(to.params.id);

      next();
    }
  }
</script>
