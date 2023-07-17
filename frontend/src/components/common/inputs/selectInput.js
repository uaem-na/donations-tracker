import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import styled from "styled-components";
import { getHeight } from "./styledInput";

const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <SelectItemWrapper {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <SelectItemIndicator>
        <CheckIcon />
      </SelectItemIndicator>
    </SelectItemWrapper>
  );
});

export const SelectInput = forwardRef((props, ref) => {
  const {
    height,
    errorMessage,
    listName,
    placeholder,
    options,
    name,
    onChange,
    required,
    disabled,
  } = props;
  return (
    <InputWrapper>
      <Select.Root
        name={name}
        onValueChange={(value) => onChange({ target: { name, value } })}
        required={required}
        disabled={disabled}
      >
        <SelectTrigger
          aria-label={listName}
          aria-invalid={errorMessage ? "true" : "false"}
          $isError={errorMessage ? true : false}
          $height={height}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </SelectTrigger>
        <Select.Portal>
          <SelectContent ref={ref} position="popper">
            <Select.ScrollUpButton>
              <ChevronUpIcon />
            </Select.ScrollUpButton>
            <SelectViewport>
              <Select.Group>
                {options &&
                  options.map((option, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={option.value}
                        disabled={option.disabled}
                      >
                        {option.label}
                      </SelectItem>
                    );
                  })}
              </Select.Group>
            </SelectViewport>
            <Select.ScrollDownButton>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </SelectContent>
        </Select.Portal>
      </Select.Root>
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
    </InputWrapper>
  );
});

SelectInput.propTypes = {
  height: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  listName: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string,
};

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4px;
`;

const ErrorMessage = styled.span`
  display: inline-flex;
  font-size: 1rem;
  margin-bottom: 8px;
  color: var(--color-error);
  justify-content: flex-end;
`;

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);

  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
`;

const SelectViewport = styled(Select.Viewport)`
  padding: 10px;
`;

const SelectItemWrapper = styled(Select.Item)`
  font-size: 16px;
  line-height: 1;
  color: var(--color-text);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 35px 0 25px;
  position: relative;
  user-select: none;

  &[data-highlighted] {
    background-color: var(--color-secondary);
    color: white;
  }
`;

const SelectItemIndicator = styled(Select.ItemIndicator)`
  position: absolute;
  left: 0;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export default SelectInput;

// ! this breaks code highlighting in vscode... putting it at end of file
const SelectTrigger = styled(Select.Trigger).attrs((props) => ({
  $isError: props.$isError || false,
  $height: props.$height || "medium",
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-gray-800);
  border: ${({ $isError }) => $isError && "1px solid var(--color-error);"};
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1.1rem;
  background-color: white;
  color: inherit;
  height: ${({ $height }) => getHeight({ $height })};

  &:hover {
    background-color: var(--color-gray-900);
  }

  &:focus {
    outline: ${({ $isError }) => $isError && "2px dotted var(--color-error);"};
  }

  &::placeholder {
    color: var(--color-gray-500);
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
