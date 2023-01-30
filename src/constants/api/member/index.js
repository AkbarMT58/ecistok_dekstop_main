import callAPI from 'configs/axios';

const baseUrl = `${process.env.API_GATEWAY}/oci`;
const baseUrlVersion = `${process.env.API_GATEWAY}`;

// WISHLIST
export async function getWishlist() {
  const url = `${baseUrl}/orders/wishlist`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function addWishlist(data) {
  const url = `${baseUrl}/orders/wishlist`;

  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function removeWishlist(id, toko) {
  const url = `${baseUrl}/orders/wishlist/${toko}/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

// INQUIRY

export async function getInquiryCalculate() {
  const url = `${baseUrl}/orders/inquiry`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getInquiryCanceled() {
  const url = `${baseUrl}/orders/inquiry/canceled`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function resubmissionInquiryCanceled(data) {
  const url = `${baseUrl}/orders/inquiry/canceled`;

  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function removeInquiry(id) {
  const url = `${baseUrl}/orders/inquiry/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

export async function getInquiryPayment() {
  const url = `${baseUrl}/orders/cart`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function addInquiry(data) {
  const url = `${baseUrl}/orders/inquiry`;

  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function updateInquiry(data) {
  const url = `${baseUrl}/orders/cart`;

  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}

export async function addCart(data) {
  const url = `${baseUrl}/orders/cart`;

  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function removeCart(id) {
  const url = `${baseUrl}/orders/cart/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

// ADDRESS

export async function getAddress() {
  const url = `${baseUrl}/customer/alamat`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function addAddress(data) {
  const url = `${baseUrl}/customer/alamat`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function editAddress(data) {
  const url = `${baseUrl}/customer/alamat`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}

export async function getKecamatan(id) {
  const url = `${baseUrl}/rajaongkir/subdistrict/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function removeAddress(id) {
  const url = `${baseUrl}/customer/alamat/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

export async function getCheckout(id) {
  const url = `${baseUrl}/checkout/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getVoucher(value) {
  const url = `${baseUrl}/voucher/${value}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getCourier(id, weight) {
  const url = `${baseUrl}/rajaongkir/courier?id=${id}&courier=all&weight=${weight}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function postCheckout(data) {
  const url = `${baseUrl}/checkout`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function getPayment(id) {
  const url = `${baseUrl}/pembayaran/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getOtpCreditCard(data) {
  const url = `${baseUrl}/pembayaran/creditcard/otp`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function getOtpCreditCardXendit(data) {
  const url = `${baseUrl}/pembayaran/creditcard/xendit`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function paymentGopay(data) {
  const url = `${baseUrl}/pembayaran/gopay`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function paymentShopeepay(data) {
  const url = `${baseUrl}/pembayaran/shopee`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function getMyOrders(type, page) {
  const url = `${baseUrl}/orders/list-orders/${type}/${page}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getTracking(id) {
  const url = `${baseUrl}/orders/tracking/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function paymentAlfamart(data) {
  const url = `${baseUrl}/pembayaran/alfamart`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function paymentVA(data) {
  const url = `${baseUrl}/pembayaran/bank_transfer`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function adjustment(param) {
  const url = `${baseUrl}/adjustment/${param}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function cancelAdjustment(id) {
  const url = `${baseUrl}/adjustment/cancel/${id}`;
  return callAPI({
    url,
    method: 'PUT',
    token: true,
  });
}

export async function getRefund() {
  const url = `${baseUrl}/orders/refund`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function refund(data) {
  const url = `${baseUrl}/orders/refund`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function refundOrder(data) {
  const url = `${baseUrl}/orders/refund`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function profile() {
  const url = `${baseUrl}/profile`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function updateProfile(data) {
  const url = `${baseUrl}/profile/edit`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}

export async function changePassword(data) {
  const url = `${baseUrl}/profile/edit-password`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}

export async function signUp(data) {
  const url = `${process.env.API_GATEWAY}/auth/register`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function getTrackingRegister(utm_source, utm_medium, utm_id) {
  const url = `${process.env.API_GATEWAY}/tracking?utm_source=${utm_source}&utm_medium=${utm_medium}&utm_id=${utm_id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function verifyAccount(data) {
  const url = `${process.env.API_GATEWAY}/auth/validation-otp`;
  return callAPI({
    url,
    data,
    method: 'POST',
  });
}

export async function verifyOTPCode(data) {
  const url = `${process.env.API_GATEWAY}/oci/customer/validate`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function validateUsingWhatsapp() {
  const url = `${process.env.API_GATEWAY}/oci/customer/sendwhatsapp`;
  return callAPI({
    url,
    method: 'POST',
    token: true,
  });
}

export async function validateUsingWhatsappForgotPassword(data) {
  const url = `${process.env.API_GATEWAY}/oci/customer/sendwhatsapp/reset`;
  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function postForgetPassword(data) {
  const url = `${process.env.API_GATEWAY}/auth/send-reset-email`;
  return callAPI({
    url,
    data,
    method: 'POST',
  });
}

export async function postValidatePhone(data) {
  const url = `${process.env.API_GATEWAY}/oci/customer/phonevalidation`;
  return callAPI({
    url,
    data,
    method: 'POST',
  });
}

export async function newPassword(data) {
  const url = `${process.env.API_GATEWAY}/auth/forget-password`;
  return callAPI({
    url,
    data,
    method: 'PUT',
  });
}

export async function postVerifiedAccount() {
  const url = `${process.env.API_GATEWAY}/auth/otp`;

  return callAPI({
    url,
    method: 'POST',
    token: true,
  });
}

export async function addRequestProduct(data) {
  const url = `${baseUrl}/orders/inquiry/image`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function paymentQris(data) {
  const url = `${baseUrl}/pembayaran/qris`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

// Raja Ongkir
export async function getProvince() {
  const url = `${baseUrl}/rajaongkir/province`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getCity(params) {
  const url = `${baseUrl}/rajaongkir/city/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getSubdistrict(params) {
  const url = `${baseUrl}/rajaongkir/subdistrict/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getListCourier(id, courier, weight) {
  const url = `${baseUrl}/rajaongkir/courier?id=${id}&courier=${courier}&weight=${weight}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getComment(id) {
  const url = `${baseUrl}/notes/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function postComment(data) {
  const url = `${baseUrl}/notes`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

// FirstPopup
export async function getFirstTimeCustomer(data) {
  const url = `${baseUrl}/first-time-customer`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}

// Catalog

export async function getlistCatalog() {
  const url = `${baseUrl}/catalog/catalog-product`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getListDetailsCatalog(params) {
  const url = `${baseUrl}/catalog/catalog-product/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

// Register
export async function sendCodeOTP(data) {
  const url = `${baseUrlVersion}/v1/oci/customer/sendwhatsapp`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

export async function NewSignUp(data) {
  const url = `${process.env.API_GATEWAY}/v1/auth/register`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: true,
  });
}

// Banner Tracking
export async function getTrackingOctf() {
  const url = `${baseUrl}/tracking-octf`;
  return callAPI({
    url,
    method: 'GET',
    token: false,
  });
}

export async function getTracingFromEmail(params) {
  const url = `${baseUrl}/tracking-octf/redirect?email=${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: false,
  });
}
