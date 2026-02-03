export const WorkingHours = ({ workingHours, onChange }) => {
  const days = [
    { key: 'monday', label: 'Пн' },
    { key: 'tuesday', label: 'Вт' },
    { key: 'wednesday', label: 'Ср' },
    { key: 'thursday', label: 'Чт' },
    { key: 'friday', label: 'Пт' },
    { key: 'saturday', label: 'Сб' },
    { key: 'sunday', label: 'Вс' },
  ];

  const handleChange = (day, field, value) => {
    onChange({
      ...workingHours,
      [day]: {
        ...workingHours[day],
        [field]: value,
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-gray-700">Часы работы</label>
      <div className="space-y-2 border border-gray-300 rounded-lg p-4 bg-gray-50">
        {days.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-3">
            <span className="w-8 text-sm font-medium text-gray-700">{label}</span>
            {workingHours[key].closed ? (
              <span className="text-sm text-gray-500">Закрыто</span>
            ) : (
              <>
                <input
                  type="time"
                  value={workingHours[key].open}
                  onChange={(e) => handleChange(key, 'open', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-500">—</span>
                <input
                  type="time"
                  value={workingHours[key].close}
                  onChange={(e) => handleChange(key, 'close', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </>
            )}
            <label className="ml-auto flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={workingHours[key].closed}
                onChange={(e) => handleChange(key, 'closed', e.target.checked)}
                className="rounded"
              />
              Закрыто
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
