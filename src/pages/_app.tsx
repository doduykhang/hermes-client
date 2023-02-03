import { UserContextWrapper } from '@/context/user';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
	const [queryClient] = useState(() => new QueryClient());
  	return (
		<QueryClientProvider client={queryClient}>
			<UserContextWrapper>
				<div className="w-screen flex justify-center">
					<div className="flex-grow max-w-7xl">
      						<Component {...pageProps} />
      						<ReactQueryDevtools initialIsOpen={false} />
					</div>
				</div>
			</UserContextWrapper>
    		</QueryClientProvider>
	)
}
