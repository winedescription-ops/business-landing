export const Template3 = ({ business }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-12 border-b-2 border-gray-200 pb-8">
          {business.logoUrl && (
            <div className="mb-6">
              <img
                src={business.logoUrl}
                alt={business.businessName}
                className="h-20 mx-auto object-contain"
              />
            </div>
          )}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {business.businessName}
          </h1>
          {business.tagline && (
            <p className="text-xl text-gray-600">{business.tagline}</p>
          )}
        </header>

        {/* Description */}
        {business.description && (
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              {business.description}
            </p>
          </section>
        )}

        {/* Main Info Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {business.phone && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Телефон</h3>
              <p className="text-gray-700">{business.phone}</p>
            </div>
          )}

          {business.email && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700">{business.email}</p>
            </div>
          )}

          {business.address && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Адрес</h3>
              <p className="text-gray-700">{business.address}</p>
            </div>
          )}

          {business.category && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Категория</h3>
              <p className="text-gray-700 capitalize">{business.category}</p>
            </div>
          )}
        </section>

        {/* Working Hours */}
        {business.workingHours && (
          <section className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Часы работы</h2>
            <div className="space-y-3">
              {Object.entries(business.workingHours).map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between py-2 border-b border-gray-200 last:border-b-0"
                >
                  <span className="font-medium text-gray-700 capitalize">{day}</span>
                  <span className="text-gray-600">
                    {hours.closed ? 'Закрыто' : `${hours.open} - ${hours.close}`}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
