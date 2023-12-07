import { InputHTMLAttributes, ReactNode, useMemo } from 'react';
import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import { AlertCircle, XCircle } from 'lucide-react';
import IconButton from '@/components/common/IconButton';
import styles from './Input.module.scss';
import { mockProviders } from 'next-auth/client/__tests__/helpers/mocks';
import type = mockProviders.github.type;

export type InputProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<T> & {
    icon?: ReactNode;
    label?: string;
    resetField?: () => void;
  };

export type InputStatus = 'normal' | 'filled' | 'error';

const Input = <T extends FieldValues>({
  label,
  name,
  control,
  icon,
  resetField,
  className,
  ...props
}: InputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController<T>({ name, control });

  const status = useMemo<InputStatus>(() => {
    if (error) {
      return 'error';
    } else if (field.value) {
      return 'filled';
    }
    return 'normal';
  }, [error, field.value]);

  const renderIcon = useMemo(() => {
    if (status === 'error') {
      return field.value?.length > 0 ? (
        <IconButton onClick={resetField} icon={<XCircle />} />
      ) : (
        <AlertCircle />
      );
    } else if (icon) {
      return icon;
    } else if (field.value.length > 0 && props.type  === "email") {
      return <IconButton onClick={resetField} icon={<XCircle  />} />
    }

    return null;
  }, [field.value?.length, icon, resetField, status]);

  return (
    <div className={`${styles.group} ${className || ''}`} data-status={status}>
      <label className={styles.label}>
        {label && <span className={styles['label-text']}>{label}</span>}
        <span className={styles['input-group']}>
          <input className={styles.input} {...field} {...props} />
          {renderIcon && <span className={styles.icon}>{renderIcon}</span>}
        </span>
      </label>
      {error && <span className={styles.message}>{error.message}</span>}
    </div>
  );
};

export default Input;
