import { Alert } from "@components/Alert";
import { Badge } from "@components/Badge";
import { Button } from "@components/Controls";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/Dialog";
import {
  faCancel,
  faCheckCircle,
  faRecycle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  useGetUserAdminQuery,
  useToggleUserActiveAdminMutation,
  useVerifyUserAdminMutation,
} from "@services/api";
import { getStatusIndicator } from "@utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface UserDetailsProps {
  id: string;
  onError: (err) => void;
  redirectOnDelete?: boolean;
}

export const UserDetails = ({
  id,
  onError,
  redirectOnDelete = true,
}: UserDetailsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activeDialogOopen, setActiveDialogOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState();

  const [verifyUserApi, { isSuccess: isVerifySuccess, error: verifyError }] =
    useVerifyUserAdminMutation();
  const [toggleUserActive] = useToggleUserActiveAdminMutation();

  const {
    data: user,
    isLoading,
    isError,
    error: getUserError,
  } = useGetUserAdminQuery({ userId: id });

  useEffect(() => {
    if (isError) {
      onError(getUserError);
    }
  }, [isError]);

  const onVerify = async () => {
    if (!user?.id) {
      onError({ status: 500, message: "User ID must be available" });
      return;
    }
    verifyUserApi({ userId: user.id });
  };

  const onToggleActive = async () => {
    if (!user?.id) {
      onError({ status: 500, message: "User ID must be available" });
      return;
    }
    toggleUserActive({ userId: user.id });
    setActiveDialogOpen(false);
  };

  // handle successful requests
  useEffect(() => {
    if (isVerifySuccess) {
      navigate("/admin/users");
    }
  }, [isVerifySuccess]);

  // handle server error message
  useEffect(() => {
    if (verifyError) {
      handleServerErrors(verifyError);
    }
  }, [verifyError]);

  const handleServerErrors = (error) => {
    const err: any = "error" in error ? error.error : error.data;

    err.errors.length > 0
      ? setServerMessage(
          err.errors.join(",") ?? t("errors.unknown_server_error")
        )
      : setServerMessage(err.message ?? t("errors.unknown_server_error"));
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!user) {
    return <p>{t("errors.unknown_server_error")}</p>;
  }

  const getColorForBadge = (type: string) => {
    switch (type) {
      case "admin":
        return "green";
      case "individual":
        return "purple";
      default:
        return "blue";
    }
  };

  const {
    role,
    username,
    verified,
    email,
    displayName,
    firstName,
    lastName,
    active,
    location,
    organization,
  } = user;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 sm:pb-14">
      <div className="mb-4">
        {serverMessage && <Alert type="error">{serverMessage}</Alert>}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          <Badge color={getColorForBadge(role)} text={t(`users.${role}`)} />
          <span className="ml-2">{displayName}</span>{" "}
        </h2>
        <div className="flex items-center gap-2">
          {getStatusIndicator(verified)}
          <span className="text-sm">
            {verified ? t("users.verified") : t("users.not_verified")}
          </span>
        </div>
      </div>

      <div className="mt-4 pr-4 py-4">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          {t("users.user_information")}
        </h2>
        <dl className="mt-6 text-sm leading-6">
          <div>
            <dt className="inline text-gray-500 mr-3">
              {t("users.display_name")}
            </dt>
            <dd className="inline text-gray-700">{displayName}</dd>
          </div>
          <div>
            <dt className="inline text-gray-500 mr-3">{t("users.username")}</dt>
            <dd className="inline text-gray-700">{username}</dd>
          </div>

          <div>
            <dt className="inline text-gray-500 mr-3">{t("users.name")}</dt>
            <dd className="inline text-gray-700">
              {firstName} {lastName}
            </dd>
          </div>
          <div>
            <dt className="inline text-gray-500 mr-3">{t("users.email")}</dt>
            <dd className="inline text-gray-700">
              <a href={`mailto:${email}`}>{email}</a>
            </dd>
          </div>
          <div>
            <dt className="inline text-gray-500 mr-3">{t("users.status")}</dt>
            <dd className="inline text-gray-700">
              {active ? t("users.active") : t("users.inactive")}
            </dd>
          </div>
        </dl>
      </div>

      {location?.postalCode && (
        <div className="mt-4 pr-4 py-4">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            {t("users.location_information")}
          </h2>
          <dl className="mt-6 text-sm leading-6">
            <div>
              <dt className="inline text-gray-500 mr-3">
                {t("users.postal_code")}
              </dt>
              <dd className="inline text-gray-700">{location.postalCode}</dd>
            </div>
          </dl>
        </div>
      )}

      {organization && (
        <div className="mt-4 pr-4 py-4">
          <h2 className="text-base font-semibold leading-6 text-gray-900">
            {t("users.organization_information")}
          </h2>
          <dl className="mt-6 text-sm leading-6">
            <div>
              <dt className="inline text-gray-500 mr-3">{t("users.name")}</dt>
              <dd className="inline text-gray-700">{organization.name}</dd>
            </div>
          </dl>
          <dl className="mt-6 text-sm leading-6">
            <div>
              <dt className="inline text-gray-500 mr-3">
                {t("users.phone_number")}
              </dt>
              <dd className="inline text-gray-700">
                <a href={`tel:${organization.phone}`}>{organization.phone}</a>
              </dd>
            </div>
          </dl>
          <dl className="mt-6 text-sm leading-6">
            <div>
              <dt className="inline text-gray-500 mr-3">
                {t("users.address")}
              </dt>
              <dd className="inline text-gray-700">
                {organization.address.street}, {organization.address.city},{" "}
                {organization.address.province} (
                {organization.address.provinceCode}),{" "}
                {organization.address.country} (
                {organization.address.countryCode})
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-4 flex justify-end gap-2.5">
        {organization && !verified && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="button"
                className="flex gap-1.5 justify-center items-center"
              >
                <FontAwesomeIcon icon={faCheckCircle} />
                {t("users.verify")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t("users.verify_confirm_title")}</DialogTitle>
                <DialogFooter>
                  <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-2">
                    <Button
                      type="button"
                      className="flex gap-1.5 justify-center items-center"
                      onClick={onVerify}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                      {t("users.verify")}
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
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
        <Dialog open={activeDialogOopen} onOpenChange={setActiveDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              intent={active ? "danger" : "secondary"}
              className="flex gap-1.5 justify-center items-center"
            >
              <FontAwesomeIcon icon={active ? faTrash : faRecycle} />
              {active ? t("users.deactivate") : t("users.activate")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {active
                  ? t("users.deactivate_confirm_title")
                  : t("users.activate_confirm_title")}
              </DialogTitle>
              <DialogFooter>
                <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-2">
                  <Button
                    type="button"
                    intent={active ? "danger" : "primary"}
                    className="flex gap-1.5 justify-center items-center"
                    onClick={onToggleActive}
                  >
                    <FontAwesomeIcon icon={active ? faTrash : faRecycle} />
                    {active ? t("users.deactivate") : t("users.activate")}
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
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
