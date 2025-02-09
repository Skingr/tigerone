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
                    <SelectTrigger className="bg-white text-black border-gray-200">
                      <SelectValue placeholder="Select your major" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 max-h-[300px] overflow-y-auto">
                      <SelectItem
                        value="anthropology"
                        className="hover:bg-gray-100"
                      >
                        Anthropology
                      </SelectItem>
                      <SelectItem value="art" className="hover:bg-gray-100">
                        Art
                      </SelectItem>
                      <SelectItem
                        value="asian_studies"
                        className="hover:bg-gray-100"
                      >
                        Asian Studies
                      </SelectItem>
                      <SelectItem value="besoc" className="hover:bg-gray-100">
                        Business, Economics, and Society (BESoc)
                      </SelectItem>
                      <SelectItem
                        value="chemistry_biochemistry"
                        className="hover:bg-gray-100"
                      >
                        Chemistry and Biochemistry
                      </SelectItem>
                      <SelectItem
                        value="classics"
                        className="hover:bg-gray-100"
                      >
                        Classics
                      </SelectItem>
                      <SelectItem
                        value="classics_english"
                        className="hover:bg-gray-100"
                      >
                        Classics-English
                      </SelectItem>
                      <SelectItem
                        value="classics_history_politics"
                        className="hover:bg-gray-100"
                      >
                        Classics-History-Politics
                      </SelectItem>
                      <SelectItem
                        value="comparative_literature"
                        className="hover:bg-gray-100"
                      >
                        Comparative Literature
                      </SelectItem>
                      <SelectItem
                        value="computer_science"
                        className="hover:bg-gray-100"
                      >
                        Computer Science
                      </SelectItem>
                      <SelectItem
                        value="economics"
                        className="hover:bg-gray-100"
                      >
                        Economics
                      </SelectItem>
                      <SelectItem
                        value="education"
                        className="hover:bg-gray-100"
                      >
                        Education
                      </SelectItem>
                      <SelectItem value="english" className="hover:bg-gray-100">
                        English
                      </SelectItem>
                      <SelectItem
                        value="environmental_studies"
                        className="hover:bg-gray-100"
                      >
                        Environmental Studies and Science
                      </SelectItem>
                      <SelectItem
                        value="feminist_gender_studies"
                        className="hover:bg-gray-100"
                      >
                        Feminist and Gender Studies
                      </SelectItem>
                      <SelectItem
                        value="film_media_studies"
                        className="hover:bg-gray-100"
                      >
                        Film and Media Studies
                      </SelectItem>
                      <SelectItem value="french" className="hover:bg-gray-100">
                        French
                      </SelectItem>
                      <SelectItem value="geology" className="hover:bg-gray-100">
                        Geology
                      </SelectItem>
                      <SelectItem value="german" className="hover:bg-gray-100">
                        German
                      </SelectItem>
                      <SelectItem
                        value="hispanic_studies"
                        className="hover:bg-gray-100"
                      >
                        Hispanic Studies
                      </SelectItem>
                      <SelectItem value="history" className="hover:bg-gray-100">
                        History
                      </SelectItem>
                      <SelectItem
                        value="history_philosophy"
                        className="hover:bg-gray-100"
                      >
                        History-Philosophy
                      </SelectItem>
                      <SelectItem
                        value="history_political_science"
                        className="hover:bg-gray-100"
                      >
                        History-Political Science
                      </SelectItem>
                      <SelectItem value="idm" className="hover:bg-gray-100">
                        Independently Designed Major/IDM
                      </SelectItem>
                      <SelectItem
                        value="international_political_economy"
                        className="hover:bg-gray-100"
                      >
                        International Political Economy
                      </SelectItem>
                      <SelectItem value="italian" className="hover:bg-gray-100">
                        Italian
                      </SelectItem>
                      <SelectItem
                        value="mathematical_economics"
                        className="hover:bg-gray-100"
                      >
                        Mathematical Economics
                      </SelectItem>
                      <SelectItem
                        value="mathematics"
                        className="hover:bg-gray-100"
                      >
                        Mathematics
                      </SelectItem>
                      <SelectItem
                        value="molecular_biology"
                        className="hover:bg-gray-100"
                      >
                        Molecular Biology
                      </SelectItem>
                      <SelectItem value="music" className="hover:bg-gray-100">
                        Music
                      </SelectItem>
                      <SelectItem
                        value="neuroscience"
                        className="hover:bg-gray-100"
                      >
                        Neuroscience
                      </SelectItem>
                      <SelectItem
                        value="organismal_biology_ecology"
                        className="hover:bg-gray-100"
                      >
                        Organismal Biology and Ecology
                      </SelectItem>
                      <SelectItem
                        value="philosophy"
                        className="hover:bg-gray-100"
                      >
                        Philosophy
                      </SelectItem>
                      <SelectItem value="physics" className="hover:bg-gray-100">
                        Physics
                      </SelectItem>
                      <SelectItem
                        value="political_science"
                        className="hover:bg-gray-100"
                      >
                        Political Science
                      </SelectItem>
                      <SelectItem
                        value="psychology"
                        className="hover:bg-gray-100"
                      >
                        Psychology
                      </SelectItem>
                      <SelectItem
                        value="race_ethnicity_migration"
                        className="hover:bg-gray-100"
                      >
                        Race, Ethnicity, and Migration Studies
                      </SelectItem>
                      <SelectItem
                        value="religion"
                        className="hover:bg-gray-100"
                      >
                        Religion
                      </SelectItem>
                      <SelectItem
                        value="russian_eurasian_studies"
                        className="hover:bg-gray-100"
                      >
                        Russian and Eurasian Studies
                      </SelectItem>
                      <SelectItem
                        value="sociology"
                        className="hover:bg-gray-100"
                      >
                        Sociology
                      </SelectItem>
                      <SelectItem
                        value="southwest_studies"
                        className="hover:bg-gray-100"
                      >
                        Southwest Studies
                      </SelectItem>
                      <SelectItem
                        value="theatre_dance"
                        className="hover:bg-gray-100"
                      >
                        Theatre and Dance
                      </SelectItem>
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
                    <SelectTrigger className="bg-white text-black border-gray-200">
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem
                        value="freshman"
                        className="hover:bg-gray-100"
                      >
                        Freshman
                      </SelectItem>
                      <SelectItem
                        value="sophomore"
                        className="hover:bg-gray-100"
                      >
                        Sophomore
                      </SelectItem>
                      <SelectItem value="junior" className="hover:bg-gray-100">
                        Junior
                      </SelectItem>
                      <SelectItem value="senior" className="hover:bg-gray-100">
                        Senior
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class_name">Current Class Name</Label>
                  <Input
                    id="class_name"
                    value={formData.class_name}
                    onChange={(e) =>
                      handleInputChange("class_name", e.target.value)
                    }
                    placeholder="Enter your current class"
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
                    <SelectTrigger className="bg-white text-black border-gray-200">
                      <SelectValue placeholder="Select your sex" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200">
                      <SelectItem value="male" className="hover:bg-gray-100">
                        Male
                      </SelectItem>
                      <SelectItem value="female" className="hover:bg-gray-100">
                        Female
                      </SelectItem>
                      <SelectItem value="other" className="hover:bg-gray-100">
                        Other
                      </SelectItem>
                      <SelectItem
                        value="prefer_not_to_say"
                        className="hover:bg-gray-100"
                      >
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
