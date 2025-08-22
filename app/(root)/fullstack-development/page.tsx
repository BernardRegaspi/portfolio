import React from "react";
import PageTransition from "@/components/PageTransition";

const FullstackDevelopment = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <PageTransition />
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Fullstack Development
        </h1>
        <div className="bg-card p-6 rounded-lg border border-border">
          <p className="text-muted-foreground text-lg">
            Welcome to the Fullstack Development section. Here you&apos;ll find
            information about my full-stack development services and projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullstackDevelopment;
