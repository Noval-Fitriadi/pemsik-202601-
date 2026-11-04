import { THEME } from '@/utils/config';

export function Input({ id, type = 'text', value, onChange, placeholder, readOnly = false, className = '' }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-200 ${
        readOnly ? 'bg-gray-100 cursor-not-allowed text-gray-500' : `focus:border-transparent focus:ring-2 ${THEME.ring}`
      } ${className}`}
    />
  );
}