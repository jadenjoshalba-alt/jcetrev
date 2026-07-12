import { useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, GraduationCap, Plus, ArrowRight } from "lucide-react";
import { useUpcatCountdown } from "@/hooks/useCountdown";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UNIVERSITIES = [
  { 
    id: 'upcat', 
    name: 'University of the Philippines - (UPCAT 2027)', 
    date: 'August 1-2, 2026',
    description: ''
  }
];

export default function Dashboard() {
  const { toast } = useToast();
  const upcatDaysLeft = useUpcatCountdown();

  const handleAddUniversity = () => {
    toast({
      title: "Coming Soon",
      description: "More universities will be added in a future update.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-4xl mx-auto w-full">
        <div className="space-y-4 text-center py-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Welcome to IskolarTrack
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Prepare for upcoming CETs with our high-fidelity mock test environment.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">My Universities</h2>
          <Button onClick={handleAddUniversity} className="gap-2">
            <Plus className="h-4 w-4" />
            Add University
          </Button>
        </div>

        <div className="grid gap-6">
          {UNIVERSITIES.map((uni) => (
            <Card key={uni.id} className="overflow-hidden border-2 transition-all hover:border-primary/50">
              <div className="flex flex-col md:flex-row">
                {/* Left side info */}
                <div className="p-6 flex-1 flex flex-col justify-center space-y-4 bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl font-bold">{uni.name}</CardTitle>
                      <p className="text-lg font-semibold text-primary mt-1">
                        {uni.date || "TBA"}
                      </p>
                      {uni.description && (
                        <CardDescription className="mt-2 text-base">
                          {uni.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-background border rounded-lg px-4 py-3 w-fit">
                    <Clock className="h-5 w-5 text-primary" />
                    {uni.id === 'upcat' ? (
                      <div className="text-sm">
                        <span className="font-bold text-lg">{upcatDaysLeft} days remaining</span>
                      </div>
                    ) : uni.date ? (
                      <div className="text-sm">
                        <span className="font-bold text-lg">{uni.date}</span>
                      </div>
                    ) : (
                      <div className="text-sm">
                        <span className="font-bold text-lg">TBA</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right side action */}
                <div className="p-6 flex items-center justify-center bg-card md:border-l border-t md:border-t-0 md:w-64 shrink-0">
                  <Link href={`/university/${uni.id}`} className="w-full">
                    <Button size="lg" className="w-full gap-2 text-base h-12 shadow-sm">
                      Study Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
