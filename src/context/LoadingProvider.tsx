import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "../components/Loading";

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const shouldUseLoadingScreen = window.innerWidth > 1024;
  const [isLoading, setIsLoading] = useState(() => {
    return shouldUseLoadingScreen;
  });
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {
    // Auto-start animations when the 3D intro is not rendered.
    if (!shouldUseLoadingScreen) {
      import("../components/utils/initialFX").then((module) => {
        if (module.initialFX) {
          setTimeout(() => {
            module.initialFX();
          }, 100);
        }
      });
    }
  }, [shouldUseLoadingScreen]);

  useEffect(() => {}, [loading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && <Loading percent={loading} />}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
