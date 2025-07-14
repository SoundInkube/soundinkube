import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Music, Award, Globe, Heart, Zap } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Alex Rivera",
      role: "CEO & Founder",
      avatar: "AR",
      bio: "Grammy-nominated producer with 15+ years in the music industry. Passionate about connecting artists worldwide."
    },
    {
      name: "Sarah Chen",
      role: "Head of Community",
      avatar: "SC",
      bio: "Professional vocalist and music educator. Building bridges between artists and opportunities."
    },
    {
      name: "Marcus Johnson",
      role: "Chief Technology Officer",
      avatar: "MJ",
      bio: "Berklee graduate and full-stack developer. Creating the future of music collaboration technology."
    },
    {
      name: "Elena Vasquez",
      role: "Head of Operations",
      avatar: "EV",
      bio: "Award-winning audio engineer with expertise in scaling creative platforms and workflows."
    }
  ];

  const stats = [
    { number: "10K+", label: "Music Professionals", icon: <Users className="text-white h-8 w-8 text-netflix-red" /> },
    { number: "50K+", label: "Projects Completed", icon: <Music className="text-white h-8 w-8 text-netflix-red" /> },
    { number: "200+", label: "Cities Worldwide", icon: <Globe className="text-white h-8 w-8 text-netflix-red" /> },
    { number: "95%", label: "Client Satisfaction", icon: <Award className="text-white h-8 w-8 text-netflix-red" /> }
  ];

  const values = [
    {
      icon: <Music className="text-white h-8 w-8 text-netflix-red" />,
      title: "Music First",
      description: "Every decision we make is guided by what's best for the music and the artists who create it."
    },
    {
      icon: <Users className="text-white h-8 w-8 text-netflix-red" />,
      title: "Community Driven",
      description: "We believe in the power of collaboration and building meaningful connections between creators."
    },
    {
      icon: <Zap className="text-white h-8 w-8 text-netflix-red" />,
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in music technology and collaboration."
    },
    {
      icon: <Heart className="text-white h-8 w-8 text-netflix-red" />,
      title: "Passion & Purpose",
      description: "We're driven by our love for music and the desire to empower every artist's creative journey."
    }
  ];

  return (
    <div className="text-white min-h-screen bg-netflix-black pt-20">
      {/* Hero Section */}
      <div className="text-white bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center">
            <h1 className="text-white text-4xl lg:text-5xl font-bold text-white mb-6">
              About
              <span className="text-white block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                SoundInkube
              </span>
            </h1>
            <p className="text-white text-xl text-white max-w-3xl mx-auto">
              We're on a mission to democratize music creation by connecting talented professionals 
              with artists and creators worldwide. Building the future of collaborative music-making.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-white py-16 bg-netflix-black">
        <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-3xl lg:text-4xl font-bold text-white mb-8">Our Mission</h2>
          <p className="text-white text-lg text-white leading-relaxed mb-8">
            SoundInkube was born from a simple belief: great music happens when talented people collaborate. 
            We've built a platform that breaks down geographical barriers, connects diverse musical talents, 
            and provides the tools needed to create, learn, and grow in the music industry.
          </p>
          <p className="text-white text-lg text-white leading-relaxed">
            Whether you're an independent artist looking for production help, a music professional 
            seeking new opportunities, or a label searching for the next big talent, SoundInkube 
            provides the ecosystem where musical dreams become reality.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="text-white py-16 bg-gradient-to-b from-netflix-dark to-black">
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-12">
            <h2 className="text-white text-3xl lg:text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-white text-white text-lg">The numbers that show our growing community</p>
          </div>
          <div className="text-white grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-white netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <CardContent className="text-white p-6 text-center">
                  <div className="text-white mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-white text-3xl font-bold text-netflix-red mb-2">{stat.number}</div>
                  <div className="text-white text-white">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="text-white py-16 bg-netflix-black">
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-16">
            <h2 className="text-white text-3xl lg:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-white text-white text-lg">The principles that guide everything we do</p>
          </div>
          <div className="text-white grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-white netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <CardContent className="text-white p-6 text-center">
                  <div className="text-white mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-white text-lg font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-white text-white text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-white py-16 bg-gradient-to-b from-netflix-dark to-black">
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-16">
            <h2 className="text-white text-3xl lg:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-white text-white text-lg">The passionate individuals building the future of music collaboration</p>
          </div>
          <div className="text-white grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-white netflix-card netflix-hover-scale bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                <CardContent className="text-white p-6 text-center">
                  <div className="text-white w-20 h-20 bg-netflix-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-white text-xl font-bold">{member.avatar}</span>
                  </div>
                  <h3 className="text-white text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-white text-netflix-red text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-white text-white text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="text-white py-16 bg-netflix-black">
        <div className="text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white text-center mb-12">
            <h2 className="text-white text-3xl lg:text-4xl font-bold text-white mb-4">Our Story</h2>
          </div>
          <div className="text-white space-y-8 text-white">
            <div className="text-white text-lg leading-relaxed">
              <p className="text-white mb-6">
                SoundInkube was founded in 2023 by a group of music industry veterans who experienced 
                firsthand the challenges of connecting with the right collaborators. As independent 
                artists and producers, we often struggled to find skilled professionals who could 
                bring our creative visions to life.
              </p>
              <p className="text-white mb-6">
                Traditional networking methods were time-consuming and often ineffective. Geographic 
                limitations meant missing out on incredible talent from around the world. We knew 
                there had to be a better way to connect music creators and professionals.
              </p>
              <p className="text-white mb-6">
                That's when we decided to build SoundInkube - a platform that would eliminate 
                geographical barriers, streamline the collaboration process, and provide all the 
                tools needed for successful music projects. From our headquarters in Los Angeles, 
                we've grown into a global community that spans every continent.
              </p>
              <p>
                Today, SoundInkube serves thousands of music professionals and creators worldwide, 
                facilitating collaborations that wouldn't have been possible just a few years ago. 
                We're just getting started on our mission to democratize music creation and build 
                the most comprehensive platform for musical collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-white py-16 bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10">
        <div className="text-white max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-white text-xl text-white mb-8">
            Be part of the revolution that's changing how music gets made. 
            Connect with our global community of creators and professionals.
          </p>
          <div className="text-white flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = "/signup?role=client"}
              className="text-white netflix-button-primary text-lg px-8 py-3"
            >
              Join as Client
            </Button>
            <Button
              onClick={() => window.location.href = "/signup?role=professional"}
              variant="outline"
              className="text-white netflix-button-secondary text-lg px-8 py-3"
            >
              Join as Professional
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}