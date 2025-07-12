import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Search, GraduationCap, Clock, Users, Star, Play, BookOpen, Award, Calendar, Video, Headphones, Music, CheckCircle, Lock } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: number;
  enrolled: number;
  maxStudents: number;
  rating: number;
  reviewCount: number;
  price: number;
  tags: string[];
  thumbnail: string;
  isLive: boolean;
  nextSession?: string;
  completionRate: number;
}

interface Enrollment {
  id: string;
  courseId: string;
  courseTitle: string;
  instructor: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  enrolledDate: string;
  lastAccessed: string;
  certificateEarned: boolean;
}

export default function MusicSchools() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("browse");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  // Mock courses data
  const mockCourses: Course[] = [
    {
      id: "1",
      title: "Modern Music Production Masterclass",
      description: "Learn professional music production techniques using industry-standard DAWs. From beat making to mixing and mastering.",
      instructor: "Alex Rivera",
      instructorAvatar: "AR",
      category: "Production",
      level: "intermediate",
      duration: "8 weeks",
      lessons: 32,
      enrolled: 487,
      maxStudents: 500,
      rating: 4.9,
      reviewCount: 156,
      price: 299,
      tags: ["Logic Pro", "Ableton", "Mixing", "Mastering"],
      thumbnail: "MP",
      isLive: false,
      completionRate: 89
    },
    {
      id: "2",
      title: "Vocal Performance & Technique",
      description: "Develop your voice with professional techniques. Learn breath control, pitch accuracy, and stage presence from a seasoned performer.",
      instructor: "Sarah Chen",
      instructorAvatar: "SC",
      category: "Vocals",
      level: "beginner",
      duration: "6 weeks",
      lessons: 24,
      enrolled: 234,
      maxStudents: 300,
      rating: 4.8,
      reviewCount: 89,
      price: 199,
      tags: ["Breath Control", "Pitch", "Performance", "Stage Presence"],
      thumbnail: "VP",
      isLive: true,
      nextSession: "2024-01-28T18:00:00Z",
      completionRate: 92
    },
    {
      id: "3",
      title: "Jazz Guitar Fundamentals",
      description: "Master jazz guitar from the ground up. Learn chord progressions, improvisation, and the language of jazz with a Berklee graduate.",
      instructor: "Marcus Johnson",
      instructorAvatar: "MJ",
      category: "Guitar",
      level: "intermediate",
      duration: "10 weeks",
      lessons: 40,
      enrolled: 178,
      maxStudents: 200,
      rating: 4.9,
      reviewCount: 67,
      price: 349,
      tags: ["Jazz Theory", "Improvisation", "Chord Progressions", "Bebop"],
      thumbnail: "JG",
      isLive: false,
      completionRate: 85
    },
    {
      id: "4",
      title: "Electronic Music & Sound Design",
      description: "Create cutting-edge electronic music. Learn synthesis, sound design, and composition techniques for modern electronic genres.",
      instructor: "Luna Martinez",
      instructorAvatar: "LM",
      category: "Electronic",
      level: "advanced",
      duration: "12 weeks",
      lessons: 48,
      enrolled: 145,
      maxStudents: 150,
      rating: 4.7,
      reviewCount: 43,
      price: 399,
      tags: ["Synthesis", "Sound Design", "Modular", "Composition"],
      thumbnail: "ED",
      isLive: false,
      completionRate: 78
    },
    {
      id: "5",
      title: "Hip-Hop Beat Making Workshop",
      description: "Create professional hip-hop beats from scratch. Learn sampling, drum programming, and arrangement techniques used by top producers.",
      instructor: "David Kim",
      instructorAvatar: "DK",
      category: "Hip-Hop",
      level: "beginner",
      duration: "4 weeks",
      lessons: 16,
      enrolled: 356,
      maxStudents: 400,
      rating: 4.8,
      reviewCount: 124,
      price: 149,
      tags: ["Sampling", "Drum Programming", "FL Studio", "Beat Making"],
      thumbnail: "HH",
      isLive: true,
      nextSession: "2024-01-27T15:00:00Z",
      completionRate: 94
    },
    {
      id: "6",
      title: "Audio Engineering & Mixing",
      description: "Professional mixing and mastering techniques. Learn to use EQ, compression, and effects to create polished, commercial-ready tracks.",
      instructor: "Elena Vasquez",
      instructorAvatar: "EV",
      category: "Engineering",
      level: "advanced",
      duration: "10 weeks",
      lessons: 35,
      enrolled: 123,
      maxStudents: 150,
      rating: 4.9,
      reviewCount: 78,
      price: 379,
      tags: ["Mixing", "Mastering", "Pro Tools", "Audio Processing"],
      thumbnail: "AE",
      isLive: false,
      completionRate: 82
    }
  ];

  // Mock enrollments data
  const mockEnrollments: Enrollment[] = [
    {
      id: "1",
      courseId: "2",
      courseTitle: "Vocal Performance & Technique",
      instructor: "Sarah Chen",
      progress: 67,
      completedLessons: 16,
      totalLessons: 24,
      enrolledDate: "2024-01-10",
      lastAccessed: "2024-01-24",
      certificateEarned: false
    },
    {
      id: "2",
      courseId: "5",
      courseTitle: "Hip-Hop Beat Making Workshop",
      instructor: "David Kim",
      progress: 100,
      completedLessons: 16,
      totalLessons: 16,
      enrolledDate: "2024-01-05",
      lastAccessed: "2024-01-22",
      certificateEarned: true
    }
  ];

  useEffect(() => {
    setCourses(mockCourses);
    setEnrollments(mockEnrollments);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || course.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesLevel = filterLevel === "all" || course.level === filterLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-600/20 text-green-400 border-green-600/30";
      case "intermediate": return "bg-yellow-600/20 text-yellow-400 border-yellow-600/30";
      case "advanced": return "bg-red-600/20 text-red-400 border-red-600/30";
      default: return "bg-gray-600/20 text-gray-400 border-gray-600/30";
    }
  };

  const handleEnrollCourse = (courseId: string) => {
    if (!isAuthenticated) {
      window.location.href = `/login?intent=enroll&course=${courseId}`;
      return;
    }
    alert(`Enrolling in course... (This would open enrollment process in the full app)`);
  };

  const handleContinueCourse = (courseId: string) => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    alert(`Opening course player... (This would open the course interface in the full app)`);
  };

  return (
    <div className="min-h-screen bg-netflix-black pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Music Schools
              <span className="block bg-gradient-to-r from-netflix-red to-red-400 bg-clip-text text-transparent">
                & Education
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Learn from industry professionals with comprehensive courses, live workshops, and personalized mentoring. 
              Advance your musical skills and earn recognized certifications.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-netflix-dark">
            <TabsTrigger value="browse" className="netflix-tab">
              <Search className="h-4 w-4 mr-2" />
              Browse Courses
            </TabsTrigger>
            <TabsTrigger value="enrolled" className="netflix-tab">
              <BookOpen className="h-4 w-4 mr-2" />
              My Courses
            </TabsTrigger>
            <TabsTrigger value="live" className="netflix-tab">
              <Video className="h-4 w-4 mr-2" />
              Live Sessions
            </TabsTrigger>
          </TabsList>

          {/* Browse Courses Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="netflix-input pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="netflix-input w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-netflix-dark border-gray-600">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="vocals">Vocals</SelectItem>
                    <SelectItem value="guitar">Guitar</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="netflix-input w-full sm:w-40">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent className="bg-netflix-dark border-gray-600">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                          {course.isLive && (
                            <Badge className="bg-red-600/20 text-red-400 border-red-600/30 animate-pulse">
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getLevelColor(course.level)}>
                            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                          </Badge>
                          <Badge variant="secondary" className="bg-netflix-red/20 text-netflix-red border-netflix-red/30">
                            {course.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-400 mb-1">
                          <Star className="h-4 w-4 fill-current mr-1" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">({course.reviewCount})</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Course Thumbnail */}
                    <div className="w-full h-32 bg-gradient-to-br from-netflix-red/20 to-gray-800/50 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-2xl font-bold text-white">{course.thumbnail}</div>
                    </div>

                    {/* Instructor Info */}
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">{course.instructorAvatar}</span>
                      </div>
                      <div>
                        <p className="text-sm text-white">Instructor: {course.instructor}</p>
                        <p className="text-xs text-gray-400">{course.completionRate}% completion rate</p>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-2" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-gray-400">
                        <BookOpen className="h-4 w-4 mr-2" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Users className="h-4 w-4 mr-2" />
                        {course.enrolled}/{course.maxStudents}
                      </div>
                      <div className="flex items-center text-netflix-red font-semibold">
                        <span className="text-lg">${course.price}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                      {course.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                          +{course.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Next Live Session */}
                    {course.isLive && course.nextSession && (
                      <div className="bg-netflix-red/10 border border-netflix-red/30 rounded-lg p-3 mb-4">
                        <p className="text-sm text-netflix-red font-medium flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Next Live Session
                        </p>
                        <p className="text-xs text-gray-300 mt-1">
                          {new Date(course.nextSession).toLocaleDateString()} at {new Date(course.nextSession).toLocaleTimeString()}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1 netflix-button-secondary text-sm"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        onClick={() => handleEnrollCourse(course.id)}
                        className="flex-1 netflix-button-primary text-sm"
                        disabled={course.enrolled >= course.maxStudents}
                      >
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {course.enrolled >= course.maxStudents ? "Full" : "Enroll"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <GraduationCap className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search criteria or explore different categories</p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterCategory("all");
                    setFilterLevel("all");
                  }}
                  className="netflix-button-primary"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* My Courses Tab */}
          <TabsContent value="enrolled" className="space-y-6">
            {!isAuthenticated ? (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Sign in to view your courses</h3>
                <p className="text-gray-400 mb-6">Track your progress and continue learning</p>
                <Button
                  onClick={() => window.location.href = "/login"}
                  className="netflix-button-primary"
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="netflix-card bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            {enrollment.courseTitle}
                            {enrollment.certificateEarned && (
                              <Award className="h-5 w-5 text-yellow-400 ml-2" />
                            )}
                          </h3>
                          <p className="text-sm text-gray-400 mb-2">Instructor: {enrollment.instructor}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                            <div>Enrolled: {new Date(enrollment.enrolledDate).toLocaleDateString()}</div>
                            <div>Last accessed: {new Date(enrollment.lastAccessed).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-netflix-red">{enrollment.progress}%</div>
                          <p className="text-xs text-gray-400">Complete</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">
                            {enrollment.completedLessons}/{enrollment.totalLessons} lessons
                          </span>
                          {enrollment.certificateEarned && (
                            <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">
                              <Award className="h-3 w-3 mr-1" />
                              Certified
                            </Badge>
                          )}
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-netflix-red h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleContinueCourse(enrollment.courseId)}
                          className="flex-1 netflix-button-primary"
                        >
                          {enrollment.progress === 100 ? "Review Course" : "Continue Learning"}
                        </Button>
                        {enrollment.certificateEarned && (
                          <Button variant="outline" className="netflix-button-secondary">
                            <Award className="h-4 w-4 mr-1" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {enrollments.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No enrolled courses</h3>
                    <p className="text-gray-400 mb-6">Start learning by enrolling in your first course</p>
                    <Button
                      onClick={() => setActiveTab("browse")}
                      className="netflix-button-primary"
                    >
                      Browse Courses
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* Live Sessions Tab */}
          <TabsContent value="live" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Live Learning Sessions</h2>
              <p className="text-gray-400">Join interactive workshops and Q&A sessions with instructors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.filter(course => course.isLive).map((course) => (
                <Card key={course.id} className="netflix-card netflix-hover-glow bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-netflix-red/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white text-lg flex items-center">
                          {course.title}
                          <Badge className="ml-2 bg-red-600/20 text-red-400 border-red-600/30 animate-pulse">
                            LIVE
                          </Badge>
                        </CardTitle>
                        <p className="text-gray-400 text-sm mt-1">with {course.instructor}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {course.nextSession && (
                      <div className="bg-netflix-red/10 border border-netflix-red/30 rounded-lg p-4 mb-4">
                        <p className="text-sm text-netflix-red font-medium flex items-center mb-2">
                          <Video className="h-4 w-4 mr-2" />
                          Next Live Session
                        </p>
                        <p className="text-white font-medium">
                          {new Date(course.nextSession).toLocaleDateString()}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {new Date(course.nextSession).toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Users className="h-4 w-4" />
                          <span>{course.enrolled} enrolled</span>
                        </div>
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleEnrollCourse(course.id)}
                      className="w-full netflix-button-primary"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Live Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {courses.filter(course => course.isLive).length === 0 && (
              <div className="text-center py-12">
                <Video className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No live sessions scheduled</h3>
                <p className="text-gray-400 mb-6">Check back later or browse available courses</p>
                <Button
                  onClick={() => setActiveTab("browse")}
                  className="netflix-button-primary"
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Call to Action for Instructors */}
      <div className="bg-gradient-to-r from-netflix-red/10 via-black to-netflix-red/10 py-16 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Share Your Knowledge
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Are you a music professional with expertise to share? Create courses, teach live sessions, 
            and help the next generation of musicians grow their skills.
          </p>
          <Button
            onClick={() => window.location.href = "/signup?role=professional"}
            className="netflix-button-primary netflix-hover-glow text-lg px-8 py-3"
          >
            <GraduationCap className="h-4 w-4 mr-2" />
            Become an Instructor
          </Button>
        </div>
      </div>
    </div>
  );
}