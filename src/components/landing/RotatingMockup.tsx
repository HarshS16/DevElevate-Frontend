import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Star, Globe, Code } from 'lucide-react';

const mockups = [
  {
    type: 'github',
    title: 'GitHub Activity',
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Github className="w-4 h-4" />
          <span className="font-mono text-sm">john-dev/awesome-project</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>React E-commerce App</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>127</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            Full-stack e-commerce platform with payment integration
          </div>
          <div className="flex gap-1">
            <Badge variant="secondary" className="text-xs">React</Badge>
            <Badge variant="secondary" className="text-xs">Node.js</Badge>
            <Badge variant="secondary" className="text-xs">MongoDB</Badge>
          </div>
        </div>
      </div>
    )
  },
  {
    type: 'resume',
    title: 'AI-Generated Resume',
    content: (
      <div className="space-y-3">
        <div className="text-center">
          <h3 className="font-semibold">John Developer</h3>
          <p className="text-sm text-muted-foreground">Full-Stack Software Engineer</p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="border-l-2 border-primary pl-2">
            <p className="font-medium">Led development of 3 full-stack applications</p>
            <p className="text-muted-foreground">Serving 10k+ users, improved performance by 40%</p>
          </div>
          <div className="border-l-2 border-muted pl-2">
            <p className="font-medium">Built scalable React.js frontends</p>
            <p className="text-muted-foreground">With Node.js APIs, deployed via Docker/AWS</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">ATS Optimized</Badge>
      </div>
    )
  },
  {
    type: 'portfolio',
    title: 'Portfolio Preview',
    content: (
      <div className="space-y-3">
        <div className="text-center">
          <h3 className="font-semibold">john.dev</h3>
          <p className="text-sm text-muted-foreground">Professional Developer Portfolio</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 border rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <Code className="w-3 h-3" />
              <span className="font-medium">E-commerce</span>
            </div>
            <div className="flex gap-1">
              <Globe className="w-3 h-3" />
              <Github className="w-3 h-3" />
            </div>
          </div>
          <div className="p-2 border rounded text-xs">
            <div className="flex items-center gap-1 mb-1">
              <Code className="w-3 h-3" />
              <span className="font-medium">Chat App</span>
            </div>
            <div className="flex gap-1">
              <Globe className="w-3 h-3" />
              <Github className="w-3 h-3" />
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs">Custom Domain</Badge>
      </div>
    )
  }
];

export function RotatingMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockups.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-sm mx-auto shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{mockups[currentIndex].title}</CardTitle>
            </CardHeader>
            <CardContent>
              {mockups[currentIndex].content}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-center mt-4 gap-2">
        {mockups.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}