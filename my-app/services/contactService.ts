import { ContactFormData } from "@/types/contact";
import axios from "axios";

export async function submitContactForm(data: ContactFormData) {
  const { data: response } = await axios.post("/api/contact", data);
  return response;
}
