import { Button } from "@common/button";
import { Paper } from "@common/paper";
import { yupResolver } from "@hookform/resolvers/yup";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCreatePostMutation } from "../../store/services/posts";
import { createPostSchema } from "../yupSchemas";
import AddItem from "./addItem";

export const CreatePostForm = () => {
  const location = useLocation();
  const [postType, setPostType] = useState("request");
  const [formHeader, setFormHeader] = useState("");
  const [formSubheader, setFormSubheader] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
    let path = location.pathname;
    if (/^\/offers/.test(path)) {
      setPostType("offer");
      setFormHeader("Create an offer");
      setFormSubheader(
        "This will go into our database and other users will be able to request your offer."
      );
    } else {
      setPostType("request");
      setFormHeader("Create a request");
      setFormSubheader(
        "This will go into our database and other users will be able to view your request."
      );
    }
  }, [location.pathname]);

  const [
    createPostApi,
    { isLoading: isUpdating, isSuccess, isError, error: serverError },
  ] = useCreatePostMutation();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createPostSchema),
  });

  const { fields: items, append } = useFieldArray({
    control,
    name: "postItems", // unique name for your Field Array
  });

  const onSubmit = (data) => {
    createPostApi(data);
  };

  const onItemAdd = (item) => {
    append(item);
    // setShowAddItem(false);
  };

  // handle successful request
  useEffect(() => {
    if (isSuccess) {
      setServerMessage("");
      // TODO: display a success toast
      alert("successfully updated");
    }
  }, [isSuccess]);

  // check yup errors
  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      // loop over errors and console error messages
      Object.keys(errors).forEach((key) => {
        console.error(errors[key]?.message);
      });
    }
  }, [errors]);

  // handle server error message
  useEffect(() => {
    if (isError && serverError && serverError.data) {
      let message = serverError.data.message;
      if (serverError.data.errors && serverError.data.errors.length > 0) {
        // TODO: better error message when multiple errors
        message += serverError.data.errors.join(",");
      }
      setServerMessage(message || "An error occurred");
    }
  }, [isError, serverError]);

  return (
    <Wrapper>
      <StyledPaper elevation={3}>
        <Header>{formHeader}</Header>
        <Subheader>{formSubheader}</Subheader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="title"
            control={control}
            label={"Title"}
            variant="outlined"
          />

          {items.map((item, index) => {
            return (
              <>
                <p key={index}>{item.name}</p>
              </>
            );
          })}

          <StyledButton
            variant="contained"
            size="large"
            title="Add Item"
            color="secondary"
            onClick={() => setShowAddItem(true)}
          >
            Add Item
          </StyledButton>

          <AddItem
            isOpen={showAddItem}
            onDismiss={() => setShowAddItem(false)}
            onAdd={onItemAdd}
          />

          <StyledButton
            variant="contained"
            size="large"
            disabled={isUpdating}
            type="submit"
          >
            {formHeader}
          </StyledButton>

          {serverMessage && (
            <ServerMessage role="alert">{serverMessage}</ServerMessage>
          )}

          <VisuallyHidden>
            <input
              type="hidden"
              {...register("type")}
              name="type"
              value={postType}
            />
          </VisuallyHidden>
        </Form>
      </StyledPaper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  padding: 24px;
  border-radius: 20px;
`;

const Header = styled.h1`
  font-size: 3rem;
  text-align: center;
  font-weight: 700;
`;

const Subheader = styled.h3`
  font-size: 1.2rem;
  text-align: center;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 12px;
`;

const StyledButton = styled(Button)`
  width: clamp(200px, 50vw, 800px);
  align-self: center;
`;

const ServerMessage = styled.span`
  display: block;
  font-size: 1rem;
  color: var(--color-error);
`;

export default CreatePostForm;
