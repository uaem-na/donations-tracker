import { yupResolver } from "@hookform/resolvers/yup";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import styled, { keyframes } from "styled-components";
import { Button } from "../../components/common/button";
import { SelectInput, TextInput } from "../../components/common/inputs";
import { ELEVATIONS } from "../../constants";
import { addItemSchema } from "../yupSchemas";

export const AddItem = ({ onAdd, isOpen, onDismiss }) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(addItemSchema),
  });

  const onSubmit = (data) => {
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
              <InputGroup>
                <InputLabel htmlFor="name">Name</InputLabel>
                <TextInput
                  {...register("name")}
                  id="name"
                  type="text"
                  placeholder="name"
                  errorMessage={errors.name?.message}
                />
              </InputGroup>
              <InputGroup>
                <InputLabel htmlFor="description">Description</InputLabel>
                <TextInput
                  {...register("description")}
                  id="description"
                  type="textarea"
                  placeholder="description"
                  errorMessage={errors.description?.message}
                />
              </InputGroup>
              <InputGroup>
                <InputLabel htmlFor="quantity">Quantity</InputLabel>
                <TextInput
                  {...register("quantity")}
                  id="quantity"
                  type="number"
                  placeholder="quantity"
                  errorMessage={errors.quantity?.message}
                />
                <InputLabel htmlFor="price">Price</InputLabel>
                <TextInput
                  {...register("price")}
                  id="price"
                  type="number"
                  placeholder="price"
                  errorMessage={errors.price?.message}
                />
              </InputGroup>
              <SelectInput
                {...register("category")}
                id="category"
                placeholder="Select a category"
                listName="Category"
                errorMessage={errors.category?.message}
                options={[
                  {
                    label: "Masks",
                    value: "masks",
                  },
                  {
                    label: "Gloves",
                    value: "gloves",
                  },
                ]}
              />
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

const InputGroup = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const InputLabel = styled(Label)`
  display: inline-flex;
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
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
  box-shadow: ${ELEVATIONS.medium};
  border-radius: 8px;
  background-color: hsl(212deg, 33%, 95%);

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
