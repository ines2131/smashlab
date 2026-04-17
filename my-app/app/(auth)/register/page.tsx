import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function Register() {
  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-blue-200" />

        <div className="flex flex-col justify-center px-20">
          <h2 className="text-xl font-bold mb-4">Register</h2>

          <div className="flex flex-col gap-3">
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Password" />
            <Input placeholder="Confirm Password" />
          </div>
          <Button>Register</Button>
        </div>
      </div>
    </div>
  );
}
