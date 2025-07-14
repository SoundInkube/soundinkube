import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Music, 
  Instagram, 
  Youtube, 
  Twitter,
  Globe,
  Camera,
  Save,
  Bell,
  Shield,
  CreditCard,
  Link2,
  Star,
  Award,
  Headphones
} from "lucide-react";
import { useState } from "react";

export default function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@email.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    bio: "Award-winning music producer specializing in Hip-Hop, R&B, and Pop. With over 8 years of experience, I've worked with emerging artists and established names to create chart-topping hits. My passion lies in blending modern production techniques with classic sounds to create unique musical experiences.",
    specialties: ["Music Production", "Audio Engineering", "Songwriting", "Beat Making"],
    hourlyRate: 85,
    website: "www.alexriveramusic.com",
    instagram: "@alexriveramusic",
    youtube: "AlexRiveraProducer",
    twitter: "@alexrivera_prod",
    spotify: "Alex Rivera"
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailMessages: true,
    emailPromotions: false,
    pushBookings: true,
    pushMessages: true,
    pushPromotions: false
  });

  const achievements = [
    { title: "Top Rated Producer", description: "Maintained 4.9+ rating for 12 months", icon: Star },
    { title: "100+ Projects", description: "Successfully completed over 100 projects", icon: Award },
    { title: "Featured Artist", description: "Featured on SoundInkube homepage", icon: Headphones }
  ];

  return (
    <div className="text-white min-h-screen bg-netflix-black">
      <div className="text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-white text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-white text-white">Manage your account settings and preferences</p>
        </div>

        <div className="text-white grid lg:grid-cols-3 gap-8">
          {/* Main Profile Settings */}
          <div className="text-white lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white flex items-center space-x-2">
                  <User className="text-white h-5 w-5 text-netflix-red" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-6">
                <div className="text-white flex items-center space-x-4 mb-6">
                  <div className="text-white relative">
                    <div className="text-white w-20 h-20 bg-netflix-red rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      AR
                    </div>
                    <button className="text-white absolute -bottom-1 -right-1 bg-netflix-dark rounded-full p-2 border-2 border-gray-700 hover:bg-netflix-dark transition-colors">
                      <Camera className="text-white h-4 w-4 text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-white text-white font-semibold text-lg">Profile Photo</h3>
                    <p className="text-white text-white text-sm">Upload a professional photo to build trust with clients</p>
                  </div>
                </div>

                <div className="text-white grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white text-white">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white text-white">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white text-white">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>

                <div className="text-white grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-white text-white">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-white text-white">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="text-white bg-netflix-dark border-gray-700 text-white min-h-[120px]"
                    placeholder="Tell potential clients about your experience, style, and what makes you unique..."
                  />
                  <p className="text-white text-white text-sm mt-1">{profileData.bio.length}/500 characters</p>
                </div>

                <div>
                  <Label className="text-white text-white">Specialties</Label>
                  <div className="text-white flex flex-wrap gap-2 mt-2">
                    {profileData.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-white bg-netflix-red/20 text-netflix-red border-netflix-red/30">
                        {specialty}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="text-white border-gray-700 text-white">
                      + Add Specialty
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="hourlyRate" className="text-white text-white">Hourly Rate (USD)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={profileData.hourlyRate}
                    onChange={(e) => setProfileData({...profileData, hourlyRate: parseInt(e.target.value)})}
                    className="text-white bg-netflix-dark border-gray-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Links */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white flex items-center space-x-2">
                  <Link2 className="text-white h-5 w-5 text-netflix-red" />
                  <span>Social Media & Links</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-4">
                <div className="text-white grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white text-white flex items-center space-x-2">
                      <Globe className="text-white h-4 w-4" />
                      <span>Website</span>
                    </Label>
                    <Input
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                      placeholder="www.yourwebsite.com"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-white flex items-center space-x-2">
                      <Instagram className="text-white h-4 w-4" />
                      <span>Instagram</span>
                    </Label>
                    <Input
                      value={profileData.instagram}
                      onChange={(e) => setProfileData({...profileData, instagram: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                      placeholder="@username"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-white flex items-center space-x-2">
                      <Youtube className="text-white h-4 w-4" />
                      <span>YouTube</span>
                    </Label>
                    <Input
                      value={profileData.youtube}
                      onChange={(e) => setProfileData({...profileData, youtube: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                      placeholder="Channel Name"
                    />
                  </div>
                  <div>
                    <Label className="text-white text-white flex items-center space-x-2">
                      <Twitter className="text-white h-4 w-4" />
                      <span>Twitter</span>
                    </Label>
                    <Input
                      value={profileData.twitter}
                      onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                      className="text-white bg-netflix-dark border-gray-700 text-white"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white flex items-center space-x-2">
                  <Bell className="text-white h-5 w-5 text-netflix-red" />
                  <span>Notification Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white space-y-6">
                <div>
                  <h4 className="text-white text-white font-medium mb-4">Email Notifications</h4>
                  <div className="text-white space-y-3">
                    <div className="text-white flex items-center justify-between">
                      <div>
                        <p className="text-white text-white">New Bookings</p>
                        <p className="text-white text-white text-sm">Get notified when clients book your services</p>
                      </div>
                      <Switch
                        checked={notifications.emailBookings}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailBookings: checked})}
                      />
                    </div>
                    <div className="text-white flex items-center justify-between">
                      <div>
                        <p className="text-white text-white">New Messages</p>
                        <p className="text-white text-white text-sm">Receive email alerts for new messages</p>
                      </div>
                      <Switch
                        checked={notifications.emailMessages}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailMessages: checked})}
                      />
                    </div>
                    <div className="text-white flex items-center justify-between">
                      <div>
                        <p className="text-white text-white">Promotions & Tips</p>
                        <p className="text-white text-white text-sm">Weekly updates and platform news</p>
                      </div>
                      <Switch
                        checked={notifications.emailPromotions}
                        onCheckedChange={(checked) => setNotifications({...notifications, emailPromotions: checked})}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="text-white bg-netflix-dark" />

                <div>
                  <h4 className="text-white text-white font-medium mb-4">Push Notifications</h4>
                  <div className="text-white space-y-3">
                    <div className="text-white flex items-center justify-between">
                      <div>
                        <p className="text-white text-white">New Bookings</p>
                        <p className="text-white text-white text-sm">Instant notifications for bookings</p>
                      </div>
                      <Switch
                        checked={notifications.pushBookings}
                        onCheckedChange={(checked) => setNotifications({...notifications, pushBookings: checked})}
                      />
                    </div>
                    <div className="text-white flex items-center justify-between">
                      <div>
                        <p className="text-white text-white">New Messages</p>
                        <p className="text-white text-white text-sm">Real-time message alerts</p>
                      </div>
                      <Switch
                        checked={notifications.pushMessages}
                        onCheckedChange={(checked) => setNotifications({...notifications, pushMessages: checked})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="text-white space-y-6">
            {/* Profile Completion */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  <div className="text-white flex justify-between items-center">
                    <span className="text-white text-white">Progress</span>
                    <span className="text-white text-netflix-red font-semibold">85%</span>
                  </div>
                  <div className="text-white w-full bg-netflix-dark rounded-full h-2">
                    <div className="text-white bg-netflix-red h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="text-white space-y-2 text-sm">
                    <div className="text-white flex items-center space-x-2 text-netflix-red">
                      <div className="text-white w-2 h-2 bg-netflix-red rounded-full"></div>
                      <span>Basic info completed</span>
                    </div>
                    <div className="text-white flex items-center space-x-2 text-netflix-red">
                      <div className="text-white w-2 h-2 bg-netflix-red rounded-full"></div>
                      <span>Portfolio uploaded</span>
                    </div>
                    <div className="text-white flex items-center space-x-2 text-netflix-red">
                      <div className="text-white w-2 h-2 bg-netflix-red rounded-full"></div>
                      <span>Add more specialties</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="text-white flex items-start space-x-3">
                      <div className="text-white p-2 bg-netflix-red/20 rounded-lg">
                        <achievement.icon className="text-white h-4 w-4 text-netflix-red" />
                      </div>
                      <div>
                        <p className="text-white text-white text-sm font-medium">{achievement.title}</p>
                        <p className="text-white text-white text-xs">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="text-white netflix-card bg-netflix-dark/80 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-white text-lg">Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-white space-y-4">
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Profile Views</span>
                    <span className="text-white text-white font-semibold">2,847</span>
                  </div>
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Total Projects</span>
                    <span className="text-white text-white font-semibold">150</span>
                  </div>
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Response Rate</span>
                    <span className="text-white text-netflix-red font-semibold">98%</span>
                  </div>
                  <div className="text-white flex justify-between">
                    <span className="text-white text-white">Rating</span>
                    <span className="text-white text-netflix-red font-semibold">4.9/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-white mt-8 flex justify-end">
          <Button className="text-white netflix-button-primary px-8">
            <Save className="text-white h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}