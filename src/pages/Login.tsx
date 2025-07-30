import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import z from "zod";

const formSchema = z.object({ email: z.email(), password: z.string() });

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = () => {
    console.log("hi");
  };

  return (
    <div className="flex items-center justify-center m-5">
      <Card className="w-1/3 h-full">
        <CardHeader>
          <CardTitle className="text-3xl mb-3">로그인</CardTitle>
          <CardAction className="flex gap-4">
            <span className="text-gray-500">아직 회원이 아니신가요?</span>
            <Link to="/signup" className="hover:underline">
              회원가입
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="hover:cursor-pointer">
                로그인
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
