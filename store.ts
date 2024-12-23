import { axiosDefault } from "@/plugins/axios";
import type { PagedResponse, SearchQuery } from "@/types";
import type { Options, Property, Supplier } from "@/types/supplier";
import { removeEmptyField } from "@/utils/formatters";

export const useSupplierStore = defineStore("supplier-store", () => {
  const loading: Ref<boolean> = ref(false);

  // /Supplier/GetSuppliers
  const getSuppliers = async (): Promise<Supplier[]> => {
    loading.value = true;
    try {
      const { data } = await axiosDefault.get<Supplier[]>(
          "/Supplier/GetSuppliers"
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  // /Supplier/GetProperties/{supplierId}
  const GetProperties = async (
      supplierId: string,
      searchQuery: SearchQuery
  ): Promise<PagedResponse<Property, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<PagedResponse<Property, string>>(
          `/Supplier/GetProperties/${supplierId}`,
          { params: params }
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  // /Supplier/GetOptions/{supplierId}
  const GetOptions = async (
      supplierId: string,
      searchQuery: SearchQuery
  ): Promise<PagedResponse<Options, string>> => {
    loading.value = true;
    const params = removeEmptyField(searchQuery);
    try {
      const { data } = await axiosDefault.get<PagedResponse<Options, string>>(
          `/Supplier/GetOptions/${supplierId}`,
          { params: params }
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    getSuppliers,
    GetProperties,
    GetOptions,
  };
});
