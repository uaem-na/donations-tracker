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
import {
  faCancel,
  faCheckCircle,
  faRectangleList,
  faRecycle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReportSummaryItem } from "@pages/Admin/components/ReportSummaryItem";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  ApiModel,
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
  const [reason, setReason] = useState("");
  const [unresolvedReports, setUnresolvedReports] = useState<ApiModel.Report[]>(
    [],
  );
  const [resolvedReports, setResolvedReports] = useState<ApiModel.Report[]>([]);
  console.log(unresolvedReports);

  const [verifyUserApi, { isSuccess: isVerifySuccess, error: verifyError }] =
    useVerifyUserAdminMutation();
  const [toggleUserActive] = useToggleUserActiveAdminMutation();

  const {
    data: reportResponse,
    isLoading,
    isError,
    error: getUserError,
  } = useGetUserAdminQuery({ userId: id });

  useEffect(() => {
    if (isError) {
      onError(getUserError);
    }
  }, [isError]);

  useEffect(() => {
    const unresolved = reportResponse?.reports?.filter(
      (x) => x.status === "unresolved",
    )!;
    setUnresolvedReports(unresolved);

    const resolved = reportResponse?.reports?.filter(
      (x) => x.status === "resolved",
    )!;
    setResolvedReports(resolved);
  }, [reportResponse]);

  const onVerify = async () => {
    if (!reportResponse?.user?.id) {
      onError({ status: 500, message: "User ID must be available" });
      return;
    }
    verifyUserApi({ userId: reportResponse?.user?.id });
  };

  const onToggleActive = async () => {
    if (!reportResponse?.user?.id) {
      onError({ status: 500, message: "User ID must be available" });
      return;
    }
    toggleUserActive({ userId: reportResponse?.user?.id, reason: reason });
    setReason("");
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
          err.errors.join(",") ?? t("errors.unknown_server_error"),
        )
      : setServerMessage(err.message ?? t("errors.unknown_server_error"));
  };

  if (isLoading) {
    return <p>{t("loading")}</p>;
  }

  if (!reportResponse?.user) {
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
    email,
    displayName,
    firstName,
    lastName,
    active,
    location,
    organization,
    activeStatusChangeReason,
  } = reportResponse?.user!;

  const verified = reportResponse?.user!.organization?.verified ?? true;

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
          {activeStatusChangeReason && (
            <div>
              <dt className="inline text-gray-500 mr-3">
                {active
                  ? t("users.reason_for_reactivation")
                  : t("users.reason_for_deactivation")}
              </dt>
              <dd className="inline text-gray-700">
                {activeStatusChangeReason}
              </dd>
            </div>
          )}
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

      <div className="mt-4 pr-4 py-4">
        <h2 className="text-base font-semibold leading-6 text-gray-900">
          {t("users.report_information")}
        </h2>
        {reportResponse?.reports === undefined ||
        reportResponse?.reports.length === 0 ? (
          <div className="mt-6 relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <FontAwesomeIcon
              className="mx-auto h-12 w-12 text-gray-400"
              icon={faRectangleList}
            />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              {t("reports.no_reports_found")}
            </span>
          </div>
        ) : (
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
          >
            {unresolvedReports?.map((report) => {
              return <ReportSummaryItem report={report} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
