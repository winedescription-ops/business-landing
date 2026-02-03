import { useParams } from 'react-router-dom';
import { useBusinessData } from '../hooks/useBusinessData';
import { Loader } from '../components/ui/Loader';
import { Template1 } from '../components/templates/Template1';
import { Template2 } from '../components/templates/Template2';
import { Template3 } from '../components/templates/Template3';

export default function PublicLanding() {
  const { businessId } = useParams();
  const { data: business, isLoading, error } = useBusinessData(businessId);

  if (isLoading) return <Loader />;

  if (error || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Страница не найдена</h1>
          <p className="text-gray-600 mt-2">Лендинг не существует или был удален</p>
        </div>
      </div>
    );
  }

  // Map templates
  const templates = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
  };

  const SelectedTemplate = templates[business.template] || Template1;

  return <SelectedTemplate business={business} />;
}
