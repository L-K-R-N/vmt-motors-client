export function parseJwt(token: string) {
   if (!token) return;
   let base64Url = token.split('.')[1];

   if (base64Url) {
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      let jsonPayload = decodeURIComponent(
         window
            .atob(base64)
            .split('')
            .map(function (c) {
               return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(''),
      );
      return JSON.parse(jsonPayload);
   }

   return undefined;
}
