"use client";

import { useState } from "react";

type SwitchCaseProps = {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const SwitchCase = ({
  value = false,
  onChange,
  disabled = false,
  size = "lg",
}: SwitchCaseProps) => {
  const [enabled, setEnabled] = useState<boolean>(value);

  const handleToggle = () => {
    if (disabled) return;

    const updatedValue = !enabled;

    setEnabled(updatedValue);

    if (onChange) {
      onChange(updatedValue);
    }
  };

  const switchSizes = {
    sm: {
      wrapper: "w-10 h-5",
      circle: "w-3.5 h-3.5",
      active: "translate-x-5",
    },

    md: {
      wrapper: "w-11 h-6",
      circle: "w-4 h-4",
      active: "translate-x-5.5",
    },

    lg: {
      wrapper: "w-12 h-6",
      circle: "w-4 h-4",
      active: "translate-x-6",
    },
  };

  const currentSize = switchSizes[size];

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative
        flex
        items-center
        rounded-full
        transition-all
        duration-300
        ease-in-out
        cursor-pointer
        ${currentSize.wrapper}
        ${enabled
          ? "bg-orange"
          : "bg-off-white"
        }
        ${disabled ? "cursor-not-allowed opacity-50" : ""}
      `}
    >
      <span
        className={`
          absolute
          left-1
          rounded-full
          bg-white
          transition-all
          duration-300
          ease-in-out
          ${currentSize.circle}
          ${enabled ? currentSize.active : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default SwitchCase;