import { FormikProps } from 'formik';
import { CategoryObjType } from '../../util/types';

type SelectElProps<T> = {
  placeholder: string;
  readonly id: keyof T;
  formik: FormikProps<T>;
  className?: string;
  disabled?: boolean;
  name: string;
  options: CategoryObjType[];
};

export function SelectEl<T>({
  disabled,
  formik,
  id,
  placeholder,
  className,
  name,
  options,
}: SelectElProps<T>) {
  const isError = formik.errors[id] && formik.touched[id];
  return (
    <label className={`form-label w-100 ${className}`}>
      {name}
      <select
        value={formik.values[id] as string | number}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`block w-full border border-gray-200 pl-2 rounded-full ${
          isError ? 'is-invalid' : ''
        }`}
        id={id.toString()}
        disabled={disabled}
      >
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {isError && (
        <span className='bg-red-300 block rounded-md px-3 py-1'>
          {formik.errors[id]?.toString()}
        </span>
      )}
    </label>
  );
}
