import { defineStore } from 'pinia';
import { useHttpService } from '../composables';
import type { Category, Payload, Product, PageServerResponse, CartProduct } from '@/models';

const initialState = {
  loading: <boolean>false,
  cartProducts: <CartProduct[]>[],
};

const store = defineStore('category', {
  state: () => {
    return { ...initialState };
  },
  getters: {
    getCartProductsCount(): number {
      let count = 0;
      if (this.cartProducts.length) {
        this.cartProducts.forEach((item) => {
          count += item.quantity;
        });
      }
      return count;
    },
    getCartProductsTotalPrice(): number {
      let price = 0;
      if (this.cartProducts.length) {
        this.cartProducts.forEach((item) => {
          price += item.totalPrice;
        });
      }
      return price;
    },
  },
  actions: {
    addProductToCart(product: Product) {
      const cartProduct = this.cartProducts.find((item) => item.id === product.id);
      if (cartProduct) {
        cartProduct.quantity += 1;
        cartProduct.totalPrice = this.calculateTotalPrice(product, cartProduct.quantity);
      } else {
        this.cartProducts.push({ ...product, quantity: 1, totalPrice: product.price });
      }
      localStorage.setItem('shopCart', JSON.stringify(this.cartProducts));
    },
    calculateTotalPrice(product: Product, quantity: number): number {
      return product.price * quantity;
    },
    getCartFromLocalStorage() {
      const cart = localStorage.getItem('shopCart');
      if (cart) {
        this.cartProducts = JSON.parse(cart);
      }
    },
    increaseProductQuantity(cartProduct: CartProduct) {
      cartProduct.quantity += 1;
      cartProduct.totalPrice = this.calculateTotalPrice(cartProduct, cartProduct.quantity);
      localStorage.setItem('shopCart', JSON.stringify(this.cartProducts));
    },
    decreaseProductQuantity(cartProduct: CartProduct) {
      cartProduct.quantity -= 1;
      if (cartProduct.quantity === 0) {
        this.removeProductFromCart(cartProduct);
        return;
      }
      cartProduct.totalPrice = this.calculateTotalPrice(cartProduct, cartProduct.quantity);
      localStorage.setItem('shopCart', JSON.stringify(this.cartProducts));
    },
    removeProductFromCart(cartProduct: CartProduct) {
      this.cartProducts = this.cartProducts.filter((product) => product.id !== cartProduct.id);
      localStorage.setItem('shopCart', JSON.stringify(this.cartProducts));
    },
    clearCart() {
      this.cartProducts = [];
      localStorage.removeItem('shopCart');
    },
    async getCategories() {
      this.loading = true;
      try {
        const response = await useHttpService().get<PageServerResponse<Category[]>>('/categories');
        if (response.error) {
          throw response.error.error;
        }
        return response.data?.items;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async getProducts(categories: Record<string, any>) {
      this.loading = true;
      try {
        const response = await useHttpService().get<PageServerResponse<Product[]>>('/products', categories as Payload);
        if (response.error) {
          throw response.error.error;
        }
        return response.data?.items;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
    async getProduct(productId: string) {
      this.loading = true;
      try {
        const response = await useHttpService().get<Product>(`/products/${productId}`);
        if (response.error) {
          throw response.error.error;
        }
        return response.data;
      } catch (e: any) {
        throw { ...e };
      } finally {
        this.loading = false;
      }
    },
  },
});

export default store;
