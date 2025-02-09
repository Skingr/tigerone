"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";

type FormData = {
  username: string;
  class_name: string;
  major: string;
  year: string;
  sex: string;
  age: number;
};

const steps = [
  { id: 1, name: "Account" },
  { id: 2, name: "Academic Info" },
  { id: 3, name: "Personal Info" },
];

/**
 * @todo:
 * - Add stepper form to collect user data
 * - name, major, year, sex, age
 * @note: Only submit form if all fields are filled
 * - save to db by calling createUser()
 * - redirect to home page
 */

export default function Start() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    class_name: "",
    major: "",
    year: "",
    sex: "",
    age: 0,
  });

  const { data: session } = useSession();

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.username.length >= 3;
      case 2:
        return formData.major && formData.year;
      case 3:
        return formData.sex && formData.age > 0;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else if (currentStep === steps.length) {
      try {
        const userToCreate = {
          username: formData.username,
          email: session?.user?.email,
          class_name: formData.class_name,
          major: formData.major,
          year: formData.year,
          sex: formData.sex,
          age: formData.age,
        };
        console.log(userToCreate);
        const response = await fetch("/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userToCreate),
        });

        if (response.ok) {
          router.push("/");
        } else {
          const error = await response.json();
          alert(error.error || "Error creating user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Error creating user");
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar">
      <div className="flex-1 flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-2xl px-8 items-center">
          <h1 className="text-5xl font-bold text-cc-gold mb-2 font-bebas text-center">
            Create Your Profile
          </h1>
          <p className="text-gray-500 mb-12 text-center">
            Step {currentStep} of {steps.length}
          </p>

          <div className="flex gap-12 mb-16 justify-center">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  step.id <= currentStep ? "text-cc-gold" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    step.id <= currentStep
                      ? "border-cc-gold"
                      : "border-gray-400"
                  }`}
                >
                  {step.id}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label className="text-cc-gold" htmlFor="username">
                    Name
                  </Label>
                  <Input
                    className="text-cc-gold placeholder:text-cc-gold rounded-full h-16 border border-cc-gold"
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    placeholder="Enter your name"
                  />
                  <p className="text-sm text-muted-foreground text-cc-gold">
                    Must be at least 3 characters long
                  </p>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="major">Major</Label>
                  <Select
                    value={formData.major}
                    onValueChange={(value: string) =>
                      handleInputChange("major", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer_science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="sciences">Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value: string) =>
                      handleInputChange("year", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freshman">Freshman</SelectItem>
                      <SelectItem value="sophomore">Sophomore</SelectItem>
                      <SelectItem value="junior">Junior</SelectItem>
                      <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class_name">Class Name (Optional)</Label>
                  <Input
                    id="class_name"
                    value={formData.class_name}
                    onChange={(e) =>
                      handleInputChange("class_name", e.target.value)
                    }
                    placeholder="Enter your class name"
                  />
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="sex">Sex</Label>
                  <Select
                    value={formData.sex}
                    onValueChange={(value: string) =>
                      handleInputChange("sex", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age || ""}
                    onChange={(e) =>
                      handleInputChange("age", parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter your age"
                    min="0"
                    max="120"
                  />
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-cc-gold text-cc-gold hover:bg-cc-gold hover:text-white"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-cc-gold text-white hover:bg-cc-gold/90"
            >
              {currentStep === steps.length ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
