import { InputHTMLAttributes, useState } from 'react';
import CustomInput from '@/components/custom-input';

export default function CustomNumberInput({label, className, setValue, min, max, step = 1, value, ...props}: {
  label?: string,
  setValue?: (value: number) => void,
  step?: number,
  min?: number,
  max?: number,
  value?: number,
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'step' | 'min' | 'max' | 'value' | 'type'>) {
  const [innerValue, setInnerValue] = useState<number | undefined>(value);

  function handleBlur() {
    if (!setValue || innerValue === undefined || isNaN(innerValue)) return;
    let v = Math.round(innerValue / step) * step;
    if (typeof min === 'number' && v < min) v = min;
    if (typeof max === 'number' && v > max) v = max;
    setInnerValue(v);
    setValue(v);
  }

  return (
    <CustomInput
      type="number"
      onBlur={handleBlur}
      min={min}
      max={max}
      step={step}
      value={innerValue ?? ''}
      onChange={(e) => {
        const v = parseInt(e.target.value);
        setInnerValue(isNaN(v) ? undefined : v);
      }}
      {...props}
    />
  )
}
