export default function InputForm({
  label,
  placeholder,
  id,
  type,
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div>
      <label htmlFor="nama_depan">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="block w-full px-4 py-[7px] mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
        required
        disabled={disabled}
        autoComplete="chrome-off"
      />
    </div>
  );
}
