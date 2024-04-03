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
      <span>{placeholder}</span>
      <Element
        value={formik.values[id] as string | number | readonly string[] | undefined}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        // isInvalid tik kai kalaida ir blur
        className={'form-control' + isError ? ' is-invalid' : ''}
        type={type}
        id={id.toString()}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isError && (
        <span className='bg-danger-subtle rounded-1 d-block text-danger px-3 py-1 '>
          {formik.errors[id]?.toString()}
        </span>
      )}
    </label>
  );
}
