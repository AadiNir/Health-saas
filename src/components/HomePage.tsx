import { useState } from "react";
import { Button, IconButton, Typography, Container, Grid, Paper, AppBar, Toolbar, Link } from "@mui/material";
import { Crop, Move, Sliders, Ruler, ArrowRight, CheckCircle, Sun, Moon } from "lucide-react";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900";

  return (
    <div className={`flex flex-col min-h-screen ${themeClasses}`}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0} className="border-b">
        <Toolbar>
          <Link href="#" underline="none" className="flex items-center">
            <Crop className="h-6 w-6 text-primary" />
            <Typography variant="h6" className="ml-2 font-bold text-primary">
              MediMorph
            </Typography>
          </Link>
          <div className="ml-auto flex gap-4">
            <Link href="#features" color="inherit" underline="hover">
              Features
            </Link>
            <Link href="#testimonials" color="inherit" underline="hover">
              Testimonials
            </Link>
            <Link href="#pricing" color="inherit" underline="hover">
              Pricing
            </Link>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Sun /> : <Moon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <Container>
            <div className="text-center">
              <Typography variant="h3" className="font-bold tracking-tight mb-4">
                Transform Medical Imaging with MediMorph
              </Typography>
              <Typography variant="subtitle1" className="mb-6">
                Powerful image manipulation and unit conversion for healthcare professionals.
                Enhance diagnostics and streamline your workflow.
              </Typography>
             
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-24 lg:py-32">
          <Container>
            <Typography
              variant="h4"
              className="font-bold tracking-tight text-center mb-12"
            >
              Powerful Features for Medical Imaging
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  icon: <Crop />,
                  title: "Precise Cropping",
                  description: "Accurately crop medical images to focus on specific areas of interest, enhancing diagnostic precision.",
                },
                {
                  icon: <Move />,
                  title: "Intuitive Panning",
                  description: "Smoothly navigate through high-resolution medical images with our responsive panning tool.",
                },
                {
                  icon: <Sliders />,
                  title: "Advanced Adjustments",
                  description: "Fine-tune contrast, brightness, and other parameters to reveal crucial details in medical scans.",
                },
                {
                  icon: <Ruler />,
                  title: "Unit Conversion",
                  description: "Instantly convert pixel measurements to real-world units, ensuring accurate size assessments.",
                },
                {
                  icon: <CheckCircle />,
                  title: "3D Reconstruction",
                  description: "Create detailed 3D models from 2D scans, providing a comprehensive view of anatomical structures.",
                },
                {
                  icon: <CheckCircle />,
                  title: "AI-Assisted Analysis",
                  description: "Leverage machine learning algorithms to detect anomalies and assist in preliminary diagnoses.",
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper elevation={3} className="p-6 h-full flex flex-col">
                    <div className="text-primary mb-4">{feature.icon}</div>
                    <Typography variant="h6" className="mb-2">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2">{feature.description}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t">
        <Container className="flex justify-between items-center">
          <Typography variant="caption">© 2023 MediMorph. All rights reserved.</Typography>
          <div className="flex gap-4">
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </div>
        </Container>
      </footer>
    </div>
  );
}
