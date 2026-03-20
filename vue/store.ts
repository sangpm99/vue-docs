import { axiosDefault } from "@/plugins/axios";
import type { SearchQuery, Product } from "@/types/product-listing";
import { removeEmptyField } from "@/utils/formatters";
import type { PagedResponse } from '@/types'

export const useProductListingStore = defineStore("product-listing-store", () => {
  const loading: Ref<boolean> = ref(false);

  // /ProductListing/GetProducts
  const getProducts = async (searchQuery: SearchQuery): Promise<PagedResponse<Product, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<PagedResponse<Product, string>>(
        `/ProductListing/GetProducts`,
        { params: {params}, paramsSerializer: { indexes: true } }
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    getProducts,
  };
});
