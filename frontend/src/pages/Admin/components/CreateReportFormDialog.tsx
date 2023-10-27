import { Alert } from "@components";
import { Button, Label } from "@components/Controls";
import { Textarea } from "@components/Controls/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/Dialog";
import { faCancel, faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateReportSchema } from "@pages/Admin/components/schemas/CreateReportSchema";
import { DialogClose } from "@radix-ui/react-dialog";
import { useReportPostMutation } from "@services/api";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface CreateReportFormDialogProps {
  postId: string;
}

export const CreateReportFormDialog = ({
  postId,
}: PropsWithChildren<CreateReportFormDialogProps>) => {
  const { t } = useTranslation();
  const schema = useMemo(() => CreateReportSchema(t), [t]);

  const [open, setOpen] = useState(false);

  const [
    reportPostApi,
    { isLoading: isSubmitting, isSuccess: isReportSuccess, error: reportError },
  ] = useReportPostMutation();
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(isReportSuccess);

    data.postId = postId;

    reportPostApi(data);
    setOpen(false);
  };

  useEffect(() => {
    if (reportError) {
      if (!("status" in reportError)) {
        setServerMessage(
          reportError.message ?? t("errors.unknown_server_error"),
        );
        return;
      }

      const err: any =
        "error" in reportError ? reportError.error : reportError.data;
      if (err.name === "ValidationError") {
        const errorMessages = err.errors.map(
          (error) =>
            `${error.msg}: ${error.location}.${error.path} = ${JSON.stringify(
              error.value,
            )}`,
        );
        setServerMessage(errorMessages.join(","));
      } else {
        err.errors.length > 0
          ? setServerMessage(
              err.errors.join(",") ?? t("errors.unknown_server_error"),
            )
          : setServerMessage(err.message ?? t("errors.unknown_server_error"));
      }
    }
  }, [reportError]);

  useEffect(() => {
    if (!isReportSuccess) return;

    console.log(isReportSuccess);

    resetField(`notes`);
  }, [isReportSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          intent="outline-danger"
          className="flex gap-1.5 justify-center items-center"
        >
          <FontAwesomeIcon icon={faFlag} />
          {t("report")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report post</DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              {serverMessage && <Alert type="error">{serverMessage}</Alert>}
            </div>

            <div>
              <Label htmlFor="notes">{t("reports.notes")}</Label>
              <div className="mt-2">
                <Textarea
                  {...register(`notes`)}
                  id="notes"
                  placeholder={t("reports.reason")}
                  errorMessage={errors.notes?.message}
                />
              </div>
            </div>

            <DialogFooter>
              <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-2">
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  intent="danger"
                  className="flex gap-1.5 justify-center items-center"
                >
                  <FontAwesomeIcon icon={faFlag} />
                  {t("report")}
                </Button>

                <DialogClose asChild>
                  <Button
                    type="button"
                    intent="secondary"
                    className="flex gap-1.5 justify-center items-center"
                  >
                    <FontAwesomeIcon icon={faCancel} />
                    {t("cancel")}
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
