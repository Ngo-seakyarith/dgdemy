import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, GraduationCap, Mail } from 'lucide-react';

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
                <Mail className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Email</p>
                  <a href="mailto:contact@dgdemy.org" className="text-primary hover:text-primary/80">contact@dgdemy.org</a>
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

              <div className="mt-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909!2d104.910923!3d11.563598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMTEuNTYzNTk4LDEwNC45MTA5MjM!5e0!3m2!1sen!2s!4v1!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: 10 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
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