import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Clock, 
  Calendar,
  Music,
  MessageCircle,
  Star,
  DollarSign,
  Filter,
  Eye,
  BookOpen,
  Award,
  TrendingUp,
  Users,
  Video,
  Phone,
  Mail
} from "lucide-react";
import { useState } from "react";

export default function MyStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const students = [
    {
      id: 1,
      name: "Emma Rodriguez",
      avatar: "ER",
      instrument: "Piano",
      level: "Intermediate",
      startDate: "2024-01-15",
      lessonsCompleted: 24,
      totalLessons: 32,
      nextLesson: "2024-06-25T10:00:00",
      monthlyRate: 320,
      progress: 75,
      notes: "Excellent progress in classical pieces. Working on Chopin's Nocturnes.",
      achievements: ["First Recital", "Grade 5 Theory"],
      attendance: 95,
      parentContact: {
        name: "Maria Rodriguez",
        phone: "+1 (555) 234-5678",
        email: "maria.rodriguez@email.com"
      },
      skills: {
        technique: 80,
        rhythm: 85,
        theory: 70,
        expression: 90
      }
    },
    {
      id: 2,
      name: "Jake Williams",
      avatar: "JW",
      instrument: "Guitar",
      level: "Beginner",
      startDate: "2024-03-10",
      lessonsCompleted: 16,
      totalLessons: 20,
      nextLesson: "2024-06-24T14:30:00",
      monthlyRate: 280,
      progress: 80,
      notes: "Quick learner, loves rock music. Currently learning power chords.",
      achievements: ["First Song Completed"],
      attendance: 88,
      parentContact: {
        name: "Self (Adult Student)",
        phone: "+1 (555) 345-6789",
        email: "jake.williams@email.com"
      },
      skills: {
        technique: 60,
        rhythm: 75,
        theory: 45,
        expression: 70
      }
    },
    {
      id: 3,
      name: "Sophia Chen",
      avatar: "SC",
      instrument: "Violin",
      level: "Advanced",
      startDate: "2023-09-05",
      lessonsCompleted: 45,
      totalLessons: 48,
      nextLesson: "2024-06-26T16:00:00",
      monthlyRate: 400,
      progress: 94,
      notes: "Preparing for conservatory auditions. Exceptional technical ability.",
      achievements: ["Youth Orchestra", "Competition Winner", "Grade 8 Distinction"],
      attendance: 98,
      parentContact: {
        name: "Dr. Liu Chen",
        phone: "+1 (555) 456-7890",
        email: "liu.chen@email.com"
      },
      skills: {
        technique: 95,
        rhythm: 92,
        theory: 88,
        expression: 96
      }
    },
    {
      id: 4,
      name: "Marcus Thompson",
      avatar: "MT",
      instrument: "Drums",
      level: "Intermediate",
      startDate: "2024-02-20",
      lessonsCompleted: 18,
      totalLessons: 24,
      nextLesson: "2024-06-27T11:00:00",
      monthlyRate: 300,
      progress: 75,
      notes: "Great natural rhythm. Working on coordination and fill techniques.",
      achievements: ["First Performance", "Grade 4 Practical"],
      attendance: 92,
      parentContact: {
        name: "Jennifer Thompson",
        phone: "+1 (555) 567-8901",
        email: "jen.thompson@email.com"
      },
      skills: {
        technique: 75,
        rhythm: 90,
        theory: 55,
        expression: 80
      }
    },
    {
      id: 5,
      name: "Lily Park",
      avatar: "LP",
      instrument: "Voice",
      level: "Beginner",
      startDate: "2024-04-12",
      lessonsCompleted: 8,
      totalLessons: 12,
      nextLesson: "2024-06-23T13:00:00",
      monthlyRate: 260,
      progress: 67,
      notes: "Sweet natural voice. Learning breath control and basic vocal exercises.",
      achievements: ["First Solo"],
      attendance: 83,
      parentContact: {
        name: "Grace Park",
        phone: "+1 (555) 678-9012",
        email: "grace.park@email.com"
      },
      skills: {
        technique: 50,
        rhythm: 70,
        theory: 40,
        expression: 85
      }
    },
    {
      id: 6,
      name: "Alex Johnson",
      avatar: "AJ",
      instrument: "Bass Guitar",
      level: "Intermediate",
      startDate: "2023-11-15",
      lessonsCompleted: 28,
      totalLessons: 32,
      nextLesson: "2024-06-28T15:30:00",
      monthlyRate: 320,
      progress: 88,
      notes: "Solid foundation. Exploring jazz and funk styles. Great groove sense.",
      achievements: ["Band Member", "Grade 6 Practical"],
      attendance: 90,
      parentContact: {
        name: "Self (Adult Student)",
        phone: "+1 (555) 789-0123",
        email: "alex.johnson@email.com"
      },
      skills: {
        technique: 80,
        rhythm: 95,
        theory: 65,
        expression: 85
      }
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-600/20 text-green-400';
      case 'Intermediate': return 'bg-yellow-600/20 text-yellow-400';
      case 'Advanced': return 'bg-red-600/20 text-red-400';
      default: return 'bg-gray-600/20 text-gray-400';
    }
  };

  const getSkillColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.instrument.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = filterLevel === "all" || student.level.toLowerCase() === filterLevel;
    
    return matchesSearch && matchesLevel;
  });

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.progress < 100).length,
    monthlyRevenue: students.reduce((sum, s) => sum + s.monthlyRate, 0),
    averageProgress: Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length),
    averageAttendance: Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)
  };

  const upcomingLessons = students
    .filter(s => new Date(s.nextLesson) >= new Date())
    .sort((a, b) => new Date(a.nextLesson).getTime() - new Date(b.nextLesson).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-netflix-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Students</h1>
            <p className="text-gray-400">Manage your teaching roster and track student progress</p>
          </div>
          <Button className="netflix-button-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid lg:grid-cols-5 gap-4 mb-8">
          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.totalStudents}</p>
                  <p className="text-gray-400 text-sm">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.activeStudents}</p>
                  <p className="text-gray-400 text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-netflix-red/20 rounded-lg">
                  <DollarSign className="h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white font-semibold">${stats.monthlyRevenue}</p>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.averageProgress}%</p>
                  <p className="text-gray-400 text-sm">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold">{stats.averageAttendance}%</p>
                  <p className="text-gray-400 text-sm">Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Students List */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All Levels' },
                  { key: 'beginner', label: 'Beginner' },
                  { key: 'intermediate', label: 'Intermediate' },
                  { key: 'advanced', label: 'Advanced' }
                ].map((filter) => (
                  <Button
                    key={filter.key}
                    variant={filterLevel === filter.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterLevel(filter.key)}
                    className={filterLevel === filter.key ? "netflix-button-primary" : "border-gray-700 text-gray-300"}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Students Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Student Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-netflix-red text-white">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-bold text-lg">{student.name}</h3>
                          <p className="text-gray-400">{student.instrument}</p>
                        </div>
                      </div>
                      <Badge className={getLevelColor(student.level)}>
                        {student.level}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-400 text-sm">Course Progress</span>
                        <span className="text-white font-semibold">{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="h-2" />
                    </div>

                    {/* Lessons Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Lessons</p>
                        <p className="text-white font-semibold">{student.lessonsCompleted}/{student.totalLessons}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Attendance</p>
                        <p className="text-white font-semibold">{student.attendance}%</p>
                      </div>
                    </div>

                    {/* Skills Breakdown */}
                    <div className="mb-4">
                      <h4 className="text-white font-medium mb-2">Skills Assessment</h4>
                      <div className="space-y-2">
                        {Object.entries(student.skills).map(([skill, score]) => (
                          <div key={skill} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm capitalize">{skill}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-gray-800 rounded-full h-1.5">
                                <div 
                                  className={`${getSkillColor(score)} h-1.5 rounded-full transition-all duration-500`}
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-xs font-medium w-8">{score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {student.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-2">Achievements</h4>
                        <div className="flex flex-wrap gap-1">
                          {student.achievements.map((achievement, index) => (
                            <Badge key={index} variant="secondary" className="bg-yellow-600/20 text-yellow-400 text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Lesson */}
                    <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Next Lesson</p>
                          <p className="text-white font-medium">
                            {new Date(student.nextLesson).toLocaleDateString()} at{' '}
                            {new Date(student.nextLesson).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">Monthly Rate</p>
                          <p className="text-green-400 font-semibold">${student.monthlyRate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm italic">"{student.notes}"</p>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1 netflix-button-primary">
                        <Eye className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700 text-gray-300">
                        <Video className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Lessons */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-netflix-red" />
                  <span>Upcoming Lessons</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingLessons.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-netflix-red text-white text-xs">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white text-sm font-medium">{student.name}</p>
                          <p className="text-gray-400 text-xs">{student.instrument}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-xs">
                          {new Date(student.nextLesson).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {new Date(student.nextLesson).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Teaching Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">This Week's Lessons</span>
                    <span className="text-white font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hours Taught</span>
                    <span className="text-white font-semibold">18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Avg Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">4.9</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Completion Rate</span>
                    <span className="text-green-400 font-semibold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Resources */}
            <Card className="netflix-card bg-gray-900/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <BookOpen className="h-3 w-3 mr-2" />
                  Lesson Plans
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Award className="h-3 w-3 mr-2" />
                  Student Progress Reports
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Calendar className="h-3 w-3 mr-2" />
                  Schedule Management
                </Button>
                <Button size="sm" variant="outline" className="w-full border-gray-700 text-gray-300">
                  <Music className="h-3 w-3 mr-2" />
                  Practice Materials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No students found</h3>
            <p className="text-gray-400 mb-6">Start building your student roster</p>
            <Button className="netflix-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Student
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}