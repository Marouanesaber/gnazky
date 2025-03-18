
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-center">
      <div className="container max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold">
          Join <span className="text-blue-600">PetClinic</span> Today
        </h3>
        <div className="flex gap-2">
          <Input placeholder="Email" className="w-48 sm:w-auto" />
          <Button className="bg-blue-600 whitespace-nowrap">Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterBanner;
