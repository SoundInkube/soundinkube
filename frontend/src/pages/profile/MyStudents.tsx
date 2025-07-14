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
      case 'Beginner': return 'bg-red-600/20 text-netflix-red';
      case 'Intermediate': return 'bg-netflix-red/20 text-netflix-red';
      case 'Advanced': return 'bg-red-600/20 text-red-400';
      default: return 'bg-netflix-dark/20 text-white';
    }
  };

  const getSkillColor = (score: number) => {
    if (score >= 80) return 'bg-red-600';
    if (score >= 60) return 'bg-netflix-red';
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
    <div className="text-white min-h-screen bg-netflix-black">
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-white flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold text-white mb-2">My Students</h1>
            <p className="text-white text-white">Manage your teaching roster and track student progress</p>
          </div>
          <Button className="text-white netflix-button-primary">
            <Plus className="text-white h-4 w-4 mr-2" />
            Add New Student
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="text-white grid lg:grid-cols-5 gap-4 mb-8">
          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Users className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.totalStudents}</p>
                  <p className="text-white text-white text-sm">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <BookOpen className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.activeStudents}</p>
                  <p className="text-white text-white text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-netflix-red/20 rounded-lg">
                  <DollarSign className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">${stats.monthlyRevenue}</p>
                  <p className="text-white text-white text-sm">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-netflix-red/20 rounded-lg">
                  <TrendingUp className="text-white h-5 w-5 text-netflix-red" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.averageProgress}%</p>
                  <p className="text-white text-white text-sm">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
            <CardContent className="text-white p-4">
              <div className="text-white flex items-center space-x-3">
                <div className="text-white p-2 bg-red-600/20 rounded-lg">
                  <Calendar className="text-white h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-white font-semibold">{stats.averageAttendance}%</p>
                  <p className="text-white text-white text-sm">Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-white grid lg:grid-cols-4 gap-8">
          {/* Main Students List */}
          <div className="text-white lg:col-span-3">
            {/* Search and Filter */}
            <div className="text-white flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="text-white relative flex-1">
                <Search className="text-white absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-4 w-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-white pl-10 bg-netflix-dark border-gray-700 text-white"
                />
              </div>
              <div className="text-white flex space-x-2">
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
                    className={filterLevel === filter.key ? "netflix-button-primary" : "border-gray-700 text-white"}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Students Grid */}
            <div className="text-white grid md:grid-cols-2 gap-6">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800 hover:border-netflix-red/50 transition-all duration-300">
                  <CardContent className="text-white p-6">
                    {/* Student Header */}
                    <div className="text-white flex items-center justify-between mb-4">
                      <div className="text-white flex items-center space-x-3">
                        <Avatar className="text-white w-12 h-12">
                          <AvatarFallback className="text-white bg-netflix-red text-white">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white text-white font-bold text-lg">{student.name}</h3>
                          <p className="text-white text-white">{student.instrument}</p>
                        </div>
                      </div>
                      <Badge className={getLevelColor(student.level)}>
                        {student.level}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="text-white mb-4">
                      <div className="text-white flex justify-between items-center mb-2">
                        <span className="text-white text-white text-sm">Course Progress</span>
                        <span className="text-white text-white font-semibold">{student.progress}%</span>
                      </div>
                      <Progress value={student.progress} className="text-white h-2" />
                    </div>

                    {/* Lessons Info */}
                    <div className="text-white grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-white text-white text-sm">Lessons</p>
                        <p className="text-white text-white font-semibold">{student.lessonsCompleted}/{student.totalLessons}</p>
                      </div>
                      <div>
                        <p className="text-white text-white text-sm">Attendance</p>
                        <p className="text-white text-white font-semibold">{student.attendance}%</p>
                      </div>
                    </div>

                    {/* Skills Breakdown */}
                    <div className="text-white mb-4">
                      <h4 className="text-white text-white font-medium mb-2">Skills Assessment</h4>
                      <div className="text-white space-y-2">
                        {Object.entries(student.skills).map(([skill, score]) => (
                          <div key={skill} className="text-white flex items-center justify-between">
                            <span className="text-white text-white text-sm capitalize">{skill}</span>
                            <div className="text-white flex items-center space-x-2">
                              <div className="text-white w-16 bg-netflix-dark rounded-full h-1.5">
                                <div 
                                  className={`${getSkillColor(score)} h-1.5 rounded-full transition-all duration-500`}
                                  style={{ width: `${score}%` }}
                                ></div>
                              </div>
                              <span className="text-white text-white text-xs font-medium w-8">{score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    {student.achievements.length > 0 && (
                      <div className="text-white mb-4">
                        <h4 className="text-white text-white font-medium mb-2">Achievements</h4>
                        <div className="text-white flex flex-wrap gap-1">
                          {student.achievements.map((achievement, index) => (
                            <Badge key={index} variant="secondary" className="text-white bg-netflix-red/20 text-netflix-red text-xs">
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Next Lesson */}
                    <div className="text-white mb-4 p-3 bg-netflix-dark/50 rounded-lg">
                      <div className="text-white flex items-center justify-between">
                        <div>
                          <p className="text-white text-white text-sm">Next Lesson</p>
                          <p className="text-white text-white font-medium">
                            {new Date(student.nextLesson).toLocaleDateString()} at{' '}
                            {new Date(student.nextLesson).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="text-white text-right">
                          <p className="text-white text-white text-sm">Monthly Rate</p>
                          <p className="text-white text-netflix-red font-semibold">${student.monthlyRate}</p>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="text-white mb-4">
                      <p className="text-white text-white text-sm italic">"{student.notes}"</p>
                    </div>

                    {/* Actions */}
                    <div className="text-white flex space-x-2">
                      <Button size="sm" className="text-white flex-1 netflix-button-primary">
                        <Eye className="text-white h-3 w-3 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-gray-700 text-white">
                        <MessageCircle className="text-white h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-white border-gray-700 text-white">
                        <Video className="text-white h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="text-white space-y-6">
            {/* Upcoming Lessons */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white flex items-center space-x-2">
                  <Clock className="text-white h-5 w-5 text-netflix-red" />
                  <span>Upcoming Lessons</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-3">
                  {upcomingLessons.map((student) => (
                    <div key={student.id} className="text-white flex items-center justify-between p-3 bg-netflix-dark/50 rounded-lg">
                      <div className="text-white flex items-center space-x-2">
                        <Avatar className="text-white w-8 h-8">
                          <AvatarFallback className="text-white bg-netflix-red text-white text-xs">
                            {student.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white text-white text-sm font-medium">{student.name}</p>
                          <p className="text-white text-white text-xs">{student.instrument}</p>
                        </div>
                      </div>
                      <div className="text-white text-right">
                        <p className="text-white text-white text-xs">
                          {new Date(student.nextLesson).toLocaleDateString()}
                        </p>
                        <p className="text-white text-white text-xs">
                          {new Date(student.nextLesson).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Teaching Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">This Week's Lessons</span>
                    <span className="text-white text-white font-semibold">12</span>
                  </div>
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Hours Taught</span>
                    <span className="text-white text-white font-semibold">18h</span>
                  </div>
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Avg Rating</span>
                    <div className="text-white flex items-center space-x-1">
                      <Star className="text-white h-3 w-3 text-netflix-red fill-current" />
                      <span className="text-white text-white font-semibold">4.9</span>
                    </div>
                  </div>
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Completion Rate</span>
                    <span className="text-white text-netflix-red font-semibold">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Teaching Resources */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-3">
                <Button size="sm" variant="outline" className="text-white w-full border-gray-700 text-white">
                  <BookOpen className="text-white h-3 w-3 mr-2" />
                  Lesson Plans
                </Button>
                <Button size="sm" variant="outline" className="text-white w-full border-gray-700 text-white">
                  <Award className="text-white h-3 w-3 mr-2" />
                  Student Progress Reports
                </Button>
                <Button size="sm" variant="outline" className="text-white w-full border-gray-700 text-white">
                  <Calendar className="text-white h-3 w-3 mr-2" />
                  Schedule Management
                </Button>
                <Button size="sm" variant="outline" className="text-white w-full border-gray-700 text-white">
                  <Music className="text-white h-3 w-3 mr-2" />
                  Practice Materials
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-white text-center py-12">
            <GraduationCap className="text-white h-16 w-16 text-white mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold text-white mb-2">No students found</h3>
            <p className="text-white text-white mb-6">Start building your student roster</p>
            <Button className="text-white netflix-button-primary">
              <Plus className="text-white h-4 w-4 mr-2" />
              Add Your First Student
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}