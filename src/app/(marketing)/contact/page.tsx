import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, GraduationCap } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen bg-muted/50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">Get in touch with us</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Contact Information</CardTitle>
            <CardDescription className="text-center">
              Reach out to us through any of these channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4 p-4 rounded-lg border">
                <Phone className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Phone Numbers</p>
                  <p className="text-muted-foreground">010 801 601</p>
                  <p className="text-muted-foreground">099 200 805</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-4 p-4 rounded-lg border">
                <a
                  href="https://maps.app.goo.gl/LLJZbfL2MBqT15EK8?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 hover:bg-accent rounded-lg p-2 transition-colors w-full"
                >
                  <MapPin className="h-8 w-8 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-primary hover:text-primary/80">PPIU Building #36, Street 169</p>
                    <p className="text-primary hover:text-primary/80">Sangkat Veal Vong, Khan 7 Makara</p>
                    <p className="text-primary hover:text-primary/80">Phnom Penh, Kingdom of Cambodia</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium text-foreground">Ready to Learn?</h3>
                </div>
                <p className="text-muted-foreground text-center">
                  Contact us today to explore our comprehensive training programs and AI learning opportunities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}