import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

const formSchema = z
  .object({
    email: z.email({ error: "이메일 형식이 맞지 않습니다." }),
    password: z
      .string()
      .min(8, { error: "비밀번호는 8자리 이상이어야 합니다." }),
    checkPassword: z.string().min(1, { error: "필수항목입니다." }),
    phone: z.string().min(1, { error: "필수항목입니다." }),
    address: z.string().min(1, { error: "필수항목입니다." }),
  })
  .refine((data) => data.password === data.checkPassword, {
    error: "비밀번호가 다릅니다.",
    path: ["checkPassword"],
  });

export default function Signup() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email, password, address, phone } = data;
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const id = createdUser.user.uid;

      await setDoc(doc(db, "users", id), { address, phone });
      console.log("성공", createdUser);
      setSuccess(true);
      await signOut(auth);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (e) {
      console.log("에러: ", e);
    }
  };

  return (
    <div className="flex items-center justify-center m-5">
      {success && (
        <Alert className="fixed top-5 bg-gray-300 transition w-1/2 shadow">
          <AlertTitle>
            회원가입에 성공했습니다! 로그인 페이지로 이동합니다.
          </AlertTitle>
        </Alert>
      )}
      <Card className="w-1/3 h-full">
        <CardHeader>
          <CardTitle className="text-3xl mb-3">회원가입</CardTitle>
          <CardAction className="flex gap-4">
            <span className="text-gray-500">이미 회원이신가요?</span>
            <Link to="/login" className="hover:underline">
              로그인
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
                    <FormLabel>
                      이메일<span className="text-red-500">*</span>
                    </FormLabel>
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
                    <FormLabel>
                      비밀번호<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="checkPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      비밀번호 확인<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="check password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      전화번호<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      주소<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardDescription>* 은 필수항목입니다.</CardDescription>
              <Button type="submit" className="hover:cursor-pointer">
                회원가입
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

//이메일 중복 확인 기능
//회원가입 후 로그인 페이지로 이동.
