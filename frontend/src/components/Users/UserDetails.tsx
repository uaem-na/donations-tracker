import { Alert } from "@components/Alert";
import { Badge } from "@components/Badge";
import { Button, Input, Label } from "@components/Controls";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/Dialog";
import { StatusIndicator } from "@components/StatusIndicator";
import { UserRole } from "@constants";
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface UserDetailsProps {
  id: string;
  onError: (err) => void;
}

export const UserDetails = ({ id, onError }: UserDetailsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [activeDialogOopen, setActiveDialogOpen] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [reason, setReason] = useState("");

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
          err.errors.join(",") ?? t("errors.unknown_server_error"),
        )
      : setServerMessage(err.message ?? t("errors.unknown_server_error"));
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!user) {
    return <p>{t("errors.unknown_server_error")}</p>;
  }

  const onVerifyClick = async () => {
    if (!user?.id) {
      onError({ status: 500, message: "User ID must be available" });
      return;
    }
    verifyUserApi({ userId: user.id });
  };

  const toggleUserStatus = async () => {
    if (!user?.id) {
      onError({ status: 500, message: "User ID must be available" });
      return;
    }
    toggleUserActive({ userId: user.id, reason: reason });
    setReason("");
    setActiveDialogOpen(false);
  };

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

  const renderOrganizationVerificationStatus = () => {
    if (role !== UserRole.ORGANIZATION || !user.organization) {
      return;
    }

    const isVerified = user.organization.verified;
    const color = isVerified ? "green" : "red";

    return (
      <span className="flex items-center gap-2">
        <StatusIndicator status={color} />
        <span className="text-sm">
          {isVerified ? t("users.verified") : t("users.not_verified")}
        </span>
      </span>
    );
  };

  const renderProperty = (label: React.ReactNode, value: React.ReactNode) => {
    return (
      <>
        <dt className="text-gray-500 mr-3">{label}</dt>
        <dd className="text-gray-700 col-start-2">{value}</dd>
      </>
    );
  };

  const {
    role,
    username,
    email,
    displayName,
    firstName,
    lastName,
    active,
    location,
    organization,
    activeStatusChangeReason,
  } = user;
  const verified = user.organization?.verified ?? true;
  const organizationAddress =
    organization &&
    `${organization.address.street}, ${organization.address.city}, ${organization.address.province} (${organization.address.provinceCode}), ${organization.address.country} (${organization.address.countryCode})`;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8 sm:pb-14 leading-6">
      <div className="mb-4">
        {serverMessage && <Alert type="error">{serverMessage}</Alert>}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-gray-900">
          <Badge color={getColorForBadge(role)} text={t(`users.${role}`)} />
          <span className="ml-2">{displayName}</span>{" "}
        </h2>
        {renderOrganizationVerificationStatus()}
      </div>

      <div className="pr-4 py-4">
        <h2 className="text-base font-semibold text-gray-900">
          {t("users.user_information")}
        </h2>
        <dl className="grid gap-x-4 gap-y-1 mt-2 text-sm [grid-template-columns:max-content]">
          {renderProperty(t("users.display_name"), displayName)}
          {renderProperty(t("users.username"), username)}
          {renderProperty(t("users.name"), `${firstName} ${lastName}`)}
          {renderProperty(
            t("users.email"),
            <a href={`mailto:${email}`}>{email}</a>,
          )}
          {renderProperty(
            t("users.active"),
            active ? t("users.active") : t("users.inactive"),
          )}
          {activeStatusChangeReason &&
            renderProperty(
              active
                ? t("users.reason_for_reactivation")
                : t("users.reason_for_deactivation"),
              activeStatusChangeReason,
            )}
          {location?.postalCode &&
            renderProperty(t("users.postal_code"), location.postalCode)}
        </dl>
      </div>

      {organization && (
        <div className="pr-4 py-4">
          <h2 className="text-base font-semibold text-gray-900">
            {t("users.organization_information")}
          </h2>
          <dl className="grid gap-x-4 gap-y-1 mt-2 text-sm [grid-template-columns:max-content]">
            {renderProperty(t("users.name"), organization.name)}
            {renderProperty(t("users.phone_number"), organization.phone)}
            {renderProperty(t("users.address"), organizationAddress)}
          </dl>
        </div>
      )}

      <div className="mt-2 flex justify-end gap-2.5">
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
                      onClick={onVerifyClick}
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
              <Label htmlFor="reason">
                {active
                  ? t("users.reason_for_deactivation")
                  : t("users.reason_for_reactivation")}
              </Label>
              <Input
                type="text"
                name="reason"
                id="reason"
                maxLength={512}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={
                  active
                    ? t("users.reason_for_deactivation")
                    : t("users.reason_for_reactivation")
                }
              />
              <DialogFooter>
                <div className="mt-5 sm:mt-4 flex flex-row-reverse gap-2">
                  <Button
                    type="button"
                    intent={active ? "danger" : "primary"}
                    className="flex gap-1.5 justify-center items-center"
                    onClick={toggleUserStatus}
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
