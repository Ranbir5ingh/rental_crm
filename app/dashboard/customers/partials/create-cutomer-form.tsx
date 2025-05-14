"use client";

import { useForm } from "react-hook-form";
import { User, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FileUploadPlaceholder from "@/components/file-upload-placeholder";
import { useState, useTransition } from "react";

type CustomerFormData = {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  gender?: string;
  status?: string;
  profile?: string;
  aadharFront?: string;
  aadharBack?: string;
  drivingLic?: string;
};

type CreateCustomerFormProps = {
  initialData?: CustomerFormData;
  onSubmit: (data: any) => Promise<void>;
  submitLabel: string;
  title: string;
};

export function CreateCustomerForm({
  initialData,
  onSubmit,
  submitLabel,
  title,
}: CreateCustomerFormProps) {
  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 18));
  const [isPending, startTransition] = useTransition();
  const [profile, setProfile] = useState<File | null>(null);
  const [aadharFront, setAadharFront] = useState<File | null>(null);
  const [aadharBack, setAadharBack] = useState<File | null>(null);
  const [drivingLic, setDrivingLic] = useState<File | null>(null);
  
  const form = useForm({
    defaultValues: initialData
      ? {
          ...initialData,
          aadharFront: undefined,
          aadharBack: undefined,
          drivingLic: undefined,
          profile: undefined,
        }
      : {
          full_name: "",
          email: "",
          phone: "",
          address: "",
          date_of_birth: minDate.toISOString(),
        },
    mode: "onChange",
  });

  async function handleSubmit(data: CustomerFormData) {
    startTransition(async () => {
      if (profile) data.profile = profile as any;
      if (aadharFront) data.aadharFront = aadharFront as any;
      if (aadharBack) data.aadharBack = aadharBack as any;
      if (drivingLic) data.drivingLic = drivingLic as any;

      await onSubmit(data);
    });
  }

  return (
    <div className="w-full mx-auto p-4 md:p-6 lg:p-10 bg-white text-black rounded-lg">
      <h2 className="text-xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {title}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="space-y-4">
              {/* Profile Photo */}
              <FormField
                control={form.control}
                name="profile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Upload Customer Photo
                    </FormLabel>

                    <FormControl>
                      <label className="flex flex-col justify-center items-center py-4 mx-auto">
                        <div className="w-32 h-32 md:w-36 md:h-36 relative rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                          {initialData?.profile || profile ? (
                            <img
                              src={
                                (profile && URL.createObjectURL(profile)) ??
                                initialData?.profile ??
                                "/placeholder.svg"
                              }
                              alt="Preview"
                              className="h-full w-full object-cover rounded-full"
                            />
                          ) : (
                            <FileUploadPlaceholder />
                          )}
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setProfile(file);
                            }
                          }}
                        />
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Full Name */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Full Name
                    </FormLabel>
                    <FormControl className="relative">
                      <div>
                        <Input
                          placeholder="Enter name"
                          {...field}
                          className="pl-8 bg-gray-100"
                        />
                        <User className="w-4 h-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                key="phone"
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input
                          disabled
                          value="+91"
                          className="w-16 bg-gray-100"
                        />
                        <Input
                          {...field}
                          key="phone"
                          placeholder="Enter phone no."
                          type="tel"
                          className="flex-1 bg-gray-100"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                key="email"
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        key="email"
                        placeholder="Enter Email"
                        type="email"
                        className="bg-gray-100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Address"
                        className="resize-none bg-gray-100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              {/* Gender and Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Gender
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-gray-100">
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Status
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="bg-gray-100">
                          <SelectTrigger>
                            <SelectValue placeholder="Please Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="BLACKLISTED">
                            Blacklisted
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2 md:col-span-1">
                      <FormLabel className="font-bold text-lg">
                        Date of Birth
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : minDate.toISOString().split("T")[0]
                          }
                          className="bg-gray-100"
                          onInput={(e) => {
                            const inputValue = (e.target as HTMLInputElement).value;
                            const selectedDate = new Date(inputValue);
                            field.onChange(selectedDate?.toISOString());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Aadhar Front and Back */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                <FormField
                  control={form.control}
                  name="aadharFront"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Upload Aadhar Front photo
                      </FormLabel>

                      <FormControl>
                        <label className="block h-[180px]">
                          <div className="border-2 border-dashed w-full rounded-lg text-center cursor-pointer h-full aspect-[3/4] transition-colors flex justify-center items-center">
                            {initialData?.aadharFront || aadharFront ? (
                              <div className="relative w-full h-full m-auto">
                                <img
                                  src={
                                    (aadharFront &&
                                      URL.createObjectURL(aadharFront)) ??
                                    initialData?.aadharFront ??
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="rounded-md object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <FileUploadPlaceholder />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setAadharFront(file);
                                }
                              }}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="aadharBack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-lg">
                        Upload Aadhar Back photo
                      </FormLabel>

                      <FormControl>
                        <label className="block h-[180px]">
                          <div className="border-2 border-dashed w-full rounded-lg text-center cursor-pointer h-full aspect-[3/4] transition-colors flex justify-center items-center">
                            {initialData?.aadharBack || aadharBack ? (
                              <div className="relative w-full h-full m-auto">
                                <img
                                  src={
                                    (aadharBack &&
                                      URL.createObjectURL(aadharBack)) ??
                                    initialData?.aadharBack ??
                                    "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  className="rounded-md object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <FileUploadPlaceholder />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setAadharBack(file);
                                }
                              }}
                            />
                          </div>
                        </label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Driving License */}
              <FormField
                control={form.control}
                name="drivingLic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-lg">
                      Upload Driving License photo
                    </FormLabel>

                    <FormControl>
                      <label className="block h-[200px]">
                        <div className="relative border-2 border-dashed w-full rounded-lg text-center cursor-pointer h-full overflow-hidden transition-colors flex justify-center items-center">
                          {initialData?.drivingLic || drivingLic ? (
                            <div className="relative w-full h-full m-auto">
                              <img
                                src={
                                  (drivingLic &&
                                    URL.createObjectURL(drivingLic)) ??
                                  initialData?.drivingLic ??
                                  "/placeholder.svg"
                                }
                                alt="Preview"
                                className="rounded-md w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <FileUploadPlaceholder />
                          )}
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setDrivingLic(file);
                              }
                            }}
                          />
                        </div>
                      </label>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-center mt-6 mb-4">
            <Button
              type="submit"
              className="w-full sm:w-80 bg-black text-white hover:bg-gray-700 font-bold py-2"
              disabled={isPending}
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin" size={20} />
                  <span>{submitLabel === "Update" ? "Updating" : "Submitting"}</span>
                </div>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}