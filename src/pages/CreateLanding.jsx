import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useBusinessData, useSaveBusinessData } from '../hooks/useBusinessData';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Loader } from '../components/ui/Loader';
import { WorkingHours } from '../components/ui/WorkingHours';

export default function CreateLanding() {
  const { businessId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: existingBusiness, isLoading } = useBusinessData(businessId);
  const saveMutation = useSaveBusinessData();

  const [formData, setFormData] = useState({
    businessName: '',
    tagline: '',
    description: '',
    category: 'other',
    phone: '',
    email: '',
    address: '',
    logoUrl: '',
    template: 'template1',
    workingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '10:00', close: '16:00', closed: false },
      sunday: { open: '00:00', close: '00:00', closed: true },
    },
  });

  useEffect(() => {
    if (existingBusiness) {
      setFormData({
        businessName: existingBusiness.businessName || '',
        tagline: existingBusiness.tagline || '',
        description: existingBusiness.description || '',
        category: existingBusiness.category || 'other',
        phone: existingBusiness.phone || '',
        email: existingBusiness.email || '',
        address: existingBusiness.address || '',
        logoUrl: existingBusiness.logoUrl || '',
        template: existingBusiness.template || 'template1',
        workingHours: existingBusiness.workingHours || {
          monday: { open: '09:00', close: '18:00', closed: false },
          tuesday: { open: '09:00', close: '18:00', closed: false },
          wednesday: { open: '09:00', close: '18:00', closed: false },
          thursday: { open: '09:00', close: '18:00', closed: false },
          friday: { open: '09:00', close: '18:00', closed: false },
          saturday: { open: '10:00', close: '16:00', closed: false },
          sunday: { open: '00:00', close: '00:00', closed: true },
        },
      });
    }
  }, [existingBusiness]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWorkingHoursChange = (hours) => {
    setFormData(prev => ({
      ...prev,
      workingHours: hours
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const id = businessId || `${user.uid}_${Date.now()}`;
    
    await saveMutation.mutateAsync({
      businessId: id,
      data: {
        ...formData,
        userId: user.uid,
        createdAt: existingBusiness?.createdAt || new Date().toISOString(),
      }
    });

    navigate('/dashboard');
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">
            {businessId ? 'Редактировать лендинг' : 'Создать лендинг'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Название бизнеса"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
            />

            <Input
              label="Слоган"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Категория</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="restaurant">Ресторан</option>
                <option value="salon">Салон</option>
                <option value="shop">Магазин</option>
                <option value="services">Услуги</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <Input
              label="Телефон"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Адрес"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />

            <Input
              label="URL логотипа"
              name="logoUrl"
              type="url"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Выбрать шаблон</label>
              <select
                name="template"
                value={formData.template}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="template1">Минималистичный (голубой)</option>
                <option value="template2">Современный (темный)</option>
                <option value="template3">Классический (белый)</option>
              </select>
            </div>

            <WorkingHours
              workingHours={formData.workingHours}
              onChange={handleWorkingHoursChange}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Сохранение...' : 'Сохранить'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Отмена
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
