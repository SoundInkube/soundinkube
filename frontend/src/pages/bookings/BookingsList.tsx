import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarIcon,
  Clock,
  MapPin,
  MoreHorizontal,
  Calendar,
  Star,
  X,
  Check,
} from "lucide-react";
import { format } from "date-fns";

// Types
interface BookingBase {
  id: string;
  status: "upcoming" | "completed" | "canceled";
  date: string;
  totalPrice: number;
}

interface JamPadBooking extends BookingBase {
  type: "jampad";
  jampad: {
    id: string;
    name: string;
    imageUrl: string;
    address: string;
    city: string;
  };
  startTime: string;
  endTime: string;
  hourlyRate: number;
  hours: number;
}

interface CourseBooking extends BookingBase {
  type: "course";
  course: {
    id: string;
    name: string;
    imageUrl: string;
    type: string;
    duration: string;
    school: {
      id: string;
      name: string;
      address: string;
      city: string;
    };
    instructor: {
      name: string;
      imageUrl: string;
    };
  };
  sessions: number;
  sessionPrice: number;
}

type Booking = JamPadBooking | CourseBooking;

export default function BookingsList() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: "" });

  // Mock data for development
  const mockBookings: Booking[] = [
    {
      id: "b1",
      type: "jampad",
      status: "upcoming",
      date: "2023-11-20",
      jampad: {
        id: "j1",
        name: "Sonic Studio",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
        address: "123 Music Ave",
        city: "New York"
      },
      startTime: "14:00",
      endTime: "16:00",
      hourlyRate: 45,
      hours: 2,
      totalPrice: 90
    },
    {
      id: "b2",
      type: "jampad",
      status: "upcoming",
      date: "2023-11-25",
      jampad: {
        id: "j2",
        name: "Rhythm Room",
        imageUrl: "https://images.unsplash.com/photo-1525362081669-2b476bb628c3",
        address: "456 Beat Street",
        city: "Los Angeles"
      },
      startTime: "18:00",
      endTime: "21:00",
      hourlyRate: 35,
      hours: 3,
      totalPrice: 105
    },
    {
      id: "b3",
      type: "course",
      status: "upcoming",
      date: "2023-11-18",
      course: {
        id: "c1",
        name: "Piano Masterclass",
        imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
        type: "Group",
        duration: "60 min",
        school: {
          id: "s1",
          name: "Harmony Music Academy",
          address: "123 Mozart Street",
          city: "New York"
        },
        instructor: {
          name: "Dr. Sarah Williams",
          imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        }
      },
      sessions: 4,
      sessionPrice: 30,
      totalPrice: 120
    },
    {
      id: "b4",
      type: "jampad",
      status: "completed",
      date: "2023-10-30",
      jampad: {
        id: "j3",
        name: "Harmony House",
        imageUrl: "https://images.unsplash.com/photo-1568484901937-74e0ad55a1a5",
        address: "789 Melody Lane",
        city: "Chicago"
      },
      startTime: "10:00",
      endTime: "13:00",
      hourlyRate: 50,
      hours: 3,
      totalPrice: 150
    },
    {
      id: "b5",
      type: "course",
      status: "completed",
      date: "2023-10-25",
      course: {
        id: "c2",
        name: "Music Theory Workshop",
        imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
        type: "Workshop",
        duration: "90 min",
        school: {
          id: "s1",
          name: "Harmony Music Academy",
          address: "123 Mozart Street",
          city: "New York"
        },
        instructor: {
          name: "Dr. Michael Chen",
          imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"
        }
      },
      sessions: 1,
      sessionPrice: 25,
      totalPrice: 25
    },
    {
      id: "b6",
      type: "jampad",
      status: "canceled",
      date: "2023-10-15",
      jampad: {
        id: "j4",
        name: "Groove Garage",
        imageUrl: "https://images.unsplash.com/photo-1525018923-1ebe8261a6a6",
        address: "101 Chord Court",
        city: "Nashville"
      },
      startTime: "19:00",
      endTime: "22:00",
      hourlyRate: 40,
      hours: 3,
      totalPrice: 120
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/bookings" } });
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        // In a real app, we would fetch from the API
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // const data = await response.json();
        // setBookings(data);
        
        // Using mock data for now
        setTimeout(() => {
          setBookings(mockBookings);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, navigate, token]);

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelDialog(true);
  };

  const confirmCancelBooking = async () => {
    if (!selectedBooking) return;
    
    // In a real app, we would make an API call to cancel the booking
    console.log("Canceling booking:", {
      bookingId: selectedBooking.id,
      reason: cancelReason
    });
    
    // Update local state to reflect cancellation
    setBookings(current =>
      current.map(booking =>
        booking.id === selectedBooking.id
          ? { ...booking, status: "canceled" }
          : booking
      )
    );
    
    setShowCancelDialog(false);
    setSelectedBooking(null);
    setCancelReason("");
  };

  const handleLeaveReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowReviewDialog(true);
    setReview({ rating: 5, comment: "" });
  };

  const submitReview = async () => {
    if (!selectedBooking || !review.comment) return;
    
    // In a real app, we would make an API call to submit the review
    console.log("Submitting review:", {
      bookingId: selectedBooking.id,
      bookingType: selectedBooking.type,
      itemId: selectedBooking.type === "jampad" 
        ? selectedBooking.jampad.id 
        : selectedBooking.course.id,
      rating: review.rating,
      comment: review.comment
    });
    
    setShowReviewDialog(false);
    setSelectedBooking(null);
  };

  // Filter bookings by status
  const upcomingBookings = bookings.filter(booking => booking.status === "upcoming");
  const completedBookings = bookings.filter(booking => booking.status === "completed");
  const canceledBookings = bookings.filter(booking => booking.status === "canceled");

  if (loading) {
    return (
      <MainLayout>
        <div className="text-white flex justify-center items-center h-64">
          <div className="text-white animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-white bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <p className="text-white text-red-600">{error}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-white mb-8">
          <h1 className="text-white text-3xl font-bold text-white">My Bookings</h1>
          <p className="text-white mt-2 text-white">Manage your bookings for jam pads and courses</p>
        </div>

        <Tabs defaultValue="upcoming" className="text-white w-full">
          <TabsList className="text-white grid grid-cols-3 mb-8">
            <TabsTrigger value="upcoming" className="text-white relative">
              Upcoming
              {upcomingBookings.length > 0 && (
                <Badge className="text-white ml-2 bg-red-600">{upcomingBookings.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
              {completedBookings.length > 0 && (
                <Badge className="text-white ml-2" variant="outline">{completedBookings.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="canceled">
              Canceled
              {canceledBookings.length > 0 && (
                <Badge className="text-white ml-2" variant="outline">{canceledBookings.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingBookings.length === 0 ? (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white">You don't have any upcoming bookings.</p>
                <div className="text-white mt-4 flex justify-center space-x-4">
                  <Button asChild variant="outline">
                    <a href="/jampads">Browse Jam Pads</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/music-schools">Browse Music Schools</a>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-white grid grid-cols-1 gap-6">
                {upcomingBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onCancel={() => handleCancelBooking(booking)} 
                    onReview={() => {}} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed">
            {completedBookings.length === 0 ? (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white">You don't have any completed bookings.</p>
              </div>
            ) : (
              <div className="text-white grid grid-cols-1 gap-6">
                {completedBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onCancel={() => {}} 
                    onReview={() => handleLeaveReview(booking)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="canceled">
            {canceledBookings.length === 0 ? (
              <div className="text-white bg-black p-8 rounded-lg border text-center">
                <p className="text-white text-white">You don't have any canceled bookings.</p>
              </div>
            ) : (
              <div className="text-white grid grid-cols-1 gap-6">
                {canceledBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking} 
                    onCancel={() => {}} 
                    onReview={() => {}} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Cancel Booking Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="text-white py-4">
            {selectedBooking && (
              <div className="text-white mb-4 p-4 bg-black rounded-lg">
                <p className="text-white font-medium">
                  {selectedBooking.type === "jampad" 
                    ? selectedBooking.jampad.name 
                    : selectedBooking.course.name}
                </p>
                <p className="text-white text-sm text-white">
                  <CalendarIcon className="text-white h-4 w-4 inline mr-1" />
                  {format(new Date(selectedBooking.date), "PPP")}
                  {selectedBooking.type === "jampad" && (
                    <span className="text-white ml-2">
                      <Clock className="text-white h-4 w-4 inline mr-1" />
                      {selectedBooking.startTime} - {selectedBooking.endTime}
                    </span>
                  )}
                </p>
              </div>
            )}
            <Textarea
              placeholder="Please provide a reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmCancelBooking}>
              Cancel Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="text-white sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Leave a Review</DialogTitle>
            <DialogDescription>
              Share your experience to help others make informed decisions.
            </DialogDescription>
          </DialogHeader>
          <div className="text-white py-4">
            {selectedBooking && (
              <div className="text-white mb-4">
                <p className="text-white font-medium">
                  {selectedBooking.type === "jampad" 
                    ? selectedBooking.jampad.name 
                    : selectedBooking.course.name}
                </p>
                <p className="text-white text-sm text-white mb-4">
                  {selectedBooking.type === "jampad" 
                    ? `${selectedBooking.jampad.city}` 
                    : `${selectedBooking.course.school.name}, ${selectedBooking.course.school.city}`}
                </p>
              </div>
            )}
            <div className="text-white mb-4">
              <p className="text-white mb-2">Rating</p>
              <div className="text-white flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    type="button"
                    onClick={() => setReview({ ...review, rating: star })}
                    className="text-white focus:outline-none"
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= review.rating ? "text-amber-500 fill-amber-500" : "text-white"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <Textarea
              placeholder="Write your review here..."
              value={review.comment}
              onChange={(e) => setReview({ ...review, comment: e.target.value })}
              className="text-white min-h-32"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReviewDialog(false)}>
              Cancel
            </Button>
            <Button onClick={submitReview} disabled={!review.comment}>
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}

// Booking Card Component
function BookingCard({ 
  booking, 
  onCancel, 
  onReview 
}: { 
  booking: Booking; 
  onCancel: () => void; 
  onReview: () => void;
}) {
  const navigate = useNavigate();
  
  // Determine status badge style
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming":
        return "default";
      case "completed":
        return "secondary";
      case "canceled":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  // Format date
  const formattedDate = format(new Date(booking.date), "PPP");
  
  // View details handler
  const handleViewDetails = () => {
    if (booking.type === "jampad") {
      navigate(`/jampads/${booking.jampad.id}`);
    } else {
      navigate(`/music-schools/${booking.course.school.id}`);
    }
  };
  
  return (
    <Card>
      <CardHeader className="text-white pb-2">
        <div className="text-white flex justify-between">
          <Badge variant={getBadgeVariant(booking.status)} className="text-white capitalize">
            {booking.status}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white h-8 w-8 p-0">
                <MoreHorizontal className="text-white h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleViewDetails}>
                View Details
              </DropdownMenuItem>
              {booking.status === "upcoming" && (
                <DropdownMenuItem onClick={onCancel} className="text-white text-red-600">
                  Cancel Booking
                </DropdownMenuItem>
              )}
              {booking.status === "completed" && (
                <DropdownMenuItem onClick={onReview}>
                  Leave a Review
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="text-white pb-2">
        <div className="text-white flex space-x-4">
          {/* Image */}
          <div className="text-white w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={booking.type === "jampad" ? booking.jampad.imageUrl : booking.course.imageUrl}
              alt={booking.type === "jampad" ? booking.jampad.name : booking.course.name}
              className="text-white w-full h-full object-cover"
            />
          </div>
          
          {/* Details */}
          <div className="text-white flex-1">
            <h3 className="text-white font-bold text-lg mb-1">
              {booking.type === "jampad" ? booking.jampad.name : booking.course.name}
            </h3>
            
            <div className="text-white flex items-center text-sm text-white mb-1">
              <MapPin className="text-white h-4 w-4 mr-1" />
              <span>
                {booking.type === "jampad" 
                  ? `${booking.jampad.address}, ${booking.jampad.city}`
                  : `${booking.course.school.name}, ${booking.course.school.city}`
                }
              </span>
            </div>
            
            <div className="text-white flex items-center text-sm text-white">
              <Calendar className="text-white h-4 w-4 mr-1" />
              <span>{formattedDate}</span>
              
              {booking.type === "jampad" && (
                <span className="text-white ml-3 flex items-center">
                  <Clock className="text-white h-4 w-4 mr-1" />
                  {booking.startTime} - {booking.endTime}
                </span>
              )}
            </div>
            
            {/* Course-specific details */}
            {booking.type === "course" && (
              <div className="text-white mt-2 flex items-center">
                <Avatar className="text-white h-6 w-6 mr-2">
                  <AvatarImage src={booking.course.instructor.imageUrl} alt={booking.course.instructor.name} />
                  <AvatarFallback>{booking.course.instructor.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-white text-sm">{booking.course.instructor.name}</span>
                <Badge variant="outline" className="text-white ml-3 text-xs">
                  {booking.course.type} • {booking.course.duration}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="text-white pt-4 border-t flex justify-between items-center">
        <div>
          <p className="text-white text-sm text-white">Total Price</p>
          <p className="text-white font-bold text-lg">${booking.totalPrice}</p>
        </div>
        
        <div className="text-white space-x-2">
          {booking.status === "upcoming" && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {booking.status === "completed" && (
            <Button variant="outline" size="sm" onClick={onReview}>
              Leave Review
            </Button>
          )}
          <Button size="sm" onClick={handleViewDetails}>View Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
}