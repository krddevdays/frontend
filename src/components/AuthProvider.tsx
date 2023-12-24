import * as React from 'react';

import AuthModal from './AuthModal/AuthModal';

type Profile = {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    work: string | null;
    position: string | null;
};

type Resolver = (profile: Profile) => void;
type Rejector = (reason?: unknown) => void;

export default function AuthProvider(props: { children: React.ReactNode }) {
    const [isAuthModalOpen, setAuthModalOpen] = React.useState(false);
    const [, setQueue] = React.useState<Array<[Resolver, Rejector]>>([]);

    const handleAuthModal = React.useCallback((profile?: Profile) => {
        setQueue((queue) => {
            queue.forEach((item) => {
                if (profile) {
                    item[0](profile);
                } else {
                    item[1]();
                }
            });

            return [];
        });
        setAuthModalOpen(false);
    }, []);

    const handleAuthRequest = React.useCallback(() => {
        let resolver: Resolver | undefined;
        let rejector: Rejector | undefined;

        const promise = new Promise<Profile>((resolve, reject) => {
            resolver = resolve;
            rejector = reject;
        });

        setQueue((queue) => [...queue, [resolver as Resolver, rejector as Rejector]]);
        setAuthModalOpen(true);

        return promise;
    }, []);

    return (
        <Context.Provider
            value={{
                auth: handleAuthRequest,
            }}
        >
            {props.children}
            {isAuthModalOpen && <AuthModal onResolve={handleAuthModal} onReject={handleAuthModal} />}
        </Context.Provider>
    );
}

export function useAuth() {
    const { auth } = React.useContext(Context);

    return auth as () => Promise<Profile>;
}

const Context = React.createContext({
    auth: new Function(),
});
