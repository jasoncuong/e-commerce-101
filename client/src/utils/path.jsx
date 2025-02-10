const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: ":category",
  BLOGS: "blogs",
  OUR_SERVICE: "service",
  FAQ: "faqs",
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ":category/:pid/:title",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "resetpassword/:token",

  //ADMIN
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCT: "manage-product",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCT: "create-product",

  //MEMBER
  MEMBER: "member",
  PERSONAL: "personal",
};

export default path;
