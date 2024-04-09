import { FormikProps } from 'formik';

type InputElProps<T> = {
  placeholder: string;
  type?: 'text' | 'email' | 'number' | 'date' | 'textarea' | 'password';
  readonly id: keyof T;
  formik: FormikProps<T>;
  className?: string;
  disabled?: boolean;
};

export function InputEl<T>({
  disabled,
  formik,
  id,
  placeholder,
  className,
  type = 'text',
}: InputElProps<T>) {
  const Element = type === 'textarea' ? 'textarea' : 'input';

  const isError = formik.errors[id] && formik.touched[id];
  return (
    <label className={`form-label w-100 ${className}`}>
      <Element
        value={formik.values[id] as string | number | readonly string[] | undefined}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // isInvalid tik kai kalaida ir blur
        className={`border block w-full border-black rounded-sm ${isError ? ' is-invalid' : ''}`}
        type={type}
        id={id.toString()}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isError && (
        <span className='bg-red-300 block rounded-1 px-3 py-1 '>
          {formik.errors[id]?.toString()}
        </span>
      )}
    </label>
  );
}
