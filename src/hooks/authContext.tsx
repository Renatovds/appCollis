import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  login: string;
  plan: string;
}
interface AuthState {
  user: User;
  token: string;
}
interface SignInCredencials {
  cpf_cnpj: string;
  password: string;
  saveLogin?: boolean;
}
interface SignInCache {
  cpf_cnpj: string;
  password: string;
}
export interface BillsProps {
  titulo: string;
  valor: string;
  valorpag: string;
  datavenc: string;
  nossonum: number;
  linhadig: string;
  nome: string;
  login: string;
  cpf_cnpj: string;
  tipo: string;
  email: string;
  status: string;
}
interface AuthContextData {
  user: User;
  userBills: BillsProps[] | undefined;
  loading: boolean;
  LoginData: SignInCache;
  signIn(credencials: SignInCredencials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
  updateUserBills(bills: BillsProps[]): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => ({} as AuthState));
  const [login, setLogin] = useState<SignInCache>(() => ({} as SignInCache));
  const [loading, setLoading] = useState(true);
  const [userBills, setUserBills] = useState<BillsProps[]>();

  useEffect(() => {
    async function loadState(): Promise<void> {
      const [user, token] = await AsyncStorage.multiGet([
        '@Collis:user',
        '@Collis:token',
      ]);
      const [cpf_cnpj, password] = await AsyncStorage.multiGet([
        '@Collis:cpf_cnpj',
        '@Collis:password',
      ]);

      if (cpf_cnpj[1] && password[1]) {
        setLogin({ cpf_cnpj: cpf_cnpj[1], password: password[1] });
      }

      if (user[1] && token[1]) {
        setData({ user: JSON.parse(user[1]), token: token[1] });
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
      }
      setLoading(false);
    }
    loadState();
  }, []);

  const signIn = useCallback(
    async ({ cpf_cnpj, password, saveLogin = false }: SignInCredencials) => {
      const response = await api.post('sessions', {
        cpf_cnpj,
        password,
      });

      const { user, token } = response.data;
      await AsyncStorage.multiSet([
        ['@Collis:user', JSON.stringify(user)],
        ['@Collis:token', token],
      ]);
      if (saveLogin) {
        await AsyncStorage.multiSet([
          ['@Collis:cpf_cnpj', cpf_cnpj],
          ['@Collis:password', password],
        ]);
      }
      setData({ user, token });
      api.defaults.headers.authorization = `Bearer ${token}`;
    },
    [],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Collis:user', '@Collis:token']);
    await AsyncStorage.multiRemove(['@Collis:cpf_cnpj', '@Collis:password']);
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      setData({ token: data.token, user });
      await AsyncStorage.setItem('@Collis:user', JSON.stringify(user));
    },
    [setData, data.token],
  );
  const updateUserBills = useCallback((bills: BillsProps[]) => {
    setUserBills(bills);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        updateUser,
        loading,
        updateUserBills,
        userBills,
        LoginData: login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
export { useAuth, AuthProvider };
