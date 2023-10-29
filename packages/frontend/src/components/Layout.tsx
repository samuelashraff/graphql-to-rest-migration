export const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
    </div>
  );
};
