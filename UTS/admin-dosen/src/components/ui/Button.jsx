import { THEME } from '@/utils/config';

export function Button({ children, type = 'button', onClick, variant = 'primary', disabled = false, className = '' }) {
  let baseStyle = "w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  let variantStyle = "";
  if (variant === 'primary') {
    variantStyle = `${THEME.bg} ${THEME.hover} text-white`;
  } else if (variant === 'warning') {
    variantStyle = "bg-amber-500 hover:bg-amber-600 text-white";
  } else if (variant === 'danger') {
    variantStyle = "bg-red-600 hover:bg-red-700 text-white";
  } else if (variant === 'secondary') {
    variantStyle = "bg-gray-500 hover:bg-gray-600 text-white";
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
}