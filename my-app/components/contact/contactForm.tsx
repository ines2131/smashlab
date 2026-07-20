"use client";
import { ContactFormValues, contactSchema } from "@/schemas/contact.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/services/contactService";
import { toast } from "sonner";
import Button from "../common/Button";
import { gtmFormEvent } from "@/lib/tracking/gtm";

const FORM_ID = "contactus_form";
const FORM_NAME = "contact_form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContactForm(data);
      toast.success("Message sent!");

      gtmFormEvent("contact_form_submit", {
        form_id: FORM_ID,
        form_name: FORM_NAME,
        form_destination: window.location.pathname,
      });

      reset();
    } catch (error) {
      toast.error("Failed to send message");

      gtmFormEvent("contact_form_submit_error", {
        form_id: FORM_ID,
        form_name: FORM_NAME,
      });
    }
  };

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-lg border p-3 text-sm transition focus:outline-none focus:ring-2 ${
      hasError
        ? "border-red-300 focus:ring-red-200 focus:border-red-400"
        : "border-gray-300 focus:ring-black/10 focus:border-black"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-1.5">
            We&apos;ll get back to you as soon as possible
          </p>
        </div>

        <form
          id={FORM_ID}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
          noValidate
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Name
            </label>
            <input
              id="contactus_name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass(!!errors.name)}
              {...register("name")}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              id="contactus_email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass(!!errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Message
            </label>
            <textarea
              id="contactus_message"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              {...register("message")}
              className={`min-h-[140px] resize-none ${inputClass(!!errors.message)}`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting}>
            <span className="flex items-center justify-center gap-2">
              {isSubmitting && (
                <span className="animate-spin h-4 w-4 border-2 border-white/40 border-t-white rounded-full shrink-0" />
              )}
              {isSubmitting ? "Sending..." : "Send Message"}
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
