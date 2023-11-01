export const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
    return (
        <div className="flex items-top justify-center min-h-screen">
            {children}
        </div>
    );
};
