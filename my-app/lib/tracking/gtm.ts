import { pushToDataLayer } from "./dataLayer";

type FormEventParams = {
  form_id: string;
  form_name: string;
  form_destination?: string;
  error_fields?: string;
};

export function gtmFormEvent(
  eventName:
    | "contact_form_submit"
    | "contact_form_submit_error"
    | "contact_form_submit_validation_error",
  params: FormEventParams,
) {
  pushToDataLayer({
    ecommerce: undefined,
    form_id: undefined,
    form_name: undefined,
    form_destination: undefined,
    error_fields: undefined,
  });
  pushToDataLayer({
    event: eventName,
    ...params,
  });
}
