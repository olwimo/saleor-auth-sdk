// import { useState, useEffect } from "react";
import { ref, watchEffect } from "vue";
import { SaleorExternalAuth } from "../SaleorExternalAuth";
import { ExternalProvider } from "../types";

export type SaleorExternalAuthState =
  | { loading: true; authURL?: undefined; error?: undefined }
  | { loading: false; authURL: string; error?: undefined }
  | { loading: false; authURL?: undefined; error: unknown };

export const useSaleorExternalAuth = ({
  saleorURL,
  provider,
  redirectURL,
}: {
  saleorURL: string;
  provider: ExternalProvider;
  redirectURL: string;
}) => {
  const state = ref<SaleorExternalAuthState>({
    authURL: undefined,
    error: undefined,
    loading: true,
  })
  const url = ref<string>(saleorURL)

  watchEffect(() => {
    const triggerExternalAuth = () => {
      const auth = new SaleorExternalAuth(url.value, provider);
      return auth.initiate({ redirectURL });
    }
    void triggerExternalAuth()
    .then(result => {
      state.value = ({ authURL: result, loading: false });
    }).catch(error => {
      if (error instanceof Error) {
        state.value = ({ loading: false, error: error.message });
      } else {
        state.value = ({ loading: false, error: "Unknown error" });
      }
    });
  })
  
  return state;
};
  
// export const useSaleorExternalAuth = ({
//   saleorURL,
//   provider,
//   redirectURL,
// }: {
//   saleorURL: string;
//   provider: ExternalProvider;
//   redirectURL: string;
// }) => {
//   const [state, setState] = useState<SaleorExternalAuthState>({
//     authURL: undefined,
//     error: undefined,
//     loading: true,
//   });

//   useEffect(() => {
//     const triggerExternalAuth = async () => {
//       try {
//         const auth = new SaleorExternalAuth(saleorURL, provider);
//         const result = await auth.initiate({ redirectURL });

//         setState({ authURL: result, loading: false });
//       } catch (error) {
//         if (error instanceof Error) {
//           setState({ loading: false, error: error.message });
//         } else {
//           setState({ loading: false, error: "Unknown error" });
//         }
//       }
//     };

//     void triggerExternalAuth();
//   }, [saleorURL]);

//   return state;
// };
