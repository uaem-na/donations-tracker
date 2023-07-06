import * as Select from "@radix-ui/react-select";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import styled from "styled-components";
import { getHeight } from "./styledInput";

const SelectItem = forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <Select.Item {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator>yo</Select.ItemIndicator>
    </Select.Item>
  );
});

export const SelectInput = forwardRef((props, ref) => {
  const {
    height,
    errorMessage,
    listName,
    placeholder,
    options,
    onChange,
    onBlur,
    value,
    ...rest
  } = props;
  return (
    <InputWrapper>
      <Select.Root>
        <SelectTrigger
          aria-label={listName}
          aria-invalid={errorMessage ? "true" : "false"}
          $isError={errorMessage ? true : false}
          $height={height}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="SelectIcon">down</Select.Icon>
        </SelectTrigger>
        <Select.Portal>
          <SelectContent ref={ref}>
            <Select.ScrollUpButton className="SelectScrollButton">
              up
            </Select.ScrollUpButton>
            <Select.Viewport className="SelectViewport">
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
            </Select.Viewport>
            <Select.ScrollDownButton className="SelectScrollButton">
              down
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

const SelectContent = styled(Select.Content)`
  overflow: hidden;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

export default SelectInput;
