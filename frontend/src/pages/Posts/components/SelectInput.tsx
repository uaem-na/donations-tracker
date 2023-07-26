import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Select from "@radix-ui/react-select";
import { ReactNode, forwardRef } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps {
  name: string;
  placeholder: string;
  options: SelectOption[];
}

interface SelectItemProps {
  children: ReactNode;
  value: string;
}

export const SelectInput = ({
  name: groupName,
  placeholder,
  options,
}: SelectInputProps) => {
  if (options?.length === 0) {
    return <>Empty options provided to SelectInput</>;
  }

  return (
    <Select.Root>
      <Select.Trigger aria-label={groupName}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <FontAwesomeIcon icon={faChevronDown} className="w-[20px]" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.ScrollUpButton>
            <FontAwesomeIcon icon={faChevronUp} className="w-[20px]" />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Group>
              <Select.Label>{groupName}</Select.Label>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton>
            <FontAwesomeIcon icon={faChevronDown} className="w-[20px]" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ children, value, ...props }, forwardedRef) => {
    return (
      <Select.Item value={value} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator>
          <FontAwesomeIcon icon={faCheck} className="w-[20px]" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);
