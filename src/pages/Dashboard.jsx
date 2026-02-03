import { useNavigate } from 'react-router-dom';
import { useAuth, useLogout } from '../hooks/useAuth';
import { useUserBusinesses } from '../hooks/useBusinessData';
import { Button } from '../components/ui/Button';
import { Loader } from '../components/ui/Loader';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const logoutMutation = useLogout();
  
  const { data: businesses, isLoading } = useUserBusinesses(user?.uid);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Мои лендинги</h1>
          <Button variant="secondary" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button onClick={() => navigate('/create')}>
            Создать новый лендинг
          </Button>
        </div>

        {businesses && businesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businesses.map((business) => (
              <div key={business.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">{business.businessName}</h3>
                <p className="text-gray-600 text-sm mt-2">{business.tagline}</p>
                <div className="mt-4 space-x-2">
                  <Button
                    onClick={() => navigate(`/create/${business.id}`)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(`/p/${business.id}`, '_blank')}
                  >
                    Просмотр
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">У вас пока нет лендингов</p>
            <Button className="mt-4" onClick={() => navigate('/create')}>
              Создать первый лендинг
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
