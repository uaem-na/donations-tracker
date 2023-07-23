import { Button } from "@common/button";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { ELEVATIONS } from "../../constants";
import { addItemSchema } from "../yupSchemas";

export const AddItem = ({ onAdd, isOpen, onDismiss }) => {
  const { reset, handleSubmit, control } = useForm({
    resolver: yupResolver(addItemSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    onAdd(data);
    reset();

    console.count("handleSubmit");
  };

  const onError = (errors) => {
    console.count("handleSubmit errors");

    console.log(errors);
  };

  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Content>
            <Dialog.Close asChild onClick={onDismiss}>
              <CloseButton>
                <Cross1Icon />
              </CloseButton>
            </Dialog.Close>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
              {/* <FormInputText
                name="name"
                control={control}
                label={"Name"}
                variant="outlined"
              />
              <FormInputText
                name="description"
                control={control}
                label={"Description"}
                variant="outlined"
                multiline
              />
              <FormInputText
                name="quantity"
                control={control}
                label={"Quantity"}
                variant="outlined"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <FormInputText
                name="price"
                control={control}
                label={"Price"}
                variant="outlined"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              <FormInputText
                name="category"
                control={control}
                label={"Category"}
                variant="outlined"
                select
                helperText="Please select a category"
                defaultValue="masks"
                SelectProps={{
                  native: true,
                }}
              >
                {[
                  {
                    label: "Masks",
                    value: "masks",
                  },
                  {
                    label: "Gloves",
                    value: "gloves",
                  },
                ].map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormInputText> */}
              <Button type="submit">Add</Button>
            </Form>
          </Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 12px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Content = styled(Dialog.Content)`
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 400px;
  max-height: 90vh;
  padding: 32px;
  box-shadow: ${ELEVATIONS.large};
  border-radius: 8px;

  @media (prefers-reduced-motion: no-preference) {
    &[data-state="open"] {
      animation: ${fadeIn} 500ms both cubic-bezier(0, 0.6, 0.32, 1.06);
      animation-delay: 200ms;
    }
    &[data-state="closed"] {
      animation: ${fadeOut} 250ms ease-in;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export default AddItem;
