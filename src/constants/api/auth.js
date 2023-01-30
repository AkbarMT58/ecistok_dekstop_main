import callAPI from "configs/axios";

// export async function setSignUp() {
//   const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

//   return callAPI({
//     url,
//     method: 'POST',
//     data,
//   });
// }

export async function setLogin(data) {
  const url = `${process.env.API_GATEWAY}/auth/login`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}
