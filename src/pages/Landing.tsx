import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, Linkedin, Code, Zap, Star, Download, Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ThreeScene } from '@/components/landing/ThreeScene';
import { AnimatedCounter } from '@/components/landing/AnimatedCounter';
import { RotatingMockup } from '@/components/landing/RotatingMockup';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Landing() {
  const [isBeforeResume, setIsBeforeResume] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">DevElevate</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => window.location.href = '/auth'}>Log In</Button>
              <Button variant="gradient" onClick={() => window.location.href = '/auth'}>Try for Free</Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 -z-10">
          <ThreeScene />
        </div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <Badge variant="outline" className="mb-4">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Developer Tools
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Resume and Portfolio.{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Supercharged by AI.
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Connect GitHub and LinkedIn. Let DevElevate create job-winning resumes, 
                  cover letters, and sleek portfolios in minutes.
                </p>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="gradient" className="group" onClick={() => window.location.href = '/auth'}>
                  Try for Free
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter from={0} to={10} />k+
                  </div>
                  <div className="text-sm text-muted-foreground">Portfolios Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter from={0} to={85} />%
                  </div>
                  <div className="text-sm text-muted-foreground">ATS Match Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    <AnimatedCounter from={0} to={3} />x
                  </div>
                  <div className="text-sm text-muted-foreground">Interview Rate</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <RotatingMockup />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              From Repos to Recruiters in 3 Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple process, powerful results
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Connect GitHub + Resume",
                description: "We extract your contributions and experience",
                icon: Github
              },
              {
                step: "02", 
                title: "Pick Role & Design",
                description: "Tailored templates for SDE, frontend, backend, interns, etc.",
                icon: Code
              },
              {
                step: "03",
                title: "Get Refined Outputs", 
                description: "Resume, cover letter, and portfolio — job-ready in minutes",
                icon: Zap
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="relative p-6 h-full border-2 hover:border-primary/20 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 text-4xl font-bold text-muted-foreground/20">
                      {item.step}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Resume Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold">
                AI-Polished Resumes That <span className="text-primary">Speak Recruiter</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Optimized for job keywords</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Quantified impact and clarity</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Multiple templates (minimal, modern, classic)</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsBeforeResume(!isBeforeResume)}
                className="mt-6"
              >
                {isBeforeResume ? 'Show After' : 'Show Before'}
              </Button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Software Engineer Resume</h3>
                    <Badge variant={isBeforeResume ? "destructive" : "secondary"} 
                           className={isBeforeResume ? "" : "bg-green-100 text-green-800"}>
                      {isBeforeResume ? 'Before AI' : 'After AI'}
                    </Badge>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-2 border-primary pl-3">
                      <p className="font-medium">
                        {isBeforeResume 
                          ? 'Worked on web development projects'
                          : 'Led development of 3 full-stack applications serving 10k+ users, improving performance by 40%'
                        }
                      </p>
                    </div>
                    <div className="border-l-2 border-muted pl-3">
                      <p>
                        {isBeforeResume
                          ? 'Used React and Node.js'
                          : 'Built scalable React.js frontends and Node.js APIs with MongoDB, deployed via Docker/AWS'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Generator */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Your Projects. <span className="text-primary">Showcased Professionally.</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "E-commerce App", tech: "React, Node.js", stars: 127 },
              { name: "Portfolio Site", tech: "Next.js, Tailwind", stars: 89 },
              { name: "Chat Application", tech: "Socket.io, Express", stars: 203 }
            ].map((project, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{project.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{project.tech}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Globe className="w-3 h-3 mr-1" />
                        Live
                      </Button>
                      <Button size="sm" variant="outline">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-6 border-2">
                <CardHeader className="pb-4">
                  <CardTitle>Free</CardTitle>
                  <div className="text-3xl font-bold">$0</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li>✓ 1 resume + 1 portfolio</li>
                    <li>✓ Basic templates</li>
                    <li>✓ AI edits</li>
                  </ul>
                  <Button className="w-full" variant="outline">Start for Free</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 border-2 border-primary relative">
                <Badge className="absolute -top-3 left-6">Popular</Badge>
                <CardHeader className="pb-4">
                  <CardTitle>Pro</CardTitle>
                  <div className="text-3xl font-bold">$19<span className="text-sm font-normal">/month</span></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-sm">
                    <li>✓ Unlimited resumes</li>
                    <li>✓ Advanced AI tools</li>
                    <li>✓ Custom domain</li>
                    <li>✓ Export options</li>
                  </ul>
                  <Button className="w-full" variant="gradient">Upgrade to Pro</Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border rounded-lg px-4">
                <AccordionTrigger>Is this free to try?</AccordionTrigger>
                <AccordionContent>
                  Yes! You can create 1 resume and 1 portfolio for free to test our platform.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border rounded-lg px-4">
                <AccordionTrigger>Can I export to PDF?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! All resumes and cover letters can be exported as professional PDFs.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border rounded-lg px-4">
                <AccordionTrigger>Can it generate internship resumes?</AccordionTrigger>
                <AccordionContent>
                  Yes, we have specialized templates and AI prompts for internships and entry-level positions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border rounded-lg px-4">
                <AccordionTrigger>Do you support job tracking?</AccordionTrigger>
                <AccordionContent>
                  Pro users get access to our application tracking dashboard to monitor their job search progress.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-foreground" />
                </div>
                <span className="text-xl font-bold">DevElevate</span>
              </div>
              <p className="text-muted text-sm">
                AI-powered tools for developers to create outstanding resumes and portfolios.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted hover:text-background transition-colors">Features</a>
                <a href="#" className="block text-muted hover:text-background transition-colors">Pricing</a>
                <a href="#" className="block text-muted hover:text-background transition-colors">Documentation</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted hover:text-background transition-colors">Privacy Policy</a>
                <a href="#" className="block text-muted hover:text-background transition-colors">Terms of Service</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <Github className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-muted hover:text-background cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          <div className="border-t border-muted mt-8 pt-8 text-center text-sm text-muted">
            © 2024 DevElevate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}