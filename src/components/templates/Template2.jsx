export const Template2 = ({ business }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-black py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {business.logoUrl && (
            <div className="mb-6">
              <img
                src={business.logoUrl}
                alt={business.businessName}
                className="h-20 mx-auto object-contain filter brightness-0 invert"
              />
            </div>
          )}
          <h1 className="text-6xl font-bold mb-4 text-center">{business.businessName}</h1>
          {business.tagline && (
            <p className="text-xl text-gray-300 text-center">{business.tagline}</p>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Description */}
        {business.description && (
          <section className="mb-16 bg-gray-800 rounded-lg p-8">
            <p className="text-lg text-gray-200 leading-relaxed">{business.description}</p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6">Информация</h2>

            {business.phone && (
              <div>
                <h3 className="font-semibold text-gray-400 mb-2">Телефон</h3>
                <p className="text-lg text-white">{business.phone}</p>
              </div>
            )}

            {business.email && (
              <div>
                <h3 className="font-semibold text-gray-400 mb-2">Email</h3>
                <p className="text-lg text-white">{business.email}</p>
              </div>
            )}

            {business.address && (
              <div>
                <h3 className="font-semibold text-gray-400 mb-2">Адрес</h3>
                <p className="text-lg text-white">{business.address}</p>
              </div>
            )}

            {business.category && (
              <div>
                <h3 className="font-semibold text-gray-400 mb-2">Категория</h3>
                <p className="text-lg text-white capitalize">{business.category}</p>
              </div>
            )}
          </div>

          {/* Right Column - Working Hours */}
          {business.workingHours && (
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Часы работы</h2>
              <div className="space-y-3">
                {Object.entries(business.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between border-b border-gray-700 pb-3">
                    <span className="font-medium text-gray-300 capitalize">{day}</span>
                    <span className="text-gray-200">
                      {hours.closed ? 'Закрыто' : `${hours.open} - ${hours.close}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
