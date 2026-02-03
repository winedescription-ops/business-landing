import { useState } from 'react';
import { useLogin, useGoogleLogin } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const LoginForm = ({ onToggleMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginMutation = useLogin();
  const googleLoginMutation = useGoogleLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleGoogleLogin = () => {
    googleLoginMutation.mutate();
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {loginMutation.isError && (
          <p className="text-red-500 text-sm">Ошибка входа. Проверьте данные.</p>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? 'Загрузка...' : 'Войти'}
        </Button>
      </form>

      <div className="mt-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={googleLoginMutation.isPending}
        >
          Войти через Google
        </Button>
      </div>

      <p className="mt-4 text-center text-sm">
        Нет аккаунта?{' '}
        <button
          onClick={onToggleMode}
          className="text-blue-600 hover:underline"
        >
          Регистрация
        </button>
      </p>
    </div>
  );
};

