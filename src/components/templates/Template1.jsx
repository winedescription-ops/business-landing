export const Template1 = ({ business }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          {business.logoUrl && (
            <div className="mb-6">
              <img
                src={business.logoUrl}
                alt={business.businessName}
                className="h-24 mx-auto object-contain"
              />
            </div>
          )}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {business.businessName}
          </h1>
          {business.tagline && (
            <p className="text-2xl text-indigo-600 font-semibold">{business.tagline}</p>
          )}
        </header>

        {/* Description */}
        {business.description && (
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">{business.description}</p>
          </section>
        )}

        {/* Contact Info */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          {business.phone && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Телефон</h3>
              <p className="text-gray-700 text-lg">{business.phone}</p>
            </div>
          )}

          {business.email && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-700 text-lg">{business.email}</p>
            </div>
          )}

          {business.address && (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="font-semibold text-gray-900 mb-2">Адрес</h3>
              <p className="text-gray-700 text-lg">{business.address}</p>
            </div>
          )}
        </section>

        {/* Working Hours */}
        {business.workingHours && (
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Часы работы</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(business.workingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between border-b pb-2">
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
