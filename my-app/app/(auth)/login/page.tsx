import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function Login() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-orange-200" />
      <div className="flex flex-col justify-center px-20">
        <h2 className="text-xl font-bold mb-4">Log In</h2>

        <div className="flex flex-col gap-3">
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
        </div>
        <Button>Log In</Button>
      </div>
    </div>
  );
}
