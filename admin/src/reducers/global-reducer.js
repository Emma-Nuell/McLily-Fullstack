import {
  CLEAR_GLOBAL_SEARCH,
  GLOBAL_SEARCH,
  SET_SEARCH_LOADING,
  SHOW_RESULTS,
} from "../actions";

const global_reducer = (state, action) => {
  if (action.type === SET_SEARCH_LOADING) {
    return { ...state, loading: action.payload };
  }
  if (action.type === GLOBAL_SEARCH) {
    const { products, orders, value } = action.payload;
    const searchTerm = value.toLowerCase();

    const matchingProducts = products.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const idMatch = product.productId.toString().includes(searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm);
      const subCategoryMatch = product.subCategory
        .toLowerCase()
        .includes(searchTerm);
      const priceMatch = product.price.toString().includes(searchTerm);
      const tagsMatch = product.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm)
      );

      return (
        nameMatch ||
        idMatch ||
        categoryMatch ||
        subCategoryMatch ||
        priceMatch ||
        tagsMatch
      );
    });

    const matchingOrders = orders.filter(order => {
      const orderIdMatch = order.orderId
        .toString()
        .toLowerCase()
        .includes(searchTerm);
      const customerNameMatch = order.customerDetails.name
        .toLowerCase()
        .includes(searchTerm);
      const customerPhoneMatch = order.customerDetails.phone
        .toLowerCase()
        .includes(searchTerm);
      const statusMatch = order.orderStatus.toLowerCase().includes(searchTerm);
      const orderDateMatch = order.orderedAt
        .toString()
        .toLowerCase()
        .includes(searchTerm);
      const subtotalMatch = order.subtotal.toString().includes(searchTerm);
      const productNameMatch = order.orderItems.some((item) =>
        item.productName.toLowerCase().includes(searchTerm)
      );

      return (
        orderIdMatch ||
        customerNameMatch ||
        customerPhoneMatch ||
        statusMatch ||
        orderDateMatch ||
        subtotalMatch ||
        productNameMatch
      );
    })

    return {
      ...state,
      results: { products: matchingProducts, orders: matchingOrders },
      searchTerm: searchTerm,
      hasSearched: true,
      loading: false,
    };
  }
  if (action.type === CLEAR_GLOBAL_SEARCH) {
    return {
      ...state,
      searchTerm: "",
      results: { products: [], orders: [] },
      hasSearched: false,
      showResults: false,
    };
  }
  if (action.type === SHOW_RESULTS) {
    return { ...state, showResults: action.payload };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default global_reducer;
