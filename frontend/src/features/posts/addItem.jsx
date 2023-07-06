import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../../components/button";
import { SelectInput, TextInput } from "../../components/inputs";
import { Paper } from "../../components/paper";
import { addItemSchema } from "../yupSchemas";
// import { useEffect, useState } from "react";

export const AddItem = ({ onAdd }) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(addItemSchema),
  });

  const add = handleSubmit(
    (data) => {
      onAdd(data);
      reset();

      console.count("handleSubmit");
    },
    (errors) => {
      console.count("handleSubmit errors");

      console.log(errors);
    }
  );

  return (
    <Paper>
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
      <Button onClick={add} type="button">
        Add
      </Button>
    </Paper>
  );
};

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

export default AddItem;
