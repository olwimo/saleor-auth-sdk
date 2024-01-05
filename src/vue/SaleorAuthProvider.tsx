// import type { PropsWithChildren } from "react";
// import { provide } from 'vue'
import { provide, type FunctionalComponent } from 'vue';
// import { Provider } from "./context";
import { SaleorAuthClient } from "../SaleorAuthClient";

// export const SaleorAuthProvider = ({ children, client }: PropsWithChildren<{ client: SaleorAuthClient }>) => {
//   return <Provider value={client}>{children}</Provider>;
// };
// interface FCProps {
//     client: SaleorAuthClient
// }

export const SaleorAuthProvider: FunctionalComponent<{
    client: SaleorAuthClient
}> = (
    { client }
) => {
    provide('saleorAuthClient', client)

    return (<slot />)
}
