
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { submitContactForm } from "@/app/actions"; // Assuming this action exists

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    try {
      const result = await submitContactForm(formData); // Using the server action
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message || "We'll get back to you soon.",
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: "Error Sending Message",
          description: result.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Contact Us</h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, 
          feel free to reach out.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <Send className="mr-3 h-6 w-6 text-accent" /> Send Us a Message
            </CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required disabled={isSubmitting} />
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8 pt-4">
          <h2 className="font-headline text-2xl font-semibold text-primary mb-6">Other Ways to Reach Us</h2>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-muted-foreground">For general inquiries, support, or feedback:</p>
              <a href="mailto:support@shopfront.com" className="text-primary hover:underline">support@shopfront.com</a>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-muted-foreground">Call us during business hours (9 AM - 5 PM, Mon-Fri):</p>
              <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Our Office</h3>
              <p className="text-muted-foreground">ShopFront Headquarters:</p>
              <p className="text-foreground">123 Commerce St, Suite 404<br />Tech City, Innovation State, 54321</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
