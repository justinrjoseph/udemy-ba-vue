<template>
  <div>
    <button
      class="btn btn-primary"
      @click="goBack()">
      &laquo; Back
    </button>

    <h1>{{ product.name }}</h1>

    <ul class="nav nav-pills">
      <router-link
        tag="li"
        class="presentation"
        active-clas="active"
        :to="{ name: 'viewProduct', params: { id: product.id } }">
        <a>Details</a>
      </router-link>
      <router-link
        tag="li"
        class="presentation"
        active-clas="active"
        :to="{ name: 'productReviews', params: { id: product.id } }">
        <a>Reviews</a>
      </router-link>
    </ul>

    <br>

    <router-view></router-view>

    <div v-if="relatedProducts.length">
      <h2>Related Products</h2>

      <ul>
        <li v-for="related in relatedProducts">
          <router-link
            :to="{ name: 'viewProduct', params: { id: related.id } }">
            {{ related.name }}
          </router-link>
        </li>
      </ul>
    </div>
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
        product: null
      };
    },
    methods: {
      getProduct(id) {
        return this.products.find((product) => product.id === id);
      },
      goBack() {
        // this.$router.push('/');
        this.$router.go(-1);
      }
    },
    computed: {
      relatedProducts() {
        if ( this.product === null ) {
          return [];
        }

        let related = [];
        let count = 0;

        this.products.forEach((product) => {
          if ( product.id != this.product.id && count < 5 ) {
            related.push(product);
            count++;
          }
        });

        return related;
      }
    },
    created() {
      // let productId = this.$route.params.id;

      this.product = this.getProduct(this.id);
    },
    watch: {
      id(newValue, oldValue) {
        this.product = this.getProduct(newValue);
      }
    }
  }
</script>
