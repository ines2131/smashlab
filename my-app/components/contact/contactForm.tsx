"use client";
import { ContactFormValues, contactSchema } from "@/schemas/contact.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/services/contactService";
import { toast } from "sonner";
import Input from "../common/Input";
import Button from "../common/Button";

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

      reset();
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-1">
            We’ll get back to you as soon as possible
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              placeholder="Your name"
              className="w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              placeholder="Your email"
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Your message"
              {...register("message")}
              className="w-full min-h-[140px] resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
            />

            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
