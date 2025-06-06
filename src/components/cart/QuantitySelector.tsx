"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
  disabled?: boolean;
}

export function QuantitySelector({ quantity, maxQuantity, onQuantityChange, disabled = false }: QuantitySelectorProps) {
  const handleDecrement = () => {
    onQuantityChange(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    onQuantityChange(Math.min(maxQuantity, quantity + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onQuantityChange(Math.max(1, Math.min(maxQuantity, value)));
    } else if (e.target.value === '') {
      // Allow clearing the input, could default to 1 on blur or further action
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '' || parseInt(e.target.value, 10) < 1) {
        onQuantityChange(1); // Reset to 1 if input is empty or invalid on blur
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <Button variant="outline" size="icon" onClick={handleDecrement} disabled={disabled || quantity <= 1} className="h-8 w-8">
        <Minus className="h-3 w-3" />
      </Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        min="1"
        max={maxQuantity}
        className="h-8 w-12 text-center px-1"
        disabled={disabled}
      />
      <Button variant="outline" size="icon" onClick={handleIncrement} disabled={disabled || quantity >= maxQuantity} className="h-8 w-8">
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
