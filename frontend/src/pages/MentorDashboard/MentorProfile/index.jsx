import React, { lazy, Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { updateMentorDescription } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DisplayContent } from "@/utils/DecodeHtml";
import CircleLoader from "@/components/loader/CircleLoader";

const MentorBio = lazy(() => import("./MentorBio"));

const MentorProfileImage = lazy(() => import("./MentorProfileImage"));

const MentorProfile = () => {
  const { user, updateUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState(
    user?.description || "Current mentor about description..."
  );

  const mentorId = user?._id;
  // React Query Mutation
  const mutation = useMutation(updateMentorDescription, {
    onSuccess: (data) => {
      setDescription(data.description);
      console.log(description);
      updateUser({ description: data.description });
      setIsModalOpen(false);
      console.log("Description updated successfully");
    },
    onError: (error) => {
      console.error("Error updating description:", error);
    },
  });

  // Handle Submit
  const handleSubmit = () => {
    mutation.mutate({ description, mentorId });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header Section */}
      <div className="flex items-start gap-6 mb-8">
        <Suspense fallback={<CircleLoader />}>
          
          <MentorProfileImage />
        </Suspense>

        <div className="flex-1">
          <Suspense fallback={<CircleLoader />}>
            <MentorBio />
          </Suspense>
        </div>
      </div>

      {/* Bio Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Bio</h2>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Bio
            </Button>
          </div>
          <p className="text-gray-600">
            Passionate about helping others grow in their tech journey. With
            over 8 years of experience in full-stack development, I love sharing
            knowledge and guiding aspiring developers.
          </p>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">About</h2>
            <Dialog className="h-64">
              <DialogTrigger className="flex items-center gap-x-2">
                <Pencil className="w-4 h-4 mr-2" />
                Edit About
              </DialogTrigger>
              <DialogContent className="bg-white text-black">
                <DialogHeader>
                  <DialogTitle>Edit About</DialogTitle>
                  <DialogDescription>
                    <ReactQuill value={description} onChange={setDescription} />
                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        onClick={() => setIsModalOpen(false)}
                        disabled={mutation.isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={mutation.isLoading}
                      >
                        {mutation.isLoading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <DisplayContent content={description} />
          </div>
        </CardContent>
      </Card>

      {/* Update Description Model */}
      {/* {isModalOpen && (
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg w-full max-w-lg p-6">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Edit About
            </Dialog.Title>
            <ReactQuill value={description} onChange={setDescription} />
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                disabled={mutation.isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </Dialog>
      )} */}

      {/* Skills Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Skills</h2>
            <Button variant="ghost" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Skills
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Node.js",
              "Python",
              "JavaScript",
              "TypeScript",
              "AWS",
              "System Design",
              "Agile Methodologies",
              "Team Leadership",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MentorProfile;
