import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  MapPin,
  Star,
  ChevronLeft,
  Phone,
  Mail,
  Globe,
  Clock,
  User,
  CalendarIcon,
  CheckCircle,
  Music,
  GraduationCap,
  DollarSign,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Instructor {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  experience: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  type: string; // "Private", "Group", "Workshop"
  price: number;
  duration: string;
  schedule: string;
  capacity: number;
  instructor: Instructor;
  availableDates?: string[];
}

interface Review {
  id: string;
  user: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  course?: string;
}

interface MusicSchool {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  location: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  images: string[];
  rating: number;
  reviewCount: number;
  categories: string[];
  courses: Course[];
  instructors: Instructor[];
  reviews: Review[];
  facilities: string[];
  openingHours: {
    day: string;
    hours: string;
  }[];
}

export default function MusicSchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [musicSchool, setMusicSchool] = useState<MusicSchool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for development
  const mockMusicSchool: MusicSchool = {
    id: "1",
    name: "Harmony Music Academy",
    description: "A premier music school offering lessons in various instruments for students of all ages and skill levels.",
    longDescription: "Founded in 2005, Harmony Music Academy has established itself as one of the leading music education institutions in the area. With state-of-the-art facilities, highly qualified instructors, and a curriculum designed to nurture talent while making learning enjoyable, we provide a comprehensive musical education to students of all ages and abilities. Our approach combines traditional techniques with innovative teaching methods to help students reach their full potential.",
    location: "123 Mozart Street, Downtown",
    city: "New York",
    phone: "(212) 555-7890",
    email: "info@harmonyacademy.com",
    website: "www.harmonyacademy.com",
    images: [
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
      "https://images.unsplash.com/photo-1621784564114-9ff5ed2ab889"
    ],
    rating: 4.8,
    reviewCount: 42,
    categories: ["Piano", "Guitar", "Voice", "Theory", "Violin", "Drums"],
    courses: [
      {
        id: "c1",
        name: "Piano Masterclass",
        description: "A comprehensive piano course covering technique, repertoire, and performance skills for intermediate to advanced players.",
        type: "Group",
        price: 30,
        duration: "60 min",
        schedule: "Tuesdays and Thursdays, 6:00 PM - 7:00 PM",
        capacity: 8,
        instructor: {
          id: "i1",
          name: "Dr. Sarah Williams",
          bio: "Concert pianist with over 20 years of teaching experience. Ph.D. in Piano Performance from Juilliard.",
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          specialties: ["Classical Piano", "Music Theory", "Performance"],
          experience: "20+ years"
        },
        availableDates: ["2023-11-10", "2023-11-12", "2023-11-17", "2023-11-19"]
      },
      {
        id: "c2",
        name: "Private Guitar Lessons",
        description: "One-on-one guitar instruction tailored to your specific goals and skill level, covering any style from classical to rock.",
        type: "Private",
        price: 50,
        duration: "45 min",
        schedule: "Flexible scheduling, Monday through Friday, 10:00 AM - 8:00 PM",
        capacity: 1,
        instructor: {
          id: "i2",
          name: "James Rodriguez",
          bio: "Professional guitarist who has toured internationally with several bands. Graduate of Berklee College of Music.",
          imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          specialties: ["Electric Guitar", "Acoustic Guitar", "Music Theory", "Jazz", "Rock"],
          experience: "15 years"
        },
        availableDates: ["2023-11-08", "2023-11-09", "2023-11-10", "2023-11-13"]
      },
      {
        id: "c3",
        name: "Music Theory Workshop",
        description: "A foundational workshop covering the essentials of music theory, notation, harmony, and ear training.",
        type: "Workshop",
        price: 25,
        duration: "90 min",
        schedule: "Saturdays, 10:00 AM - 11:30 AM",
        capacity: 12,
        instructor: {
          id: "i3",
          name: "Dr. Michael Chen",
          bio: "Composer and theorist with extensive teaching experience. Ph.D. in Music Theory from Yale University.",
          imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
          specialties: ["Music Theory", "Composition", "Ear Training"],
          experience: "18 years"
        },
        availableDates: ["2023-11-11", "2023-11-18", "2023-11-25"]
      },
      {
        id: "c4",
        name: "Voice Lessons",
        description: "Learn proper vocal techniques, expand your range, and improve your tone and expression with personalized voice training.",
        type: "Private",
        price: 55,
        duration: "45 min",
        schedule: "Flexible scheduling, Tuesday through Saturday",
        capacity: 1,
        instructor: {
          id: "i4",
          name: "Maria Gonzalez",
          bio: "Classically trained opera singer with extensive teaching experience in multiple vocal styles.",
          imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
          specialties: ["Classical Voice", "Pop", "Musical Theatre", "Breathing Technique"],
          experience: "12 years"
        },
        availableDates: ["2023-11-14", "2023-11-15", "2023-11-16", "2023-11-17"]
      }
    ],
    instructors: [
      {
        id: "i1",
        name: "Dr. Sarah Williams",
        bio: "Concert pianist with over 20 years of teaching experience. Ph.D. in Piano Performance from Juilliard.",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        specialties: ["Classical Piano", "Music Theory", "Performance"],
        experience: "20+ years"
      },
      {
        id: "i2",
        name: "James Rodriguez",
        bio: "Professional guitarist who has toured internationally with several bands. Graduate of Berklee College of Music.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
        specialties: ["Electric Guitar", "Acoustic Guitar", "Music Theory", "Jazz", "Rock"],
        experience: "15 years"
      },
      {
        id: "i3",
        name: "Dr. Michael Chen",
        bio: "Composer and theorist with extensive teaching experience. Ph.D. in Music Theory from Yale University.",
        imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
        specialties: ["Music Theory", "Composition", "Ear Training"],
        experience: "18 years"
      },
      {
        id: "i4",
        name: "Maria Gonzalez",
        bio: "Classically trained opera singer with extensive teaching experience in multiple vocal styles.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
        specialties: ["Classical Voice", "Pop", "Musical Theatre", "Breathing Technique"],
        experience: "12 years"
      }
    ],
    reviews: [
      {
        id: "r1",
        user: "Jennifer L.",
        userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        rating: 5,
        comment: "My daughter has been taking piano lessons here for two years and her progress has been remarkable. The instructors are patient, knowledgeable, and make learning fun!",
        date: "2023-10-05",
        course: "Piano Masterclass"
      },
      {
        id: "r2",
        user: "Robert K.",
        userImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
        rating: 4,
        comment: "Great guitar lessons with James. He tailors the lessons to my interests and skill level, which has kept me motivated to practice and improve.",
        date: "2023-09-18",
        course: "Private Guitar Lessons"
      },
      {
        id: "r3",
        user: "Alex T.",
        userImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
        rating: 5,
        comment: "The Music Theory Workshop completely changed my understanding of music. Dr. Chen explains complex concepts in a way that's easy to understand.",
        date: "2023-08-22",
        course: "Music Theory Workshop"
      }
    ],
    facilities: [
      "7 Private Lesson Rooms",
      "2 Group Classrooms",
      "Recording Studio",
      "Performance Space",
      "Student Lounge",
      "Music Library",
      "Free WiFi",
      "Parking Available"
    ],
    openingHours: [
      { day: "Monday", hours: "10:00 AM - 8:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 8:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 8:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 8:00 PM" },
      { day: "Friday", hours: "10:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
      { day: "Sunday", hours: "Closed" }
    ]
  };

  useEffect(() => {
    const fetchMusicSchoolDetails = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/music-schools/${id}`);
        // const data = await response.json();
        // setMusicSchool(data);
        
        // Using mock data for now
        setTimeout(() => {
          setMusicSchool(mockMusicSchool);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching music school details:", error);
        setError("Failed to load music school details. Please try again later.");
        setLoading(false);
      }
    };

    if (id) {
      fetchMusicSchoolDetails();
    }
  }, [id]);

  const handleBookCourse = (course: Course) => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/music-schools/${id}` } });
      return;
    }
    
    setSelectedCourse(course);
  };

  const handleConfirmBooking = () => {
    if (!selectedCourse || !selectedDate || !isAuthenticated) return;

    // In a real app, we would make an API call to create an enrollment
    console.log("Booking details:", {
      courseId: selectedCourse.id,
      schoolId: id,
      date: format(selectedDate, "yyyy-MM-dd"),
      course: selectedCourse.name,
      price: selectedCourse.price
    });
    
    // Reset selected course after booking
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-white flex justify-center items-center h-64">
          <div className="text-white animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !musicSchool) {
    return (
      <MainLayout>
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-white text-red-600">{error || "Music school not found"}</p>
            <Button onClick={() => navigate("/music-schools")} className="text-white mt-4">
              Back to Music Schools
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/music-schools")}
          className="text-white mb-4"
        >
          <ChevronLeft className="text-white h-4 w-4 mr-2" />
          Back to Music Schools
        </Button>
        
        <div className="text-white mb-8">
          <h1 className="text-white text-3xl font-bold text-white mb-2">{musicSchool.name}</h1>
          <div className="text-white flex flex-wrap items-center gap-4 text-white mb-4">
            <div className="text-white flex items-center">
              <MapPin className="text-white h-4 w-4 mr-1" />
              <span>{musicSchool.location}, {musicSchool.city}</span>
            </div>
            <div className="text-white flex items-center">
              <Star className="text-white h-4 w-4 mr-1 text-amber-500" />
              <span>{musicSchool.rating} ({musicSchool.reviewCount} reviews)</span>
            </div>
          </div>
          
          {/* Gallery */}
          <div className="text-white grid grid-cols-4 gap-4">
            {musicSchool.images.map((image, index) => (
              <div 
                key={index} 
                className={`rounded-lg overflow-hidden ${
                  index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                <img
                  src={image}
                  alt={`${musicSchool.name} - Image ${index + 1}`}
                  className="text-white w-full h-full object-cover"
                  style={{ height: index === 0 ? '400px' : '200px' }}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-white grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-white lg:col-span-2">
            <Tabs defaultValue="about" className="text-white mb-8">
              <TabsList className="text-white mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="instructors">Instructors</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {musicSchool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white text-white mb-6">{musicSchool.longDescription}</p>
                    
                    <h3 className="text-white text-lg font-medium mb-3">Categories & Specialties</h3>
                    <div className="text-white flex flex-wrap gap-2 mb-6">
                      {musicSchool.categories.map((category, index) => (
                        <Badge key={index} variant="secondary">
                          <Music className="text-white h-3 w-3 mr-1" />
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="text-white text-lg font-medium mb-3">Facilities</h3>
                    <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-y-2 mb-6">
                      {musicSchool.facilities.map((facility, index) => (
                        <div key={index} className="text-white flex items-center">
                          <div className="text-white h-4 w-4 rounded-full bg-netflix-red flex items-center justify-center mr-2">
                            <span className="text-white text-red-600">✓</span>
                          </div>
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-white text-lg font-medium mb-3">Opening Hours</h3>
                    <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-y-2">
                      {musicSchool.openingHours.map((item, index) => (
                        <div key={index} className="text-white flex items-center">
                          <Clock className="text-white h-4 w-4 mr-2 text-white" />
                          <span className="text-white font-medium mr-2">{item.day}:</span>
                          <span>{item.hours}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                  {musicSchool.courses.map((course) => (
                    <Card key={course.id} className="text-white overflow-hidden">
                      <CardHeader className="text-white pb-2">
                        <div className="text-white flex justify-between items-start">
                          <CardTitle className="text-white text-lg">{course.name}</CardTitle>
                          <Badge variant={course.type === "Private" ? "default" : "secondary"}>
                            {course.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-white flex items-center">
                          <Clock className="text-white h-3 w-3 mr-1" />
                          {course.duration} • <User className="text-white h-3 w-3 mx-1" /> Max {course.capacity}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-white pb-2">
                        <p className="text-white text-white text-sm mb-3">{course.description}</p>
                        
                        <div className="text-white flex items-center text-sm mb-2">
                          <GraduationCap className="text-white h-4 w-4 mr-1 text-white" />
                          <span>{course.instructor.name}</span>
                        </div>
                        
                        <div className="text-white flex items-center text-sm mb-3">
                          <CalendarIcon className="text-white h-4 w-4 mr-1 text-white" />
                          <span>{course.schedule}</span>
                        </div>
                        
                        <div className="text-white flex items-center justify-between">
                          <div className="text-white flex items-center text-lg font-bold">
                            <DollarSign className="text-white h-4 w-4" />
                            {course.price}
                            <span className="text-white text-sm font-normal text-white ml-1">/ session</span>
                          </div>
                          <Button size="sm" onClick={() => handleBookCourse(course)}>
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="instructors">
                <div className="text-white grid grid-cols-1 md:grid-cols-2 gap-6">
                  {musicSchool.instructors.map((instructor) => (
                    <Card key={instructor.id} className="text-white overflow-hidden">
                      <CardContent className="text-white p-6">
                        <div className="text-white flex space-x-4">
                          <Avatar className="text-white h-20 w-20">
                            <AvatarImage src={instructor.imageUrl} alt={instructor.name} />
                            <AvatarFallback>{instructor.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-white font-bold text-lg">{instructor.name}</h3>
                            <p className="text-white text-sm text-white mb-2">{instructor.experience} experience</p>
                            <div className="text-white flex flex-wrap gap-1 mb-2">
                              {instructor.specialties.map((specialty, index) => (
                                <Badge key={index} variant="outline" className="text-white text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-white mt-3 text-sm text-white">{instructor.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                    <CardDescription>
                      {musicSchool.reviewCount} reviews • {musicSchool.rating} average rating
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-white space-y-6">
                      {musicSchool.reviews.map((review) => (
                        <div key={review.id} className="text-white pb-6 border-b border-zinc-800 last:border-b-0 last:pb-0">
                          <div className="text-white flex items-center mb-2">
                            <Avatar className="text-white h-10 w-10 mr-3">
                              <AvatarImage src={review.userImage} alt={review.user} />
                              <AvatarFallback>{review.user[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-white font-medium">{review.user}</p>
                              <p className="text-white text-xs text-white">{review.date}</p>
                              {review.course && (
                                <p className="text-white text-xs text-white">Course: {review.course}</p>
                              )}
                            </div>
                            <div className="text-white ml-auto flex items-center">
                              <Star className="text-white h-4 w-4 text-amber-500" />
                              <span className="text-white ml-1">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-white text-white text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="text-white w-full" disabled={!isAuthenticated}>
                      {isAuthenticated ? "Write a Review" : "Login to Write a Review"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Contact Information */}
          <div className="text-white space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-3">
                  <div className="text-white flex items-center">
                    <Phone className="text-white h-5 w-5 mr-3 text-white" />
                    <span>{musicSchool.phone}</span>
                  </div>
                  <div className="text-white flex items-center">
                    <Mail className="text-white h-5 w-5 mr-3 text-white" />
                    <a href={`mailto:${musicSchool.email}`} className="text-white text-red-600 hover:underline">
                      {musicSchool.email}
                    </a>
                  </div>
                  <div className="text-white flex items-center">
                    <Globe className="text-white h-5 w-5 mr-3 text-white" />
                    <a href={`https://${musicSchool.website}`} target="_blank" rel="noopener noreferrer" className="text-white text-red-600 hover:underline">
                      {musicSchool.website}
                    </a>
                  </div>
                  <div className="text-white flex items-center">
                    <MapPin className="text-white h-5 w-5 mr-3 text-white" />
                    <span>{musicSchool.location}, {musicSchool.city}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-white w-full">
                  Get Directions
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Interested in Enrolling?</CardTitle>
                <CardDescription>
                  Contact us to learn more about our programs or book a free consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="text-white w-full">
                  Request Information
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Course Booking Dialog */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Course</DialogTitle>
            <DialogDescription>
              Select a date to book {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="text-white space-y-4 py-4">
            <div className="text-white flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{selectedCourse?.name}</p>
                <p className="text-white text-sm text-white">{selectedCourse?.type} • {selectedCourse?.duration}</p>
              </div>
              <div className="text-white text-right">
                <p className="text-white font-bold">${selectedCourse?.price}</p>
                <p className="text-white text-sm text-white">per session</p>
              </div>
            </div>
            
            <div className="text-white border-t border-b py-4">
              <label className="text-white block text-sm font-medium mb-2">
                Select Start Date
              </label>
              <div className="text-white flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="text-white rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>
            
            <div className="text-white space-y-2">
              <div className="text-white flex items-center">
                <CheckCircle className="text-white h-4 w-4 mr-2 text-red-600" />
                <span className="text-white text-sm">Instructor: {selectedCourse?.instructor.name}</span>
              </div>
              <div className="text-white flex items-center">
                <CheckCircle className="text-white h-4 w-4 mr-2 text-red-600" />
                <span className="text-white text-sm">Location: {musicSchool.name}, {musicSchool.city}</span>
              </div>
              {selectedDate && (
                <div className="text-white flex items-center">
                  <CheckCircle className="text-white h-4 w-4 mr-2 text-red-600" />
                  <span className="text-white text-sm">Starting: {format(selectedDate, "PPP")}</span>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCourse(null)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking} disabled={!selectedDate}>
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}